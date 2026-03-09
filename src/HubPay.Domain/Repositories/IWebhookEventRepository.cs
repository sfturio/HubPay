using HubPay.Domain.Entities;

namespace HubPay.Domain.Repositories;

public interface IWebhookEventRepository
{
    Task AddAsync(WebhookEvent webhookEvent);
}

