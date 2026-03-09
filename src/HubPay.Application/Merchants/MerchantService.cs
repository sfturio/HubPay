using HubPay.Domain.Entities;
using HubPay.Domain.Repositories;
using HubPay.Domain.ValueObjects;

namespace HubPay.Application.Merchants;

public class MerchantService
{
    private readonly IMerchantRepository _merchantRepository;

    public MerchantService(IMerchantRepository merchantRepository)
    {
        _merchantRepository = merchantRepository;
    }

    public async Task<MerchantResponse> CreateAsync(CreateMerchantRequest request)
    {
        var email = new Email(request.Email);
        var document = new Document(request.Document);
        var merchant = new Merchant(request.Name, document, email);

        await _merchantRepository.AddAsync(merchant);

        return ToResponse(merchant);
    }

    public async Task<MerchantResponse?> GetByIdAsync(Guid id)
    {
        var merchant = await _merchantRepository.GetByIdAsync(id);
        return merchant is null ? null : ToResponse(merchant);
    }

    private static MerchantResponse ToResponse(Merchant merchant)
    {
        return new MerchantResponse(
            merchant.Id,
            merchant.Name,
            merchant.Document.Value,
            merchant.Email.Value,
            merchant.Status.ToString(),
            merchant.CreatedAt);
    }
}