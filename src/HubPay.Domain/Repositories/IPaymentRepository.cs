using HubPay.Domain.Entities;

namespace HubPay.Domain.Repositories;

public interface IPaymentRepository
{
    Task<Payment?> GetByIdAsync(Guid id);
    Task<Payment?> GetByIdForMerchantAsync(Guid id, Guid merchantId);
    Task<IReadOnlyList<Payment>> ListByMerchantAsync(Guid merchantId);
    Task AddAsync(Payment payment);
    Task UpdateAsync(Payment payment);
}