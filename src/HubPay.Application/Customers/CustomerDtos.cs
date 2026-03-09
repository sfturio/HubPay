namespace HubPay.Application.Customers;

public record CreateCustomerRequest(string Name, string Document, string Email);

public record CustomerResponse(Guid Id, string Name, string Document, string Email, DateTime CreatedAt);

