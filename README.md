# HubPay

HubPay is a portfolio payment gateway API built with .NET, Clean Architecture, and DDD-lite.

## Highlights
- API key authentication per merchant
- Payment lifecycle with domain-driven status transitions
- Idempotent payment creation (`Idempotency-Key`)
- Webhook event registration for payment state changes
- PostgreSQL persistence with EF Core
- Minimal APIs with clean layer separation

## Tech Stack
- .NET 10 / ASP.NET Core 10
- C#
- Entity Framework Core + Npgsql
- PostgreSQL
- xUnit
- OpenAPI (development)

## Architecture
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

## Domain Concepts
- Merchant
- ApiKey
- Customer
- Payment
- PaymentEvent
- Webhook
- WebhookEvent
- IdempotencyRecord

Value Objects:
- Money
- Email
- Document

## Payment Flow
Valid transitions:
- Pending -> Authorized
- Authorized -> Paid
- Pending -> Refused
- Pending -> Cancelled
- Authorized -> Cancelled

Invalid transitions raise `DomainException`.

## API Basics
Examples:
- `POST /merchants`
- `POST /merchants/{id}/api-keys`
- `POST /customers`
- `POST /payments`
- `GET /payments/{id}`
- `POST /payments/{id}/authorize`
- `POST /payments/{id}/capture`
- `POST /payments/{id}/refuse`
- `POST /payments/{id}/cancel`
- `POST /webhooks`
- `GET /webhooks`

## Authentication
Use API key as Bearer token:
```http
Authorization: Bearer sk_test_xxxxx
```

## Idempotency
Use header on payment creation:
```http
Idempotency-Key: your-unique-key
```

If the same key is reused for the same merchant, HubPay returns the original response.

## Local Setup
1. Configure connection string in API settings (or env vars).
2. Restore tools and packages:
   - `dotnet tool restore`
   - `dotnet restore`
3. Apply migrations:
   - `dotnet tool run dotnet-ef database update --project src/HubPay.Infrastructure --startup-project src/HubPay.API`
4. Run API:
   - `dotnet run --project src/HubPay.API`

## Build and Test
- `dotnet build HubPay.slnx`
- `dotnet test HubPay.slnx`

## Notes
- Keep business rules in Domain.
- Keep endpoints/controllers thin.
- Do not commit secrets.
- Follow project rules in `docs/rules.md`.