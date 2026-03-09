using HubPay.Domain.Entities;

namespace HubPay.Domain.Repositories;

public interface IPaymentEventRepository
{
    Task AddAsync(PaymentEvent paymentEvent);
}

