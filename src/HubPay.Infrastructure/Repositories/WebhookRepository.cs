using HubPay.Domain.Entities;
using HubPay.Domain.Repositories;
using HubPay.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace HubPay.Infrastructure.Repositories;

public class WebhookRepository : IWebhookRepository
{
    private readonly HubPayDbContext _context;

    public WebhookRepository(HubPayDbContext context)
    {
        _context = context;
    }

    public async Task<IReadOnlyList<Webhook>> ListByMerchantAsync(Guid merchantId)
    {
        return await _context.Webhooks
            .Where(w => w.MerchantId == merchantId)
            .ToListAsync();
    }

    public async Task<Webhook?> GetByIdAsync(Guid id)
    {
        return await _context.Webhooks
            .SingleOrDefaultAsync(w => w.Id == id);
    }

    public async Task AddAsync(Webhook webhook)
    {
        await _context.Webhooks.AddAsync(webhook);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Webhook webhook)
    {
        _context.Webhooks.Update(webhook);
        await _context.SaveChangesAsync();
    }
}

