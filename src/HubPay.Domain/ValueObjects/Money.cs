using HubPay.Domain.Exceptions;

namespace HubPay.Domain.ValueObjects;

public class Money
{
    public decimal Amount { get; }
    public string Currency { get; }

    public Money(decimal amount, string currency)
    {
        if (amount <= 0)
            throw new DomainException("Amount must be greater than zero");

        if (string.IsNullOrWhiteSpace(currency))
            throw new DomainException("Currency is required");

        Amount = amount;
        Currency = currency;
    }
}