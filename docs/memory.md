# HubPay Memory (Atualizado em 2026-03-09)

## Objetivo do projeto
HubPay e um mini payment gateway em C# para portfolio, com foco em:
- Clean Architecture (Domain, Application, Infrastructure, API)
- DDD leve (regras no dominio)
- API REST realista
- PostgreSQL + EF Core
- API Key auth, idempotencia e webhooks

## Stack atual
- .NET 10 / ASP.NET Core 10 (Minimal APIs)
- C#
- EF Core + Npgsql
- xUnit
- OpenAPI (ambiente de desenvolvimento)

## Estrutura
- `src/HubPay.API`
- `src/HubPay.Application`
- `src/HubPay.Domain`
- `src/HubPay.Infrastructure`
- `tests/HubPay.UnitTests`
- `tests/HubPay.IntegrationTests`

## Implementado ate agora

### Dominio
- Entidades principais:
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
  - Document (implementado com normalizacao e validacao por quantidade de digitos)
- Enums:
  - MerchantStatus
  - PaymentStatus
  - PaymentMethod
  - WebhookDeliveryStatus
- Excecao de negocio:
  - DomainException

### Regras de negocio
- Payment inicia em `Pending`
- Transicoes principais suportadas:
  - `Pending -> Authorized`
  - `Authorized -> Paid`
  - `Pending -> Refused`
  - `Pending/Authorized -> Cancelled` (com bloqueio para `Paid`)
- Alteracoes invalidas de estado lancam `DomainException`
- Idempotencia por merchant + key (retorna resposta original se repetido)
- Registro de eventos de pagamento e geracao de webhook events para webhooks ativos

### Application
- Services implementados:
  - MerchantService
  - ApiKeyService
  - CustomerService
  - PaymentService
  - WebhookService
- DTOs de request/response para cada feature
- `PaymentService` atualizado para operar sempre com escopo de merchant nas consultas mutaveis e de leitura

### Infrastructure
- `HubPayDbContext` com DbSets das entidades principais
- Configuracoes EF Core por entidade
- Repositorios implementados para todas as interfaces de dominio
- `PaymentRepository` com busca por `paymentId + merchantId`
- `ApiKeyRepository` com verificacao de chave ativa por merchant

### API
- Minimal APIs organizadas por grupos (`/merchants`, `/customers`, `/payments`, `/webhooks`)
- Autenticacao por API key via `AuthenticationHandler` custom (`ApiKeyAuthenticationHandler`)
- `UseAuthentication()` + `UseAuthorization()` no pipeline
- Middleware global de excecao com resposta `application/problem+json`
- Endpoints de pagamentos protegidos e com escopo do merchant autenticado
- Endpoint de geracao de API key com regra de bootstrap inicial + protecao por merchant

### Testes
- Unit tests com validacoes essenciais de dominio:
  - pagamento inicia como pending
  - pagamento nao pode ser pago sem autorizacao
  - money nao aceita zero/negativo
- Integration test basico de auth (endpoint protegido retorna 401 sem API key)
- Estado atual validado com sucesso em:
  - `dotnet test HubPay.slnx`

## Decisoes recentes importantes
- Troca de middleware de auth manual por `AuthenticationHandler` nativo do ASP.NET Core
- Inclusao de tratamento global centralizado de erros
- Fortalecimento de isolamento multi-tenant por merchant nos endpoints/servico de pagamento
- Padronizacao do `Document` como Value Object real no dominio

## Proximos passos (priorizados)
1. Criar migration do EF Core para refletir as mudancas recentes de mapeamento (`Document` owned type e ajustes relacionados).
2. Implementar endpoint/listagem de `PaymentEvents` por pagamento (com escopo de merchant).
3. Adicionar testes de transicao de status restantes (authorize/refuse/cancel) e cenarios de idempotencia.
4. Melhorar validacao de requests na borda da API (ex.: campos obrigatorios/tamanho) para erros mais previsiveis antes de chegar no dominio.
5. Implementar logging estruturado de eventos chave (criacao de pagamento, mudanca de status, falha de webhook), sem expor segredos.
6. Planejar processamento de envio real de webhooks (job/background worker + retentativas).
7. Revisar politicas de seguranca complementares (rate limiting, hardening de headers e observabilidade basica).

## Nota operacional
- Regras de desenvolvimento sao mantidas em `docs/rules.md` e devem ser seguidas em todas as proximas alteracoes.