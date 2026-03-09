using HubPay.Domain.Entities;
using HubPay.Domain.Repositories;
using HubPay.Domain.ValueObjects;

namespace HubPay.Application.Customers;

public class CustomerService
{
    private readonly ICustomerRepository _customerRepository;

    public CustomerService(ICustomerRepository customerRepository)
    {
        _customerRepository = customerRepository;
    }

    public async Task<CustomerResponse> CreateAsync(CreateCustomerRequest request)
    {
        var email = new Email(request.Email);
        var document = new Document(request.Document);
        var customer = new Customer(request.Name, document, email);

        await _customerRepository.AddAsync(customer);

        return ToResponse(customer);
    }

    public async Task<CustomerResponse?> GetByIdAsync(Guid id)
    {
        var customer = await _customerRepository.GetByIdAsync(id);
        return customer is null ? null : ToResponse(customer);
    }

    private static CustomerResponse ToResponse(Customer customer)
    {
        return new CustomerResponse(
            customer.Id,
            customer.Name,
            customer.Document.Value,
            customer.Email.Value,
            customer.CreatedAt);
    }
}