using System.Security.Claims;
using System.Text.Encodings.Web;
using HubPay.Domain.Repositories;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;

namespace HubPay.API.Auth;

public class ApiKeyAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
{
    public const string SchemeName = "ApiKey";
    public const string ApiKeyHeaderName = "x-api-key";

    public ApiKeyAuthenticationHandler(
        IOptionsMonitor<AuthenticationSchemeOptions> options,
        ILoggerFactory logger,
        UrlEncoder encoder)
        : base(options, logger, encoder)
    {
    }

    protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        if (!Request.Headers.TryGetValue(ApiKeyHeaderName, out var apiKeyHeaderValues))
            return AuthenticateResult.NoResult();

        var apiKeyValue = apiKeyHeaderValues.ToString().Trim();
        if (string.IsNullOrWhiteSpace(apiKeyValue))
            return AuthenticateResult.Fail("API key is empty.");

        var apiKeyRepository = Context.RequestServices.GetRequiredService<IApiKeyRepository>();
        var apiKey = await apiKeyRepository.GetActiveByKeyAsync(apiKeyValue);
        if (apiKey is null)
        {
            Logger.LogWarning("Authentication failed: invalid API key.");
            return AuthenticateResult.Fail("Invalid API key.");
        }

        Context.Items["MerchantId"] = apiKey.MerchantId;

        var claims = new[]
        {
            new Claim("merchantId", apiKey.MerchantId.ToString()),
            new Claim(ClaimTypes.NameIdentifier, apiKey.MerchantId.ToString())
        };

        var identity = new ClaimsIdentity(claims, SchemeName);
        var principal = new ClaimsPrincipal(identity);
        var ticket = new AuthenticationTicket(principal, SchemeName);

        return AuthenticateResult.Success(ticket);
    }
}
