using System.Text.Json;
using HubPay.Domain.Entities;
using HubPay.Domain.Enums;
using HubPay.Domain.Exceptions;
using HubPay.Domain.Repositories;
using HubPay.Domain.ValueObjects;
using Microsoft.Extensions.Logging;

namespace HubPay.Application.Payments;

public class PaymentService
{
    private readonly IPaymentRepository _paymentRepository;
    private readonly IPaymentEventRepository _paymentEventRepository;
    private readonly IIdempotencyRecordRepository _idempotencyRecordRepository;
    private readonly IWebhookRepository _webhookRepository;
    private readonly IWebhookEventRepository _webhookEventRepository;
    private readonly ILogger<PaymentService> _logger;

    public PaymentService(
        IPaymentRepository paymentRepository,
        IPaymentEventRepository paymentEventRepository,
        IIdempotencyRecordRepository idempotencyRecordRepository,
        IWebhookRepository webhookRepository,
        IWebhookEventRepository webhookEventRepository,
        ILogger<PaymentService> logger)
    {
        _paymentRepository = paymentRepository;
        _paymentEventRepository = paymentEventRepository;
        _idempotencyRecordRepository = idempotencyRecordRepository;
        _webhookRepository = webhookRepository;
        _webhookEventRepository = webhookEventRepository;
        _logger = logger;
    }

    public async Task<(PaymentResponse Response, int StatusCode)> CreateAsync(
        Guid merchantId,
        CreatePaymentRequest request,
        string? idempotencyKey)
    {
        if (idempotencyKey is not null)
        {
            var existing = await _idempotencyRecordRepository
                .GetByMerchantAndKeyAsync(merchantId, idempotencyKey);

            if (existing is not null)
            {
                var cachedResponse = JsonSerializer.Deserialize<PaymentResponse>(existing.ResponseBody)
                               ?? throw new DomainException("Stored idempotency response is invalid");

                _logger.LogInformation(
                    "Idempotent replay detected for merchant {MerchantId} and key {IdempotencyKey}",
                    merchantId,
                    idempotencyKey);

                return (cachedResponse, existing.StatusCode);
            }
        }

        var money = new Money(request.Amount, request.Currency);
        var payment = new Payment(
            merchantId,
            request.CustomerId,
            money,
            request.PaymentMethod,
            request.Description,
            idempotencyKey);

        await _paymentRepository.AddAsync(payment);

        _logger.LogInformation(
            "Payment created with id {PaymentId} for merchant {MerchantId}",
            payment.Id,
            merchantId);

        var response = ToResponse(payment);
        var serializedResponse = JsonSerializer.Serialize(response);

        if (!string.IsNullOrWhiteSpace(idempotencyKey))
        {
            var record = new IdempotencyRecord(
                merchantId,
                idempotencyKey,
                requestHash: serializedResponse,
                responseBody: serializedResponse,
                statusCode: 201);

            await _idempotencyRecordRepository.AddAsync(record);
        }

        await RegisterWebhookEventsAsync(payment, "payment.created");

        return (response, 201);
    }

    public async Task<PaymentResponse?> GetByIdAsync(Guid merchantId, Guid paymentId)
    {
        var payment = await _paymentRepository.GetByIdForMerchantAsync(paymentId, merchantId);
        return payment is null ? null : ToResponse(payment);
    }

    public async Task<IReadOnlyList<PaymentResponse>> ListByMerchantAsync(
        Guid merchantId,
        PaymentStatus? status = null,
        Guid? customerId = null)
    {
        var payments = await _paymentRepository.ListByMerchantAsync(merchantId, status, customerId);
        return payments.Select(ToResponse).ToList();
    }

    public async Task<IReadOnlyList<PaymentEventResponse>?> ListEventsAsync(Guid merchantId, Guid paymentId)
    {
        var payment = await _paymentRepository.GetByIdForMerchantAsync(paymentId, merchantId);
        if (payment is null)
            return null;

        var events = await _paymentEventRepository.ListByPaymentAsync(paymentId);
        return events
            .Select(e => new PaymentEventResponse(
                e.Id,
                e.PaymentId,
                e.PreviousStatus.ToString(),
                e.NewStatus.ToString(),
                e.Description,
                e.CreatedAt))
            .ToList();
    }

    public async Task<PaymentResponse?> AuthorizeAsync(Guid merchantId, Guid paymentId)
    {
        var payment = await _paymentRepository.GetByIdForMerchantAsync(paymentId, merchantId);
        if (payment is null) return null;

        var previousStatus = payment.Status;
        payment.Authorize();

        await _paymentRepository.UpdateAsync(payment);
        await AddEventAndWebhooksAsync(payment, previousStatus, "payment.authorized");

        return ToResponse(payment);
    }

    public async Task<PaymentResponse?> MarkAsPaidAsync(Guid merchantId, Guid paymentId)
    {
        var payment = await _paymentRepository.GetByIdForMerchantAsync(paymentId, merchantId);
        if (payment is null) return null;

        var previousStatus = payment.Status;
        payment.MarkAsPaid();

        await _paymentRepository.UpdateAsync(payment);
        await AddEventAndWebhooksAsync(payment, previousStatus, "payment.paid");

        return ToResponse(payment);
    }

    public async Task<PaymentResponse?> FailAsync(Guid merchantId, Guid paymentId)
    {
        var payment = await _paymentRepository.GetByIdForMerchantAsync(paymentId, merchantId);
        if (payment is null) return null;

        var previousStatus = payment.Status;
        payment.Fail();

        await _paymentRepository.UpdateAsync(payment);

        _logger.LogWarning(
            "Payment {PaymentId} failed for merchant {MerchantId}",
            paymentId,
            merchantId);

        await AddEventAndWebhooksAsync(payment, previousStatus, "payment.failed");

        return ToResponse(payment);
    }

    public async Task<PaymentResponse?> RefundAsync(Guid merchantId, Guid paymentId)
    {
        var payment = await _paymentRepository.GetByIdForMerchantAsync(paymentId, merchantId);
        if (payment is null) return null;

        var previousStatus = payment.Status;
        payment.Refund();

        await _paymentRepository.UpdateAsync(payment);
        await AddEventAndWebhooksAsync(payment, previousStatus, "payment.refunded");

        return ToResponse(payment);
    }

    private async Task AddEventAndWebhooksAsync(Payment payment, PaymentStatus previousStatus, string eventType)
    {
        var paymentEvent = new PaymentEvent(
            payment.Id,
            previousStatus,
            payment.Status,
            eventType);

        await _paymentEventRepository.AddAsync(paymentEvent);
        await RegisterWebhookEventsAsync(payment, eventType);
    }

    private async Task RegisterWebhookEventsAsync(Payment payment, string eventType)
    {
        var webhooks = await _webhookRepository.ListByMerchantAsync(payment.MerchantId);
        if (webhooks.Count == 0) return;

        var payload = JsonSerializer.Serialize(ToResponse(payment));

        foreach (var webhook in webhooks.Where(w => w.IsActive))
        {
            var webhookEvent = new WebhookEvent(
                webhook.Id,
                payment.Id,
                eventType,
                payload);

            await _webhookEventRepository.AddAsync(webhookEvent);
        }
    }

    private static PaymentResponse ToResponse(Payment payment)
    {
        return new PaymentResponse(
            payment.Id,
            payment.MerchantId,
            payment.CustomerId,
            payment.Amount.Amount,
            payment.Amount.Currency,
            payment.PaymentMethod.ToString(),
            payment.Status.ToString(),
            payment.Description,
            payment.IdempotencyKey,
            payment.CreatedAt,
            payment.UpdatedAt);
    }
}
