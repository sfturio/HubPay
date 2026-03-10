using System.Security.Claims;
using HubPay.Application.ApiKeys;
using HubPay.Application.Customers;
using HubPay.Application.Merchants;
using HubPay.Application.Payments;
using HubPay.Application.Webhooks;
using HubPay.Domain.Enums;
using HubPay.Domain.Repositories;

namespace HubPay.API.Endpoints;

public static class EndpointMappingExtensions
{
    public static void MapHubPayEndpoints(this IEndpointRouteBuilder app)
    {
        var merchants = app.MapGroup("/merchants");
        merchants.MapPost("/", async (CreateMerchantRequest request, MerchantService service) =>
        {
            var result = await service.CreateAsync(request);
            return Results.Created($"/merchants/{result.Id}", result);
        });

        merchants.MapGet("/", async (MerchantService service) =>
        {
            var list = await service.ListAsync();
            return Results.Ok(list);
        });

        merchants.MapGet("/{id:guid}", async (Guid id, MerchantService service) =>
        {
            var result = await service.GetByIdAsync(id);
            return result is null ? Results.NotFound() : Results.Ok(result);
        });

        merchants.MapPost("/{id:guid}/api-keys", async (HttpContext context, Guid id, ApiKeyService apiKeyService, IApiKeyRepository apiKeyRepository) =>
        {
            var hasActiveKey = await apiKeyRepository.HasActiveForMerchantAsync(id);
            var authenticatedMerchantId = GetMerchantIdOrNull(context);

            if (hasActiveKey && authenticatedMerchantId is null)
                return Results.Unauthorized();

            if (authenticatedMerchantId is not null && authenticatedMerchantId != id)
                return Results.Forbid();

            var response = await apiKeyService.GenerateAsync(id);
            return Results.Ok(response);
        });

        merchants.MapPost("/{id:guid}/api-keys/revoke", async (HttpContext context, Guid id, RevokeApiKeyRequest request, ApiKeyService apiKeyService) =>
        {
            var authenticatedMerchantId = GetMerchantId(context);
            if (authenticatedMerchantId != id)
                return Results.Forbid();

            var revoked = await apiKeyService.RevokeAsync(id, request.Key);
            return revoked ? Results.NoContent() : Results.NotFound();
        }).RequireAuthorization();

        var customers = app.MapGroup("/customers").RequireAuthorization();
        customers.MapPost("/", async (CreateCustomerRequest request, CustomerService service) =>
        {
            var response = await service.CreateAsync(request);
            return Results.Created($"/customers/{response.Id}", response);
        });

        customers.MapGet("/{id:guid}", async (Guid id, CustomerService service) =>
        {
            var result = await service.GetByIdAsync(id);
            return result is null ? Results.NotFound() : Results.Ok(result);
        });

        var payments = app.MapGroup("/payments").RequireAuthorization();
        payments.MapPost("/", async (HttpContext httpContext, HttpRequest httpRequest, CreatePaymentRequest request, PaymentService service) =>
        {
            var merchantId = GetMerchantId(httpContext);
            httpRequest.Headers.TryGetValue("Idempotency-Key", out var idempotencyKeyHeader);
            var idempotencyKey = idempotencyKeyHeader.ToString();
            if (string.IsNullOrWhiteSpace(idempotencyKey))
            {
                idempotencyKey = null;
            }

            var (response, statusCode) = await service.CreateAsync(merchantId, request, idempotencyKey);
            return statusCode == StatusCodes.Status201Created
                ? Results.Created($"/payments/{response.Id}", response)
                : Results.Ok(response);
        });

        payments.MapGet("/", async (HttpContext httpContext, string? status, Guid? customerId, PaymentService service) =>
        {
            var merchantId = GetMerchantId(httpContext);

            PaymentStatus? parsedStatus = null;
            if (!string.IsNullOrWhiteSpace(status))
            {
                if (!Enum.TryParse<PaymentStatus>(status, true, out var statusValue))
                {
                    return Results.BadRequest(new { error = "Invalid payment status filter." });
                }

                parsedStatus = statusValue;
            }

            var result = await service.ListByMerchantAsync(merchantId, parsedStatus, customerId);
            return Results.Ok(result);
        });

        payments.MapGet("/{id:guid}", async (HttpContext httpContext, Guid id, PaymentService service) =>
        {
            var merchantId = GetMerchantId(httpContext);
            var result = await service.GetByIdAsync(merchantId, id);
            return result is null ? Results.NotFound() : Results.Ok(result);
        });

        payments.MapGet("/{id:guid}/events", async (HttpContext httpContext, Guid id, PaymentService service) =>
        {
            var merchantId = GetMerchantId(httpContext);
            var result = await service.ListEventsAsync(merchantId, id);
            return result is null ? Results.NotFound() : Results.Ok(result);
        });

        payments.MapPost("/{id:guid}/authorize", async (HttpContext httpContext, Guid id, PaymentService service) =>
        {
            var merchantId = GetMerchantId(httpContext);
            var result = await service.AuthorizeAsync(merchantId, id);
            return result is null ? Results.NotFound() : Results.Ok(result);
        });

        payments.MapPost("/{id:guid}/pay", async (HttpContext httpContext, Guid id, PaymentService service) =>
        {
            var merchantId = GetMerchantId(httpContext);
            var result = await service.MarkAsPaidAsync(merchantId, id);
            return result is null ? Results.NotFound() : Results.Ok(result);
        });

        payments.MapPost("/{id:guid}/fail", async (HttpContext httpContext, Guid id, PaymentService service) =>
        {
            var merchantId = GetMerchantId(httpContext);
            var result = await service.FailAsync(merchantId, id);
            return result is null ? Results.NotFound() : Results.Ok(result);
        });

        payments.MapPost("/{id:guid}/refund", async (HttpContext httpContext, Guid id, PaymentService service) =>
        {
            var merchantId = GetMerchantId(httpContext);
            var result = await service.RefundAsync(merchantId, id);
            return result is null ? Results.NotFound() : Results.Ok(result);
        });

        var webhooks = app.MapGroup("/webhooks").RequireAuthorization();
        webhooks.MapPost("/", async (HttpContext httpContext, CreateWebhookRequest request, WebhookService service) =>
        {
            var merchantId = GetMerchantId(httpContext);
            var result = await service.CreateAsync(merchantId, request);
            return Results.Created($"/webhooks/{result.Id}", result);
        });

        webhooks.MapGet("/", async (HttpContext httpContext, WebhookService service) =>
        {
            var merchantId = GetMerchantId(httpContext);
            var list = await service.ListAsync(merchantId);
            return Results.Ok(list);
        });

        webhooks.MapPost("/{id:guid}/disable", async (HttpContext httpContext, Guid id, WebhookService service) =>
        {
            var merchantId = GetMerchantId(httpContext);
            var result = await service.DisableAsync(merchantId, id);
            return result is null ? Results.NotFound() : Results.Ok(result);
        });
    }

    private static Guid GetMerchantId(HttpContext httpContext)
    {
        var merchantId = GetMerchantIdOrNull(httpContext);
        return merchantId ?? throw new InvalidOperationException("MerchantId not available in the current context.");
    }

    private static Guid? GetMerchantIdOrNull(HttpContext httpContext)
    {
        if (httpContext.Items.TryGetValue("MerchantId", out var merchantIdItem)
            && merchantIdItem is Guid merchantIdFromContext)
        {
            return merchantIdFromContext;
        }

        var merchantIdClaim = httpContext.User.FindFirstValue("merchantId");
        if (Guid.TryParse(merchantIdClaim, out var merchantId))
            return merchantId;

        return null;
    }
}
