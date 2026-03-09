using HubPay.Domain.Entities;
using HubPay.Domain.Repositories;
using HubPay.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace HubPay.Infrastructure.Repositories;

public class PaymentRepository : IPaymentRepository
{
    private readonly HubPayDbContext _context;

    public PaymentRepository(HubPayDbContext context)
    {
        _context = context;
    }

    public async Task<Payment?> GetByIdAsync(Guid id)
    {
        return await _context.Payments
            .SingleOrDefaultAsync(p => p.Id == id);
    }

    public async Task<Payment?> GetByIdForMerchantAsync(Guid id, Guid merchantId)
    {
        return await _context.Payments
            .SingleOrDefaultAsync(p => p.Id == id && p.MerchantId == merchantId);
    }

    public async Task AddAsync(Payment payment)
    {
        await _context.Payments.AddAsync(payment);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Payment payment)
    {
        _context.Payments.Update(payment);
        await _context.SaveChangesAsync();
    }
}