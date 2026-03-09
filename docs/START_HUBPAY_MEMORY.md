# HubPay Project Memory

## Visão do projeto

HubPay é um mini payment gateway feito em C# para estudo e portfólio.

Objetivo:
- praticar arquitetura limpa
- modelar domínio forte
- construir uma API REST realista
- usar banco de dados relacional
- implementar features comuns de gateways reais

Projeto com foco em:
- clean code
- separação de responsabilidades
- regras de negócio dentro do domínio
- backend profissional para portfólio

---

## Stack principal

### Backend
- C#
- .NET 8
- ASP.NET Core Web API

### Banco
- PostgreSQL

### ORM
- Entity Framework Core

### Infra
- Docker
- Docker Compose

### Qualidade e suporte
- Swagger / OpenAPI
- FluentValidation
- Serilog
- xUnit

---

## Arquitetura

Baseada em Clean Architecture + DDD leve.

### Solution

HubPay.sln

src/
- HubPay.API
- HubPay.Application
- HubPay.Domain
- HubPay.Infrastructure

tests/
- HubPay.UnitTests
- HubPay.IntegrationTests

---

## Responsabilidade das camadas

### Domain
- entidades
- value objects
- enums
- regras de negócio
- interfaces de repositório
- exceções de domínio

### Application
- casos de uso
- DTOs
- validações
- orquestração

### Infrastructure
- EF Core
- DbContext
- repositories
- migrations
- integrações técnicas

### API
- controllers
- middleware
- configuração de DI
- endpoints HTTP
- swagger
- autenticação

---

## Entidades principais

### Merchant
- Id
- Name
- Document
- Email
- Status
- CreatedAt

### ApiKey
- Id
- MerchantId
- Key
- IsActive
- CreatedAt

### Customer
- Id
- Name
- Document
- Email
- CreatedAt

### Payment
- Id
- MerchantId
- CustomerId
- Amount
- Currency
- PaymentMethod
- Status
- Description
- IdempotencyKey
- CreatedAt
- UpdatedAt

### PaymentEvent
- Id
- PaymentId
- PreviousStatus
- NewStatus
- Description
- CreatedAt

### Webhook
- Id
- MerchantId
- Url
- IsActive
- CreatedAt

### WebhookEvent
- Id
- WebhookId
- PaymentId
- EventType
- Payload
- Status
- AttemptCount
- CreatedAt
- SentAt

### IdempotencyRecord
- Id
- MerchantId
- Key
- RequestHash
- ResponseBody
- StatusCode
- CreatedAt

---

## Value Objects

### Money
- Amount
- Currency

### Email

### Document

---

## Enums

### PaymentStatus
- Pending
- Authorized
- Paid
- Refused
- Cancelled

### PaymentMethod
- CreditCard
- Pix
- Boleto

### MerchantStatus
- Active
- Inactive
- Suspended

### WebhookDeliveryStatus
- Pending
- Sent
- Failed

---

## Regras principais do domínio

### Payment
Somente o domínio controla mudança de status.

Fluxos válidos:
- Pending -> Authorized
- Authorized -> Paid
- Pending -> Refused
- Pending -> Cancelled
- Authorized -> Cancelled

Mudança inválida deve lançar DomainException.

### ApiKey
- pertence a um merchant
- pode ser ativa ou inativa

### Idempotency
- mesma key para o mesmo merchant não pode criar pagamento duplicado
- se mesma key chegar novamente, deve retornar a resposta original

### Webhook
- merchant pode registrar URL para receber eventos
- quando pagamento muda de status, evento deve ser registrado para envio

---

## Casos de uso do MVP

### Merchants
- CreateMerchant
- GetMerchantById
- ListMerchants

### API Keys
- GenerateApiKey
- RevokeApiKey

### Customers
- CreateCustomer
- GetCustomerById

### Payments
- CreatePayment
- GetPaymentById
- ListPayments
- AuthorizePayment
- RefusePayment
- CancelPayment
- MarkPaymentAsPaid

### Payment Events
- ListPaymentEvents

### Webhooks
- CreateWebhook
- ListWebhooks
- DisableWebhook

---

## Features avançadas escolhidas

### 1. API Key por merchant
Request autenticada por API key.
Merchant é identificado via header.

Exemplo:
Authorization: Bearer sk_test_xxxxx

### 2. Idempotência
Header:
Idempotency-Key: abc-123

Evita pagamentos duplicados.

### 3. Webhooks
Quando pagamento muda de status:
- payment.authorized
- payment.paid
- payment.refused
- payment.cancelled

HubPay registra e envia evento HTTP POST para URLs cadastradas.

---

## Banco de dados

Tabelas principais:
- merchants
- api_keys
- customers
- payments
- payment_events
- webhooks
- webhook_events
- idempotency_records

Relacionamentos:
- merchant -> api_keys (1:N)
- merchant -> payments (1:N)
- merchant -> webhooks (1:N)
- customer -> payments (1:N)
- payment -> payment_events (1:N)
- webhook -> webhook_events (1:N)

---

## Princípios do projeto

- domain forte
- controllers finos
- use cases claros
- repositories isolando persistência
- regras no domínio, não no controller
- projeto com cara de backend real

---

## Objetivo final de portfólio

Demonstrar:
- ASP.NET Core Web API
- Clean Architecture
- DDD básico
- PostgreSQL
- EF Core
- autenticação por API key
- idempotência
- webhooks
- logging
- validação
- docker
- testes