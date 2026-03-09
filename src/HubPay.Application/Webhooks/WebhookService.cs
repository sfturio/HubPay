using HubPay.Domain.Entities;
using HubPay.Domain.Repositories;

namespace HubPay.Application.Webhooks;

public class WebhookService
{
    private readonly IWebhookRepository _webhookRepository;

    public WebhookService(IWebhookRepository webhookRepository)
    {
        _webhookRepository = webhookRepository;
    }

    public async Task<WebhookResponse> CreateAsync(Guid merchantId, CreateWebhookRequest request)
    {
        var webhook = new Webhook(merchantId, request.Url);

        await _webhookRepository.AddAsync(webhook);

        return ToResponse(webhook);
    }

    public async Task<IReadOnlyList<WebhookResponse>> ListAsync(Guid merchantId)
    {
        var webhooks = await _webhookRepository.ListByMerchantAsync(merchantId);
        return webhooks.Select(ToResponse).ToList();
    }

    public async Task<WebhookResponse?> DisableAsync(Guid merchantId, Guid webhookId)
    {
        var webhook = await _webhookRepository.GetByIdAsync(webhookId);
        if (webhook is null || webhook.MerchantId != merchantId)
            return null;

        webhook.Disable();
        await _webhookRepository.UpdateAsync(webhook);

        return ToResponse(webhook);
    }

    private static WebhookResponse ToResponse(Webhook webhook)
    {
        return new WebhookResponse(
            webhook.Id,
            webhook.Url,
            webhook.IsActive,
            webhook.CreatedAt);
    }
}

