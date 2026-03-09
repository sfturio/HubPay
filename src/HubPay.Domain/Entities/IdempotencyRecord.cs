using HubPay.Domain.Exceptions;

namespace HubPay.Domain.Entities;

public class IdempotencyRecord
{
    public Guid Id { get; private set; }
    public Guid MerchantId { get; private set; }
    public string Key { get; private set; }
    public string RequestHash { get; private set; }
    public string ResponseBody { get; private set; }
    public int StatusCode { get; private set; }
    public DateTime CreatedAt { get; private set; }

    public IdempotencyRecord(Guid merchantId, string key, string requestHash, string responseBody, int statusCode)
    {
        if (merchantId == Guid.Empty)
            throw new DomainException("IdempotencyRecord requires a valid merchant id");

        if (string.IsNullOrWhiteSpace(key))
            throw new DomainException("Idempotency key is required");

        if (string.IsNullOrWhiteSpace(requestHash))
            throw new DomainException("Request hash is required");

        if (statusCode < 100 || statusCode > 599)
            throw new DomainException("Status code is invalid");

        MerchantId = merchantId;
        Key = key;
        RequestHash = requestHash;
        ResponseBody = responseBody;
        StatusCode = statusCode;

        Id = Guid.NewGuid();
        CreatedAt = DateTime.UtcNow;
    }
}

