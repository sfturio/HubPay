using HubPay.Domain.Exceptions;

namespace HubPay.Domain.Entities;

public class ApiKey
{
    public Guid Id { get; private set; }
    public Guid MerchantId { get; private set; }
    public string Key { get; private set; }
    public bool IsActive { get; private set; }
    public DateTime CreatedAt { get; private set; }

    public ApiKey(Guid merchantId, string key)
    {
        if (merchantId == Guid.Empty)
            throw new DomainException("ApiKey requires a valid merchant id");

        if (string.IsNullOrWhiteSpace(key))
            throw new DomainException("ApiKey value is required");

        Id = Guid.NewGuid();
        MerchantId = merchantId;
        Key = key;
        IsActive = true;
        CreatedAt = DateTime.UtcNow;
    }

    public void Revoke()
    {
        if (!IsActive)
            return;

        IsActive = false;
    }
}

