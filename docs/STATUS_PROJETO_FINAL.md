# HubPay - Status do projeto

Gerado em: 2026-03-20

## Resumo
O projeto foi reposicionado de "gateway tecnico" para "sistema simples de gestao de clientes, cobrancas e pagamentos", mantendo a mesma stack e arquitetura.

## Mudancas principais aplicadas
- Rebranding visual e textual para **HubPay**.
- Console web reformulado com foco em produto:
  - Dashboard
  - Clientes
  - Cobrancas
  - Pagamentos/Historico
- Dashboard com:
  - resumo do mes
  - total recebido
  - cobrancas pendentes
  - cobrancas atrasadas
  - clientes recentes
- CTA principal: **Nova cobranca**
- CTA secundario: **Novo cliente**
- Area tecnica (webhooks) movida para secao opcional.

## Ajustes de linguagem (copy)
- termos tecnicos reduzidos na interface principal
- "Merchant" exposto como "Conta da loja"
- "Payment lifecycle" exposto como "Status da cobranca"
- API key mantida apenas na configuracao da conta

## Ajuste funcional minimo no backend
- Novo endpoint `GET /customers` (autenticado) para alimentar a listagem e os clientes recentes no dashboard.

## Arquivos impactados
- `src/HubPay.API/wwwroot/index.html`
- `src/HubPay.API/wwwroot/styles.css`
- `src/HubPay.API/wwwroot/app.js`
- `src/HubPay.API/Program.cs`
- `src/HubPay.API/Endpoints/EndpointMappingExtensions.cs`
- `src/HubPay.Application/Customers/CustomerService.cs`
- `src/HubPay.Domain/Repositories/ICustomerRepository.cs`
- `src/HubPay.Infrastructure/Repositories/CustomerRepository.cs`
- `README.md`
- `docs/index.html`
- `docs/app.js`
- `docs/COMO_USAR.md`
- `docs/HubPayProjetoInicio.md`

## Resultado
A versao atual transmite uma proposta clara em poucos segundos e fica mais adequada para portfolio junior-pleno sem perder consistencia tecnica.

