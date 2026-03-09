using HubPay.Domain.Enums;

namespace HubPay.Application.Payments;

public record CreatePaymentRequest(
    Guid CustomerId,
    decimal Amount,
    string Currency,
    PaymentMethod PaymentMethod,
    string Description);

public record PaymentResponse(
    Guid Id,
    Guid MerchantId,
    Guid CustomerId,
    decimal Amount,
    string Currency,
    string PaymentMethod,
    string Status,
    string Description,
    string IdempotencyKey,
    DateTime CreatedAt,
    DateTime UpdatedAt);

