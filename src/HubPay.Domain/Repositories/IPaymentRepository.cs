using HubPay.Domain.Entities;
using HubPay.Domain.Enums;

namespace HubPay.Domain.Repositories;

public interface IPaymentRepository
{
    Task<Payment?> GetByIdAsync(Guid id);
    Task<Payment?> GetByIdForMerchantAsync(Guid id, Guid merchantId);
    Task<IReadOnlyList<Payment>> ListByMerchantAsync(Guid merchantId, PaymentStatus? status = null, Guid? customerId = null);
    Task AddAsync(Payment payment);
    Task UpdateAsync(Payment payment);
}
