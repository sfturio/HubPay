using HubPay.Domain.Entities;
using HubPay.Domain.Repositories;
using HubPay.Infrastructure.Persistence;

namespace HubPay.Infrastructure.Repositories;

public class WebhookEventRepository : IWebhookEventRepository
{
    private readonly HubPayDbContext _context;

    public WebhookEventRepository(HubPayDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(WebhookEvent webhookEvent)
    {
        await _context.WebhookEvents.AddAsync(webhookEvent);
        await _context.SaveChangesAsync();
    }
}

