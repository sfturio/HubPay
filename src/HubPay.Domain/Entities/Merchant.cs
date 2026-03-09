using HubPay.Domain.Enums;
using HubPay.Domain.Exceptions;
using HubPay.Domain.ValueObjects;

namespace HubPay.Domain.Entities;

public class Merchant
{
    private Merchant()
    {
        Name = string.Empty;
        Document = null!;
        Email = null!;
    }

    public Guid Id { get; private set; }
    public string Name { get; private set; }
    public Document Document { get; private set; }
    public Email Email { get; private set; }
    public MerchantStatus Status { get; private set; }
    public DateTime CreatedAt { get; private set; }

    public Merchant(string name, Document document, Email email)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new DomainException("Merchant name is required");

        Name = name;
        Document = document ?? throw new DomainException("Merchant document is required");
        Email = email ?? throw new DomainException("Merchant email is required");

        Id = Guid.NewGuid();
        Status = MerchantStatus.Active;
        CreatedAt = DateTime.UtcNow;
    }

    public void Activate()
    {
        if (Status == MerchantStatus.Active)
            return;

        Status = MerchantStatus.Active;
    }

    public void Inactivate()
    {
        if (Status == MerchantStatus.Inactive)
            return;

        Status = MerchantStatus.Inactive;
    }

    public void Suspend()
    {
        if (Status == MerchantStatus.Suspended)
            return;

        Status = MerchantStatus.Suspended;
    }
}