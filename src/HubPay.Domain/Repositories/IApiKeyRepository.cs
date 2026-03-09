using HubPay.Domain.Entities;

namespace HubPay.Domain.Repositories;

public interface IApiKeyRepository
{
    Task<ApiKey?> GetActiveByKeyAsync(string key);
    Task<bool> HasActiveForMerchantAsync(Guid merchantId);
    Task AddAsync(ApiKey apiKey);
    Task UpdateAsync(ApiKey apiKey);
}