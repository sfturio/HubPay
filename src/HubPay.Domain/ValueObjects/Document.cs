using HubPay.Domain.Exceptions;

namespace HubPay.Domain.ValueObjects;

public class Document
{
    public string Value { get; }

    public Document(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
            throw new DomainException("Document is required");

        var normalized = new string(value.Where(char.IsDigit).ToArray());
        if (normalized.Length is not (11 or 14))
            throw new DomainException("Document must contain 11 or 14 digits");

        Value = normalized;
    }

    public override string ToString() => Value;
}