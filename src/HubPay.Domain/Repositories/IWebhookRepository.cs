using HubPay.Domain.Entities;

namespace HubPay.Domain.Repositories;

public interface IWebhookRepository
{
    Task<IReadOnlyList<Webhook>> ListByMerchantAsync(Guid merchantId);
    Task<Webhook?> GetByIdAsync(Guid id);
    Task AddAsync(Webhook webhook);
    Task UpdateAsync(Webhook webhook);
}

