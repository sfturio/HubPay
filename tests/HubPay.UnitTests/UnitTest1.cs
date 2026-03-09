using HubPay.Domain.Entities;
using HubPay.Domain.Enums;
using HubPay.Domain.Exceptions;
using HubPay.Domain.ValueObjects;

namespace HubPay.UnitTests;

public class PaymentDomainTests
{
    [Fact]
    public void Payment_starts_as_pending()
    {
        var payment = new Payment(
            Guid.NewGuid(),
            Guid.NewGuid(),
            new Money(100, "BRL"),
            PaymentMethod.CreditCard,
            "Order #123");

        Assert.Equal(PaymentStatus.Pending, payment.Status);
    }

    [Fact]
    public void Payment_cannot_be_paid_before_authorized()
    {
        var payment = new Payment(
            Guid.NewGuid(),
            Guid.NewGuid(),
            new Money(100, "BRL"),
            PaymentMethod.CreditCard,
            "Order #123");

        Assert.Throws<DomainException>(() => payment.MarkAsPaid());
    }

    [Fact]
    public void Money_cannot_be_zero_or_negative()
    {
        Assert.Throws<DomainException>(() => new Money(0, "BRL"));
        Assert.Throws<DomainException>(() => new Money(-1, "BRL"));
    }
}