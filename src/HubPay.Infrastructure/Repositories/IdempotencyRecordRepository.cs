using HubPay.Domain.Entities;
using HubPay.Domain.Repositories;
using HubPay.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace HubPay.Infrastructure.Repositories;

public class IdempotencyRecordRepository : IIdempotencyRecordRepository
{
    private readonly HubPayDbContext _context;

    public IdempotencyRecordRepository(HubPayDbContext context)
    {
        _context = context;
    }

    public async Task<IdempotencyRecord?> GetByMerchantAndKeyAsync(Guid merchantId, string key)
    {
        return await _context.IdempotencyRecords
            .SingleOrDefaultAsync(r => r.MerchantId == merchantId && r.Key == key);
    }

    public async Task AddAsync(IdempotencyRecord record)
    {
        await _context.IdempotencyRecords.AddAsync(record);
        await _context.SaveChangesAsync();
    }
}

