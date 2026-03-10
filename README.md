# HubPay

HubPay is a study project that simulates a payment gateway using .NET 10 and Clean Architecture principles.

The project includes:
- A backend API with merchant, customer, payment, idempotency, and webhook flows
- A web console served by the API (`wwwroot`) for end-to-end manual testing
- A docs page in `docs/site`

## Live Demo
- App: [https://hubpay.onrender.com/](https://hubpay.onrender.com/)

## Tech Stack
- .NET 10
- ASP.NET Core Minimal APIs
- Entity Framework Core
- PostgreSQL

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

## Architecture Overview
- `HubPay.Domain`: entities, value objects, enums, business rules, repository contracts
- `HubPay.Application`: use-case services and DTOs
- `HubPay.Infrastructure`: EF Core context, mappings, repositories, migrations
- `HubPay.API`: endpoint mapping, auth, middleware, OpenAPI/Swagger, static frontend hosting

## Main Features
- Merchant creation and listing
- API key generation and revocation by merchant
- Customer creation
- Payment creation with optional `Idempotency-Key`
- Payment lifecycle actions: `authorize`, `capture`, `refuse`, `cancel`
- Payment event timeline (`/payments/{id}/events`)
- Webhook creation, listing, and disable flow
- Centralized exception handling with `application/problem+json`

## API Endpoints
### Merchants
- `POST /merchants/`
- `GET /merchants/`
- `GET /merchants/{id}`
- `POST /merchants/{id}/api-keys`
- `POST /merchants/{id}/api-keys/revoke`

### Customers
- `POST /customers/`
- `GET /customers/{id}`

### Payments
- `POST /payments/`
- `GET /payments/`
- `GET /payments/{id}`
- `GET /payments/{id}/events`
- `POST /payments/{id}/authorize`
- `POST /payments/{id}/capture`
- `POST /payments/{id}/refuse`
- `POST /payments/{id}/cancel`

### Webhooks
- `POST /webhooks/`
- `GET /webhooks/`
- `POST /webhooks/{id}/disable`

## Authentication
Use merchant API key as Bearer token:

```http
Authorization: Bearer sk_test_xxxxx
```

## Idempotency
When creating payments, you can send:

```http
Idempotency-Key: your-unique-key
```

If the same key is reused for the same merchant, HubPay returns the original response.

## Frontend Console
The console is served by `HubPay.API` static files:
- `src/HubPay.API/wwwroot/index.html`
- `src/HubPay.API/wwwroot/styles.css`
- `src/HubPay.API/wwwroot/app.js`

Current console highlights:
- Merchant/customer/payment/webhook flows
- Payment actions and timeline view
- PT-BR/EN language toggle

## Running Locally
1. Configure `HubPayDatabase` in `src/HubPay.API/appsettings.json` or environment variables.
2. Restore dependencies and tools:
   - `dotnet restore`
   - `dotnet tool restore`
3. Apply migrations:
   - `dotnet tool run dotnet-ef database update --project src/HubPay.Infrastructure --startup-project src/HubPay.API`
4. Run the API:
   - `dotnet run --project src/HubPay.API`
5. Open the app URL (console is served at `/`).

## Build and Test
- `dotnet build HubPay.slnx`
- `dotnet test HubPay.slnx`

## Docs
- Technical docs site: `docs/site`
- Deploy guide: `docs/DEPLOY.md`
- API Swagger (development): `/swagger`

## Notes
This is an educational/portfolio project focused on backend architecture and API design practices.
