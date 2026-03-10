# Como Usar o HubPay (Guia Simples para RH)

Este documento foi feito para qualquer pessoa conseguir abrir o sistema, testar o fluxo e entender o produto, mesmo sem background tÃ©cnico.

## O que Ã© o HubPay
HubPay Ã© um simulador de gateway de pagamento para portfÃ³lio.

Na prÃ¡tica, vocÃª consegue demonstrar:
- cadastro de lojista (merchant)
- criaÃ§Ã£o de cliente
- criaÃ§Ã£o de pagamento
- mudanÃ§a de status do pagamento
- eventos e webhooks

## Resultado esperado da demo
Ao final do teste, vocÃª deve conseguir mostrar:
1. um merchant criado
2. uma chave de API gerada
3. um cliente criado
4. um pagamento criado
5. um status alterado (ex.: "Autorizado" ou "Pago")

---

## Parte 1: Subir o sistema (1 vez)

### PrÃ©-requisitos
- .NET 10 instalado
- PostgreSQL instalado e rodando

### Passos
Na pasta raiz do projeto:

```bash
dotnet tool restore
dotnet restore
dotnet tool run dotnet-ef database update --project src/HubPay.Infrastructure --startup-project src/HubPay.API
dotnet run --project src/HubPay.API
```

Depois abra no navegador a URL que aparecer no terminal (ex.: `http://localhost:5201`).

---

## Parte 2: Fluxo da interface (ordem ideal para demo)

### 1) ConfiguraÃ§Ã£o de ConexÃ£o
- Em "URL Base da API", deixe a URL local (ex.: `http://localhost:5201`)
- Clique em **Salvar SessÃ£o**

### 2) Cadastro de Merchant
- Preencha nome, documento e e-mail
- Clique em **Criar Merchant**
- Clique em **Gerar Chave**
- A chave serÃ¡ exibida e preenchida no campo de conexÃ£o

### 3) Cadastro de Cliente
- Preencha nome, documento e e-mail
- Clique em **Criar Cliente**

### 4) Nova TransaÃ§Ã£o de Pagamento
- Confira o **ID do Cliente**
- Informe o **Valor Total**
- Escolha a **Moeda**
- Escolha o **MÃ©todo**
- Preencha descriÃ§Ã£o
- Clique em **Executar Pagamento**

### 5) TransaÃ§Ãµes em Tempo Real
- Clique em **Atualizar Pagamentos**
- Use os botÃµes de aÃ§Ã£o:
  - **Autorizar**
  - **Marcar como Pago**
  - **Falhar**
  - **Reembolsar**
  - **Eventos**

### 6) Webhooks
- Cadastre URL
- Atualize a lista
- Desative quando necessÃ¡rio

---

## Significado dos status (linguagem simples)
- **Pending**: pagamento criado, aguardando aÃ§Ã£o
- **Authorized**: pagamento aprovado
- **Paid**: pagamento efetivado
- **Failed**: pagamento negado
- **Refunded**: pagamento cancelado

---

## DÃºvidas comuns

### "401 Unauthorized"
Significa problema de autenticaÃ§Ã£o.
- Verifique se a API Key estÃ¡ preenchida
- Verifique se o Merchant ID combina com essa chave
- Clique em **Salvar SessÃ£o** novamente

### "NÃ£o criou pagamento"
- Confirme se moeda estÃ¡ correta (`BRL`, `USD` ou `EUR`)
- Confira se cliente existe
- Veja a mensagem no bloco "Log de Atividade"

### "Idempotency-Key"
Ã‰ uma chave para evitar duplicidade em tentativas repetidas.
Pode deixar em branco na demo inicial.

---

## Roteiro pronto para apresentaÃ§Ã£o (2-3 minutos)
1. Mostrar que a API estÃ¡ conectada
2. Criar merchant
3. Gerar API key
4. Criar cliente
5. Criar pagamento
6. Mudar status para "Autorizado" e depois "Pago"
7. Abrir "Eventos" para mostrar trilha da operaÃ§Ã£o

---

## Arquivos de referÃªncia
- Regras do projeto: `docs/rules.md`
- MemÃ³ria tÃ©cnica: `docs/memory.md`
- VisÃ£o geral tÃ©cnica: `README.md`

