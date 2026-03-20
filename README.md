# HubPay (base tecnica HubPay)

![.NET 10](https://img.shields.io/badge/.NET-10-512BD4?style=flat-square&logo=dotnet&logoColor=white)
![ASP.NET Core](https://img.shields.io/badge/ASP.NET%20Core-Minimal%20API-5C2D91?style=flat-square)
![EF Core](https://img.shields.io/badge/EF%20Core-ORM-6DB33F?style=flat-square)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=flat-square&logo=postgresql&logoColor=white)

HubPay e um sistema simples para organizar **clientes, cobrancas e pagamentos**.

O projeto foi reposicionado para um uso mais direto (pequenos negocios, freelancers e autonomos), mantendo a base tecnica robusta da arquitetura em camadas.

- **Documentacao web:** https://sfturio.github.io/HubPay/
- **Repositorio:** https://github.com/sfturio/HubPay

## Proposta do produto
Ao abrir o sistema, o usuario encontra:
- dashboard com resumo do mes
- total recebido
- cobrancas pendentes e atrasadas
- clientes recentes
- acoes principais de nova cobranca e novo cliente

## Stack tecnica
- .NET 10
- ASP.NET Core Minimal API
- Entity Framework Core
- PostgreSQL
- Swagger / OpenAPI
- Docker

## Estrutura do projeto
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

## Responsabilidades por camada
- `HubPay.Domain`: entidades, value objects, regras de negocio
- `HubPay.Application`: casos de uso, DTOs, servicos de aplicacao
- `HubPay.Infrastructure`: EF Core, repositorios, migrations
- `HubPay.API`: Minimal API, autenticacao, middleware, arquivos estaticos

## Entidades principais
- `Merchant` (conta da loja)
- `Customer` (cliente)
- `Payment` (cobranca/pagamento)
- `PaymentEvent` (historico de status)
- `Webhook` (integracao opcional)
- `IdempotencyRecord`

## Autenticacao
A API usa chave no header:

```http
x-api-key: sk_test_xxxxx
```

O merchant autenticado e resolvido no contexto da requisicao.

## Idempotencia
Na criacao de cobrancas/pagamentos, pode ser enviado:

```http
Idempotency-Key: sua-chave-unica
```

Se a mesma chave for reutilizada para o mesmo merchant com o mesmo payload, a resposta original e retornada.

## Endpoints principais
### Conta (Merchant)
- `POST /merchants`
- `GET /merchants`
- `GET /merchants/{id}`
- `POST /merchants/{id}/api-keys`
- `POST /merchants/{id}/api-keys/revoke`

### Clientes
- `POST /customers`
- `GET /customers`
- `GET /customers/{id}`

### Cobrancas / Pagamentos
- `POST /payments`
- `GET /payments`
- `GET /payments/{id}`
- `GET /payments/{id}/events`
- `POST /payments/{id}/authorize`
- `POST /payments/{id}/pay`
- `POST /payments/{id}/refuse`
- `POST /payments/{id}/cancel`

### Webhooks (opcional)
- `POST /webhooks`
- `GET /webhooks`
- `POST /webhooks/{id}/disable`

## Rodando localmente
1. Configure `HubPayDatabase` em `src/HubPay.API/appsettings.json` (ou env vars).
2. Restaure dependencias:
   - `dotnet tool restore`
   - `dotnet restore`
3. Aplique migrations:
   - `dotnet tool run dotnet-ef database update --project src/HubPay.Infrastructure --startup-project src/HubPay.API`
4. Execute:
   - `dotnet run --project src/HubPay.API`

Com ambiente de desenvolvimento, o Swagger fica em `/swagger`.

## Build e testes
- `dotnet build HubPay.slnx`
- `dotnet test HubPay.slnx`

