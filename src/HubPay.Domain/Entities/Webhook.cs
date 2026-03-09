using HubPay.Domain.Exceptions;

namespace HubPay.Domain.Entities;

public class Webhook
{
    public Guid Id { get; private set; }
    public Guid MerchantId { get; private set; }
    public string Url { get; private set; }
    public bool IsActive { get; private set; }
    public DateTime CreatedAt { get; private set; }

    public Webhook(Guid merchantId, string url)
    {
        if (merchantId == Guid.Empty)
            throw new DomainException("Webhook requires a valid merchant id");

        if (string.IsNullOrWhiteSpace(url))
            throw new DomainException("Webhook URL is required");

        MerchantId = merchantId;
        Url = url;

        Id = Guid.NewGuid();
        IsActive = true;
        CreatedAt = DateTime.UtcNow;
    }

    public void Disable()
    {
        if (!IsActive)
            return;

        IsActive = false;
    }
}

