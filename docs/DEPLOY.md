# Deploy do HubPay

Este guia traz um caminho direto para publicar o projeto.

## Opção A: Docker Compose (servidor próprio / VPS)

### Pré-requisitos
- Docker e Docker Compose instalados
- Porta `5201` livre no host

### Passos
Na raiz do projeto:

```bash
cp .env.example .env
```

Edite `.env` e troque a senha do banco.

Suba os serviços:

```bash
docker compose up -d --build
```

A API ficará disponível em:
- `http://SEU_HOST:5201`

Observação: a API aplica migrations automaticamente na inicialização.

## Opção B: Plataforma (Render / Railway / Fly)

Use o Dockerfile:
- `src/HubPay.API/Dockerfile`

### Variáveis obrigatórias
- `ASPNETCORE_ENVIRONMENT=Production`
- `ConnectionStrings__HubPayDatabase=Host=...;Port=5432;Database=...;Username=...;Password=...`

### Porta da aplicação
- Container expõe `8080`

## Checklist pós-deploy
1. Abrir `/` para validar o console web
2. Criar merchant
3. Gerar API key
4. Criar customer e payment

## Segurança mínima
- Não usar senha padrão em produção
- Não versionar `.env` real
- Rotacionar API keys periodicamente
- Restringir acesso ao banco apenas rede privada
