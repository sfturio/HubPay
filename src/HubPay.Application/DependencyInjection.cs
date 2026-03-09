using HubPay.Application.ApiKeys;
using HubPay.Application.Merchants;
using HubPay.Application.Customers;
using HubPay.Application.Payments;
using HubPay.Application.Webhooks;
using Microsoft.Extensions.DependencyInjection;

namespace HubPay.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<MerchantService>();
        services.AddScoped<CustomerService>();
        services.AddScoped<PaymentService>();
        services.AddScoped<WebhookService>();
        services.AddScoped<ApiKeyService>();

        return services;
    }
}

