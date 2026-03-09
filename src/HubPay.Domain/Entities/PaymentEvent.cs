using HubPay.Domain.Enums;
using HubPay.Domain.Exceptions;

namespace HubPay.Domain.Entities;

public class PaymentEvent
{
    public Guid Id { get; private set; }
    public Guid PaymentId { get; private set; }
    public PaymentStatus PreviousStatus { get; private set; }
    public PaymentStatus NewStatus { get; private set; }
    public string? Description { get; private set; }
    public DateTime CreatedAt { get; private set; }

    public PaymentEvent(Guid paymentId, PaymentStatus previousStatus, PaymentStatus newStatus, string? description)
    {
        if (paymentId == Guid.Empty)
            throw new DomainException("PaymentEvent requires a valid payment id");

        if (previousStatus == newStatus)
            throw new DomainException("PaymentEvent must represent a status change");

        if (description is not null && description.Length > 500)
            throw new DomainException("PaymentEvent description is too long");

        Id = Guid.NewGuid();
        PaymentId = paymentId;
        PreviousStatus = previousStatus;
        NewStatus = newStatus;
        Description = description;
        CreatedAt = DateTime.UtcNow;
    }
}

