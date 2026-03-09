# Como Usar o HubPay (Guia Simples para RH)

Este documento foi feito para qualquer pessoa conseguir abrir o sistema, testar o fluxo e entender o produto, mesmo sem background técnico.

## O que é o HubPay
HubPay é um simulador de gateway de pagamento para portfólio.

Na prática, você consegue demonstrar:
- cadastro de lojista (merchant)
- criação de cliente
- criação de pagamento
- mudança de status do pagamento
- eventos e webhooks

## Resultado esperado da demo
Ao final do teste, você deve conseguir mostrar:
1. um merchant criado
2. uma chave de API gerada
3. um cliente criado
4. um pagamento criado
5. um status alterado (ex.: "Autorizado" ou "Pago")

---

## Parte 1: Subir o sistema (1 vez)

### Pré-requisitos
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

### 1) Configuração de Conexão
- Em "URL Base da API", deixe a URL local (ex.: `http://localhost:5201`)
- Clique em **Salvar Sessão**

### 2) Cadastro de Merchant
- Preencha nome, documento e e-mail
- Clique em **Criar Merchant**
- Clique em **Gerar Chave**
- A chave será exibida e preenchida no campo de conexão

### 3) Cadastro de Cliente
- Preencha nome, documento e e-mail
- Clique em **Criar Cliente**

### 4) Nova Transação de Pagamento
- Confira o **ID do Cliente**
- Informe o **Valor Total**
- Escolha a **Moeda**
- Escolha o **Método**
- Preencha descrição
- Clique em **Executar Pagamento**

### 5) Transações em Tempo Real
- Clique em **Atualizar Pagamentos**
- Use os botões de ação:
  - **Autorizar**
  - **Marcar como Pago**
  - **Recusar**
  - **Cancelar**
  - **Eventos**

### 6) Webhooks
- Cadastre URL
- Atualize a lista
- Desative quando necessário

---

## Significado dos status (linguagem simples)
- **Pending**: pagamento criado, aguardando ação
- **Authorized**: pagamento aprovado
- **Paid**: pagamento efetivado
- **Refused**: pagamento negado
- **Cancelled**: pagamento cancelado

---

## Dúvidas comuns

### "401 Unauthorized"
Significa problema de autenticação.
- Verifique se a API Key está preenchida
- Verifique se o Merchant ID combina com essa chave
- Clique em **Salvar Sessão** novamente

### "Não criou pagamento"
- Confirme se moeda está correta (`BRL`, `USD` ou `EUR`)
- Confira se cliente existe
- Veja a mensagem no bloco "Log de Atividade"

### "Idempotency-Key"
É uma chave para evitar duplicidade em tentativas repetidas.
Pode deixar em branco na demo inicial.

---

## Roteiro pronto para apresentação (2-3 minutos)
1. Mostrar que a API está conectada
2. Criar merchant
3. Gerar API key
4. Criar cliente
5. Criar pagamento
6. Mudar status para "Autorizado" e depois "Pago"
7. Abrir "Eventos" para mostrar trilha da operação

---

## Arquivos de referência
- Regras do projeto: `docs/rules.md`
- Memória técnica: `docs/memory.md`
- Visão geral técnica: `README.md`
