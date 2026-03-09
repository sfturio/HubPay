# HubPay Memory (Updated on 2026-03-09)

## Project Goal
HubPay is a portfolio mini payment gateway in C# focused on:
- Clean Architecture (Domain, Application, Infrastructure, API)
- DDD-lite with business rules in Domain
- Realistic REST API
- PostgreSQL + EF Core
- API key auth, idempotency, and webhook eventing

## Current Stack
- .NET 10 / ASP.NET Core 10 (Minimal APIs)
- C#
- EF Core 10 + Npgsql
- xUnit
- OpenAPI (development)

## Solution Structure
- `src/HubPay.API`
- `src/HubPay.Application`
- `src/HubPay.Domain`
- `src/HubPay.Infrastructure`
- `tests/HubPay.UnitTests`
- `tests/HubPay.IntegrationTests`

## What Is Implemented

### Domain
- Entities:
  - Merchant
  - ApiKey
  - Customer
  - Payment
  - PaymentEvent
  - Webhook
  - WebhookEvent
  - IdempotencyRecord
- Value Objects:
  - Money
  - Email
  - Document (normalized digits, validates 11/14 digits)
- Enums:
  - MerchantStatus
  - PaymentStatus
  - PaymentMethod
  - WebhookDeliveryStatus
- Business exception:
  - DomainException

### Core Business Rules
- Payment starts as `Pending`
- Supported transitions:
  - `Pending -> Authorized`
  - `Authorized -> Paid`
  - `Pending -> Refused`
  - `Pending -> Cancelled`
  - `Authorized -> Cancelled`
- Invalid transitions throw `DomainException`
- Idempotency is scoped by merchant + key
- Payment status changes create `PaymentEvent` + webhook events for active webhooks

### Application Layer
- Services:
  - MerchantService
  - ApiKeyService
  - CustomerService
  - PaymentService
  - WebhookService
- DTOs for requests/responses
- Merchant scoping enforced in payment reads/writes
- Added use cases:
  - List merchants
  - List merchant payments
  - List payment events
  - Revoke API key (merchant-scoped)

### Infrastructure Layer
- `HubPayDbContext` with all main DbSets
- EF configurations for all entities
- Repositories implemented for all domain interfaces
- Payment lookup by `paymentId + merchantId`
- API key active existence check by merchant
- EF migration generated:
  - `NormalizeDocumentValueObject`

### API Layer
- Minimal API groups:
  - `/merchants`
  - `/customers`
  - `/payments`
  - `/webhooks`
- API key auth via `AuthenticationHandler` (`ApiKeyAuthenticationHandler`)
- `UseAuthentication()` + `UseAuthorization()` pipeline
- Global exception middleware returning `application/problem+json`
- Security/ownership hardening:
  - Merchant-scoped payment actions
  - Bootstrap-safe API key generation
  - Merchant-scoped API key revocation endpoint

### Current Endpoints Available
- Merchants:
  - `POST /merchants`
  - `GET /merchants`
  - `GET /merchants/{id}`
  - `POST /merchants/{id}/api-keys`
  - `POST /merchants/{id}/api-keys/revoke`
- Customers:
  - `POST /customers`
  - `GET /customers/{id}`
- Payments:
  - `POST /payments`
  - `GET /payments`
  - `GET /payments/{id}`
  - `GET /payments/{id}/events`
  - `POST /payments/{id}/authorize`
  - `POST /payments/{id}/capture`
  - `POST /payments/{id}/refuse`
  - `POST /payments/{id}/cancel`
- Webhooks:
  - `POST /webhooks`
  - `GET /webhooks`
  - `POST /webhooks/{id}/disable`

### Frontend (Portfolio Console)
- Built inside API static assets (`wwwroot`):
  - `index.html`
  - `styles.css`
  - `app.js`
- Design direction: editorial fintech style (inspired by Stitch reference)
- Features:
  - Connection/session panel (base URL, merchant ID, API key)
  - Merchant create/list, key generate/revoke
  - Customer create
  - Payment create/list and status actions
  - Payment event timeline
  - Webhook create/list/disable
  - Activity log + toasts + loading states
  - Responsive layout with max page width constraint

## Tooling/Operational Notes
- Local .NET tool manifest added with `dotnet-ef` in project root (`dotnet-tools.json`)
- `Microsoft.EntityFrameworkCore.Design` added to API startup project for migration tooling
- `.gitignore` and `README.md` created

## Test Status
- `dotnet build HubPay.slnx`: passing
- `dotnet test HubPay.slnx`: passing
  - Unit tests: domain essentials (3 passing)
  - Integration tests: auth baseline (1 passing)

## Next Prioritized Steps
1. Add request validation at API boundary (required fields, formats, friendly 400s).
2. Add pagination/filtering for merchants/payments list endpoints.
3. Expand tests for full payment transitions + idempotency + webhook event registration.
4. Add structured logging (payment creation, state changes, webhook failures).
5. Implement actual webhook delivery worker with retries/backoff.
6. Add rate limiting and basic health/observability endpoints.

## Team Rule
- Always follow `docs/rules.md` in future changes.