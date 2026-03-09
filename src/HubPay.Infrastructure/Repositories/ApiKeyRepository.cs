using HubPay.Domain.Entities;
using HubPay.Domain.Repositories;
using HubPay.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace HubPay.Infrastructure.Repositories;

public class ApiKeyRepository : IApiKeyRepository
{
    private readonly HubPayDbContext _context;

    public ApiKeyRepository(HubPayDbContext context)
    {
        _context = context;
    }

    public async Task<ApiKey?> GetActiveByKeyAsync(string key)
    {
        return await _context.ApiKeys
            .SingleOrDefaultAsync(a => a.Key == key && a.IsActive);
    }

    public async Task<bool> HasActiveForMerchantAsync(Guid merchantId)
    {
        return await _context.ApiKeys.AnyAsync(a => a.MerchantId == merchantId && a.IsActive);
    }

    public async Task AddAsync(ApiKey apiKey)
    {
        await _context.ApiKeys.AddAsync(apiKey);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(ApiKey apiKey)
    {
        _context.ApiKeys.Update(apiKey);
        await _context.SaveChangesAsync();
    }
}