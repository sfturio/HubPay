using HubPay.Domain.Entities;
using HubPay.Domain.Repositories;
using HubPay.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace HubPay.Infrastructure.Repositories;

public class MerchantRepository : IMerchantRepository
{
    private readonly HubPayDbContext _context;

    public MerchantRepository(HubPayDbContext context)
    {
        _context = context;
    }

    public async Task<Merchant?> GetByIdAsync(Guid id)
    {
        return await _context.Merchants
            .SingleOrDefaultAsync(m => m.Id == id);
    }

    public async Task<IReadOnlyList<Merchant>> ListAsync()
    {
        return await _context.Merchants
            .OrderByDescending(m => m.CreatedAt)
            .ToListAsync();
    }

    public async Task AddAsync(Merchant merchant)
    {
        await _context.Merchants.AddAsync(merchant);
        await _context.SaveChangesAsync();
    }
}