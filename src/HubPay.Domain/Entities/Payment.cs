using HubPay.Domain.Enums;
using HubPay.Domain.Exceptions;
using HubPay.Domain.ValueObjects;

namespace HubPay.Domain.Entities;

public class Payment
{
    private Payment()
    {
        Amount = null!;
        Description = string.Empty;
        IdempotencyKey = string.Empty;
    }

    public Guid Id { get; private set; }
    public Guid MerchantId { get; private set; }
    public Guid CustomerId { get; private set; }

    public Money Amount { get; private set; }

    public PaymentMethod PaymentMethod { get; private set; }

    public PaymentStatus Status { get; private set; }

    public string Description { get; private set; }

    public string IdempotencyKey { get; private set; }

    public DateTime CreatedAt { get; private set; }
    public DateTime UpdatedAt { get; private set; }

    public Payment(Guid merchantId, Guid customerId, Money amount, PaymentMethod paymentMethod, string description, string? idempotencyKey = null)
    {
        Id = Guid.NewGuid();
        MerchantId = merchantId;
        CustomerId = customerId;
        Amount = amount;
        PaymentMethod = paymentMethod;
        Description = description;

        if (idempotencyKey is not null && string.IsNullOrWhiteSpace(idempotencyKey))
            throw new DomainException("Idempotency key cannot be empty or whitespace");

        IdempotencyKey = idempotencyKey ?? string.Empty;

        Status = PaymentStatus.Pending;

        CreatedAt = DateTime.UtcNow;
        UpdatedAt = DateTime.UtcNow;
    }

    public void Authorize()
    {
        if (Status != PaymentStatus.Pending)
            throw new DomainException("Payment cannot be authorized");

        Status = PaymentStatus.Authorized;
        UpdatedAt = DateTime.UtcNow;
    }

    public void Refuse()
    {
        if (Status != PaymentStatus.Pending)
            throw new DomainException("Payment cannot be refused");

        Status = PaymentStatus.Refused;
        UpdatedAt = DateTime.UtcNow;
    }

    public void MarkAsPaid()
    {
        if (Status != PaymentStatus.Authorized)
            throw new DomainException("Payment must be authorized before being paid");

        Status = PaymentStatus.Paid;
        UpdatedAt = DateTime.UtcNow;
    }

    public void Cancel()
    {
        if (Status == PaymentStatus.Paid)
            throw new DomainException("Paid payment cannot be cancelled");

        Status = PaymentStatus.Cancelled;
        UpdatedAt = DateTime.UtcNow;
    }
}