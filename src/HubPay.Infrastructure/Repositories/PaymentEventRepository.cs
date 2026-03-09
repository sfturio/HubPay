using HubPay.Domain.Entities;
using HubPay.Domain.Repositories;
using HubPay.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

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

    public async Task<IReadOnlyList<PaymentEvent>> ListByPaymentAsync(Guid paymentId)
    {
        return await _context.PaymentEvents
            .Where(e => e.PaymentId == paymentId)
            .OrderByDescending(e => e.CreatedAt)
            .ToListAsync();
    }
}