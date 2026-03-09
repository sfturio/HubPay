using HubPay.Domain.Entities;

namespace HubPay.Domain.Repositories;

public interface IMerchantRepository
{
    Task<Merchant?> GetByIdAsync(Guid id);
    Task<IReadOnlyList<Merchant>> ListAsync();
    Task AddAsync(Merchant merchant);
}