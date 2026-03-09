using HubPay.Domain.Enums;
using HubPay.Domain.Exceptions;

namespace HubPay.Domain.Entities;

public class WebhookEvent
{
    public Guid Id { get; private set; }
    public Guid WebhookId { get; private set; }
    public Guid PaymentId { get; private set; }
    public string EventType { get; private set; }
    public string Payload { get; private set; }
    public WebhookDeliveryStatus Status { get; private set; }
    public int AttemptCount { get; private set; }
    public DateTime CreatedAt { get; private set; }
    public DateTime? SentAt { get; private set; }

    public WebhookEvent(Guid webhookId, Guid paymentId, string eventType, string payload)
    {
        if (webhookId == Guid.Empty)
            throw new DomainException("WebhookEvent requires a valid webhook id");

        if (paymentId == Guid.Empty)
            throw new DomainException("WebhookEvent requires a valid payment id");

        if (string.IsNullOrWhiteSpace(eventType))
            throw new DomainException("WebhookEvent type is required");

        if (string.IsNullOrWhiteSpace(payload))
            throw new DomainException("WebhookEvent payload is required");

        Id = Guid.NewGuid();
        WebhookId = webhookId;
        PaymentId = paymentId;
        EventType = eventType;
        Payload = payload;
        Status = WebhookDeliveryStatus.Pending;
        AttemptCount = 0;
        CreatedAt = DateTime.UtcNow;
    }

    public void MarkSent()
    {
        Status = WebhookDeliveryStatus.Sent;
        AttemptCount++;
        SentAt = DateTime.UtcNow;
    }

    public void MarkFailed()
    {
        Status = WebhookDeliveryStatus.Failed;
        AttemptCount++;
    }
}

