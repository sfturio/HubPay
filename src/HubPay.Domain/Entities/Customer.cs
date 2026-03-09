using HubPay.Domain.Exceptions;
using HubPay.Domain.ValueObjects;

namespace HubPay.Domain.Entities;

public class Customer
{
    private Customer()
    {
        Name = string.Empty;
        Document = null!;
        Email = null!;
    }

    public Guid Id { get; private set; }
    public string Name { get; private set; }
    public Document Document { get; private set; }
    public Email Email { get; private set; }
    public DateTime CreatedAt { get; private set; }

    public Customer(string name, Document document, Email email)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new DomainException("Customer name is required");

        Name = name;
        Document = document ?? throw new DomainException("Customer document is required");
        Email = email ?? throw new DomainException("Customer email is required");

        Id = Guid.NewGuid();
        CreatedAt = DateTime.UtcNow;
    }
}