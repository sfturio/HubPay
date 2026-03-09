using System.Text.RegularExpressions;
using HubPay.Domain.Exceptions;

namespace HubPay.Domain.ValueObjects;

public class Email
{
    public string Value { get; }

    public Email(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
            throw new DomainException("Email is required");

        if (!IsValid(value))
            throw new DomainException("Email is invalid");

        Value = value;
    }

    private static bool IsValid(string value)
    {
        // Simple, non-overengineered email validation
        // Ensures there is one '@', some text before and after, and at least one '.'
        var pattern = @"^[^@\s]+@[^@\s]+\.[^@\s]+$";
        return Regex.IsMatch(value, pattern, RegexOptions.CultureInvariant);
    }

    public override string ToString() => Value;
}

