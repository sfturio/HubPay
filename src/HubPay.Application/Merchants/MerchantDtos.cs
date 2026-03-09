namespace HubPay.Application.Merchants;

public record CreateMerchantRequest(string Name, string Document, string Email);

public record MerchantResponse(Guid Id, string Name, string Document, string Email, string Status, DateTime CreatedAt);

