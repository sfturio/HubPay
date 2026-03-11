# HubPay - .NET 10 + Clean Architecture

---

![.NET 10](https://img.shields.io/badge/.NET-10-512BD4?style=flat-square&logo=dotnet&logoColor=white)
![ASP.NET Core](https://img.shields.io/badge/ASP.NET%20Core-Minimal%20API-5C2D91?style=flat-square)
![EF Core](https://img.shields.io/badge/EF%20Core-ORM-6DB33F?style=flat-square)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=flat-square&logo=postgresql&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active-22C55E?style=flat-square)

A modular payment gateway backend built with .NET 10 and Clean Architecture, designed for clarity, scalability, and portfolio-ready code quality.

- **Technical Documentation:** https://sfturio.github.io/HubPay/
- **Repository:** https://github.com/sfturio/HubPay

---

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
- `Refused`
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
- `POST /payments/{id}/refuse`
- `POST /payments/{id}/cancel`

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



