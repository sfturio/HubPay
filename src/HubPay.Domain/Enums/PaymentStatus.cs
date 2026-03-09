namespace HubPay.Domain.Enums;

public enum PaymentStatus
{
    Pending = 1,
    Authorized = 2,
    Paid = 3,
    Refused = 4,
    Cancelled = 5
}