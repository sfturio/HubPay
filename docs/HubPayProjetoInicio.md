# Memoria do projeto HubPay

## Posicionamento atual
HubPay e a nova apresentacao do projeto HubPay.

Objetivo de produto:
- facilitar o controle de clientes
- simplificar criacao de cobrancas
- acompanhar pagamentos com clareza

Objetivo tecnico (portfolio):
- demonstrar dominio de ASP.NET Core Minimal API
- aplicar arquitetura em camadas
- manter organizacao de codigo e qualidade de entrega

## Publico
- pequenos negocios
- freelancers
- autonomos
- profissionais que precisam receber sem planilhas confusas

## Escopo principal
- cadastro de clientes
- criacao de cobrancas
- atualizacao de status de pagamento
- dashboard simples com resumo rapido
- historico de eventos por cobranca

## Escopo que fica tecnico e opcional
- API key
- idempotencia
- webhooks

Esses itens continuam no projeto, mas nao dominam a interface principal.

## Arquitetura preservada
- `HubPay.API`
- `HubPay.Application`
- `HubPay.Domain`
- `HubPay.Infrastructure`

## Entidades principais
- Merchant (conta da loja)
- Customer (cliente)
- Payment (cobranca)
- PaymentEvent (historico)
- Webhook (integracao opcional)
- IdempotencyRecord

## Resultado esperado da experiencia
Ao abrir o sistema, o usuario entende em poucos segundos:
1. para quem o produto foi feito
2. como cadastrar cliente
3. como criar cobranca
4. como acompanhar status e recebimentos

## Nota de branding
- Marca de produto: **HubPay**
- Base tecnica/namespace: **HubPay** (mantida para preservar estrutura e historico do repositorio)

