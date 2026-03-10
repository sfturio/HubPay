# HubPay

HubPay is a study project that simulates a mini payment gateway using .NET 10 and Clean Architecture.

The goal is to keep the backend clean, understandable, and portfolio-ready.

## Tech Stack
- .NET 10
- ASP.NET Core Minimal APIs
- Entity Framework Core
- PostgreSQL
- Swagger / OpenAPI
- Docker
- Render (deployment)

## Project Structure
```text
src/
  HubPay.API
  HubPay.Application
  HubPay.Domain
  HubPay.Infrastructure

tests/
  HubPay.UnitTests
  HubPay.IntegrationTests
```

## Layer Responsibilities
- `HubPay.Domain`: entities, value objects, domain rules, domain exceptions
- `HubPay.Application`: use cases/services, DTOs, repository abstractions
- `HubPay.Infrastructure`: EF Core context/configuration, repositories, migrations
- `HubPay.API`: Minimal API endpoints, authentication, request/response pipeline

## Core Entities
- `Merchant`: `Id`, `Name`, `Email`, `CreatedAt` (API keys managed in dedicated entity)
- `Customer`: `Id`, `Name`, `Email`, `Document`, `CreatedAt`
- `Payment`: `Id`, `Amount`, `Currency`, `Status`, `CustomerId`, `MerchantId`, `IdempotencyKey`, `CreatedAt`
- `IdempotencyRecord`: `Id`, `Key`, `ResponseBody`, `CreatedAt` (+ merchant/status metadata)

Payment statuses:
- `Pending`
- `Authorized`
- `Paid`
- `Failed`
- `Refunded`

## Authentication
HubPay uses API key authentication via header:

```http
x-api-key: sk_test_xxxxx
```

The authenticated merchant id is attached to request context and claims.

## Idempotency
When creating payments, clients can send:

```http
Idempotency-Key: your-unique-key
```

If the same key is reused by the same merchant, HubPay returns the original response instead of creating a new payment.

## Main Endpoints
### Payments
- `POST /payments`
- `GET /payments/{id}`
- `GET /payments`

Supported filters:
- `GET /payments?status=paid`
- `GET /payments?customerId={uuid}`

Lifecycle actions currently available:
- `POST /payments/{id}/authorize`
- `POST /payments/{id}/pay`
- `POST /payments/{id}/fail`
- `POST /payments/{id}/refund`

## Error Format
Errors use a consistent JSON shape:

```json
{
  "error": "Payment not found"
}
```

## Running Locally
1. Configure `HubPayDatabase` in `src/HubPay.API/appsettings.json` or environment variables.
2. Restore dependencies and tools:
   - `dotnet restore`
   - `dotnet tool restore`
3. Apply migrations:
   - `dotnet tool run dotnet-ef database update --project src/HubPay.Infrastructure --startup-project src/HubPay.API`
4. Run:
   - `dotnet run --project src/HubPay.API`

Swagger is available in development at `/swagger`.

## Build and Test
- `dotnet build HubPay.slnx`
- `dotnet test HubPay.slnx`
