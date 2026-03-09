namespace HubPay.Application.ApiKeys;

public record GenerateApiKeyResponse(string Key);

public record RevokeApiKeyRequest(string Key);