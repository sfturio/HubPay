# Como usar o HubPay

Guia rapido para abrir, testar e apresentar o projeto de forma clara, sem foco tecnico excessivo.

## O que e o HubPay
HubPay e um sistema simples para organizar:
- clientes
- cobrancas
- pagamentos

A base tecnica continua forte (API, Clean Architecture e PostgreSQL), mas a experiencia foi pensada para uso direto.

## Resultado esperado da demo
Ao final da demo, voce deve mostrar:
1. conta da loja criada
2. chave de API gerada
3. cliente cadastrado
4. cobranca criada
5. status atualizado para pago

## 1) Subir o projeto
### Pre-requisitos
- .NET 10
- PostgreSQL em execucao

### Comandos
```bash
dotnet tool restore
dotnet restore
dotnet tool run dotnet-ef database update --project src/HubPay.Infrastructure --startup-project src/HubPay.API
dotnet run --project src/HubPay.API
```

Abra a URL local exibida no terminal (ex.: `http://localhost:5201`).

## 2) Ordem recomendada para apresentar
1. **Conta da loja**: criar conta e gerar chave.
2. **Clientes**: cadastrar cliente.
3. **Cobrancas**: criar cobranca para o cliente.
4. **Pagamentos e historico**: mudar status e abrir historico.
5. **Dashboard**: mostrar resumo do mes, pendentes, atrasadas e clientes recentes.

## Status da cobranca (linguagem simples)
- `Pending`: cobranca criada, aguardando acao
- `Authorized`: aprovada para seguir
- `Paid`: pagamento concluido
- `Refused`: recusada
- `Refunded`: cancelada

## Problemas comuns
### Erro 401
- confira ID da conta e chave da API
- clique em **Salvar conexao**

### Cobranca nao criada
- valide o ID do cliente
- valide valor e moeda
- veja a caixa de atividade no painel

### Idempotency-Key
Campo opcional para evitar duplicidade quando a mesma requisicao e reenviada.

## Referencias
- README principal: `README.md`
- documentacao web: `docs/index.html`
- status atual do projeto: `docs/STATUS_PROJETO_FINAL.md`

