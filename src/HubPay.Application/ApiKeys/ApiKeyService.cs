using System.Security.Cryptography;
using HubPay.Domain.Entities;
using HubPay.Domain.Repositories;

namespace HubPay.Application.ApiKeys;

public class ApiKeyService
{
    private readonly IApiKeyRepository _apiKeyRepository;

    public ApiKeyService(IApiKeyRepository apiKeyRepository)
    {
        _apiKeyRepository = apiKeyRepository;
    }

    public async Task<GenerateApiKeyResponse> GenerateAsync(Guid merchantId)
    {
        var key = GenerateSecureKey();
        var apiKey = new ApiKey(merchantId, key);

        await _apiKeyRepository.AddAsync(apiKey);

        return new GenerateApiKeyResponse(key);
    }

    public async Task<bool> RevokeAsync(Guid merchantId, string key)
    {
        var apiKey = await _apiKeyRepository.GetActiveByKeyAsync(key);
        if (apiKey is null || apiKey.MerchantId != merchantId)
            return false;

        apiKey.Revoke();
        await _apiKeyRepository.UpdateAsync(apiKey);

        return true;
    }

    private static string GenerateSecureKey()
    {
        var bytes = RandomNumberGenerator.GetBytes(32);
        return "sk_test_" + Convert.ToBase64String(bytes)
            .Replace("+", string.Empty)
            .Replace("/", string.Empty)
            .TrimEnd('=');
    }
}