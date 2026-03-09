using HubPay.Domain.Entities;
using HubPay.Domain.Repositories;
using HubPay.Infrastructure.Persistence;

namespace HubPay.Infrastructure.Repositories;

public class PaymentEventRepository : IPaymentEventRepository
{
    private readonly HubPayDbContext _context;

    public PaymentEventRepository(HubPayDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(PaymentEvent paymentEvent)
    {
        await _context.PaymentEvents.AddAsync(paymentEvent);
        await _context.SaveChangesAsync();
    }
}

