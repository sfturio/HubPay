using HubPay.Domain.Entities;

namespace HubPay.Domain.Repositories;

public interface IIdempotencyRecordRepository
{
    Task<IdempotencyRecord?> GetByMerchantAndKeyAsync(Guid merchantId, string key);
    Task AddAsync(IdempotencyRecord record);
}

