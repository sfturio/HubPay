namespace HubPay.Application.Webhooks;

public record CreateWebhookRequest(string Url);

public record WebhookResponse(Guid Id, string Url, bool IsActive, DateTime CreatedAt);

