using HubPay.Domain.Enums;

namespace HubPay.Application.Payments;

public record CreatePaymentRequest(
    Guid CustomerId,
    decimal Amount,
    string Currency,
    PaymentMethod PaymentMethod = PaymentMethod.Pix,
    string Description = "");

public record ListPaymentsRequest(string? Status, Guid? CustomerId);

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

public record PaymentEventResponse(
    Guid Id,
    Guid PaymentId,
    string PreviousStatus,
    string NewStatus,
    string? Description,
    DateTime CreatedAt);
