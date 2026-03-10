const $ = (id) => document.getElementById(id);

const i18n = {
  pt: {
    htmlLang: "pt-BR",
    nextLabel: "EN",
    staticText: {
      ".brand-wrap h1": "HUBPAY CONSOLE",
      ".brand-wrap p": "CORE ENGINE v2.1 // EDICAO EDITORIAL",
      "#connectionStatus": "CONECTADO",
      ".left-stack .panel:nth-of-type(1) h2": "Configuracao de Conexao",
      ".left-stack .panel:nth-of-type(1) label:nth-of-type(1)": "URL BASE DA API",
      ".left-stack .panel:nth-of-type(1) label:nth-of-type(2)": "ID DO MERCHANT",
      ".left-stack .panel:nth-of-type(1) label:nth-of-type(3)": "CHAVE SECRETA DA API",
      "#saveConnection": "Salvar Sessao",
      "#clearConnection": "Limpar",
      ".left-stack .panel:nth-of-type(2) h2": "Cadastro de Merchant",
      "#createMerchantForm label:nth-of-type(1)": "NOME DO NEGOCIO",
      "#createMerchantForm .grid-two label:nth-of-type(1)": "DOCUMENTO",
      "#createMerchantForm .grid-two label:nth-of-type(2)": "E-MAIL",
      "#createMerchantForm .row-btn:nth-of-type(1) button:nth-of-type(1)": "Criar Merchant",
      "#listMerchants": "Atualizar",
      "#generateApiKey": "Gerar Chave",
      "button[form='revokeApiKeyForm']": "Revogar Chave",
      ".left-stack .panel:nth-of-type(3) h2": "Linha do Tempo",
      "#paymentEventsOutput": "Selecione um pagamento e clique em \"Eventos\" para ver a linha do tempo.",
      ".left-stack .panel:nth-of-type(4) h2": "Webhooks",
      "#listWebhooks": "Atualizar Webhooks",
      ".payment-hero h2": "Nova Transacao de Pagamento",
      "#createPaymentForm .grid-two label:nth-of-type(1)": "ID DO CLIENTE",
      "#createPaymentForm .grid-two label:nth-of-type(2)": "IDEMPOTENCY-KEY",
      "#createPaymentForm .grid-three label:nth-of-type(1)": "VALOR TOTAL (DINHEIRO)",
      "#createPaymentForm .grid-three label:nth-of-type(2)": "MOEDA",
      "#createPaymentForm .grid-three label:nth-of-type(3)": "METODO",
      "#createPaymentForm > label": "DESCRICAO (O QUE ESTA SENDO COBRADO)",
      ".execute-btn": "EXECUTAR PAGAMENTO",
      ".panel-table h2": "Transacoes em Tempo Real",
      ".panel-table .stream": "TRANSMITINDO...",
      "#listPayments": "Atualizar Pagamentos",
      ".panel-customer h2": "Cadastro Rapido de Cliente",
      "#createCustomerForm label:nth-of-type(1)": "NOME",
      "#createCustomerForm label:nth-of-type(2)": "DOCUMENTO",
      "#createCustomerForm label:nth-of-type(3)": "E-MAIL",
      "#createCustomerForm button": "Criar Cliente",
      ".terminal-head p": "HUBPAY-CONSOLE@LOCAL: ~ /LOG-DE-ATIVIDADE",
      "#paymentMethod option[value='1']": "Cartao de Credito",
      "#paymentMethod option[value='2']": "Pix",
      "#paymentMethod option[value='3']": "Boleto"
    },
    staticAttr: {
      "#langToggle": { "aria-label": "Alternar idioma" },
      "#apiBaseUrl": { placeholder: "http://localhost:5201" },
      "#merchantId": { placeholder: "mid_live_xxxxxxxx" },
      "#apiKey": { placeholder: "sk_test_..." },
      "#merchantDocument": { placeholder: "CPF/CNPJ" },
      "#revokeApiKeyInput": { placeholder: "chave para revogar" },
      "#webhookUrl": { placeholder: "https://..." },
      "#paymentCustomerId": { placeholder: "cus_98234..." },
      "#idempotencyKey": { placeholder: "uuid-v4" },
      "#paymentAmount": { placeholder: "ex.: 49.90" },
      "#paymentDescription": { placeholder: "ex.: camisa + frete" }
    },
    runtime: {
      processing: "Processando...",
      saveSession: "Salvar Sessao",
      clearSession: "Limpar",
      connectionSavedLog: "Conexao salva.",
      connectionSavedToast: "Sessao salva",
      connectionClearedLog: "Conexao limpa.",
      connectionClearedToast: "Sessao limpa",
      errorOperationToast: "Erro na operacao",
      merchantRequired: "ID do merchant e obrigatorio na conexao.",
      merchantCreatedLog: "Merchant criado: {id}",
      merchantCreatedToast: "Merchant criado",
      merchantsLoadedLog: "Merchants carregados: {count}.",
      apiKeyGeneratedLog: "API key gerada e salva na sessao.",
      apiKeyGeneratedToast: "API key gerada",
      apiKeyRevokedLog: "API key revogada.",
      apiKeyRevokedToast: "API key revogada",
      customerCreatedLog: "Cliente criado: {id}",
      customerCreatedToast: "Cliente criado",
      paymentCreatedLog: "Pagamento criado: {id}",
      paymentCreatedToast: "Pagamento criado",
      paymentsLoadedLog: "Pagamentos carregados: {count}.",
      paymentsListErrorToast: "Erro ao listar pagamentos",
      authRequiredTitle: "Autenticacao necessaria",
      authHint: "Nao autorizado. Verifique Merchant ID + API Key e clique em Salvar Sessao.",
      paymentEventsLoadedLog: "Eventos carregados para o pagamento {id}: {count}.",
      timelineUpdatedToast: "Linha do tempo atualizada",
      paymentActionLog: "Pagamento {id}: acao '{action}' executada.",
      statusUpdatedToast: "Status atualizado",
      webhookCreatedLog: "Webhook criado: {id}",
      webhookCreatedToast: "Webhook criado",
      webhooksLoadedLog: "Webhooks carregados: {count}.",
      webhookDisabledLog: "Webhook desativado: {id}",
      webhookDisabledToast: "Webhook desativado",
      paymentsTitleId: "ID",
      paymentsTitleStatus: "Status",
      paymentsTitleAmount: "Valor",
      paymentsTitleMethod: "Metodo",
      paymentsTitleDescription: "Descricao",
      paymentsTitleActions: "Acoes",
      actionAuthorize: "Autorizar",
      actionMarkPaid: "Pago",
      actionRefuse: "Recusar",
      actionCancel: "Cancelar",
      actionEvents: "Eventos",
      noPayments: "Nenhum pagamento encontrado.",
      webhooksTitleId: "ID",
      webhooksTitleUrl: "URL",
      webhooksTitleStatus: "Status",
      webhooksTitleAction: "Acao",
      actionDisable: "Desativar",
      noWebhooks: "Nenhum webhook encontrado.",
      loadingCreating: "Criando...",
      loadingRefreshing: "Atualizando...",
      loadingGenerating: "Gerando...",
      loadingRevoking: "Revogando...",
      loadingExecuting: "Executando...",
      loadingDisabling: "Desativando...",
      bootLog: "HubPay Console iniciado.",
      bootToast: "Console pronto",
      statusMap: {
        pending: "PENDENTE",
        authorized: "AUTORIZADO",
        paid: "PAGO",
        refused: "RECUSADO",
        cancelled: "CANCELADO",
        active: "ATIVO",
        inactive: "DESATIVADO"
      },
      paymentMethodMap: {
        "1": "Cartao de Credito",
        "2": "Pix",
        "3": "Boleto",
        creditcard: "Cartao de Credito",
        pix: "Pix",
        boleto: "Boleto"
      }
    }
  },
  en: {
    htmlLang: "en",
    nextLabel: "PT-BR",
    staticText: {
      ".brand-wrap h1": "HUBPAY CONSOLE",
      ".brand-wrap p": "CORE ENGINE v2.1 // EDITORIAL EDITION",
      "#connectionStatus": "CONNECTED",
      ".left-stack .panel:nth-of-type(1) h2": "Connection Setup",
      ".left-stack .panel:nth-of-type(1) label:nth-of-type(1)": "API BASE URL",
      ".left-stack .panel:nth-of-type(1) label:nth-of-type(2)": "MERCHANT ID",
      ".left-stack .panel:nth-of-type(1) label:nth-of-type(3)": "API SECRET KEY",
      "#saveConnection": "Save Session",
      "#clearConnection": "Clear",
      ".left-stack .panel:nth-of-type(2) h2": "Merchant Registration",
      "#createMerchantForm label:nth-of-type(1)": "BUSINESS NAME",
      "#createMerchantForm .grid-two label:nth-of-type(1)": "DOCUMENT",
      "#createMerchantForm .grid-two label:nth-of-type(2)": "E-MAIL",
      "#createMerchantForm .row-btn:nth-of-type(1) button:nth-of-type(1)": "Create Merchant",
      "#listMerchants": "Refresh",
      "#generateApiKey": "Generate Key",
      "button[form='revokeApiKeyForm']": "Revoke Key",
      ".left-stack .panel:nth-of-type(3) h2": "Timeline",
      "#paymentEventsOutput": "Select a payment and click \"Events\" to see the timeline.",
      ".left-stack .panel:nth-of-type(4) h2": "Webhooks",
      "#listWebhooks": "Refresh Webhooks",
      ".payment-hero h2": "New Payment Transaction",
      "#createPaymentForm .grid-two label:nth-of-type(1)": "CUSTOMER ID",
      "#createPaymentForm .grid-two label:nth-of-type(2)": "IDEMPOTENCY KEY",
      "#createPaymentForm .grid-three label:nth-of-type(1)": "TOTAL AMOUNT (MONEY)",
      "#createPaymentForm .grid-three label:nth-of-type(2)": "CURRENCY",
      "#createPaymentForm .grid-three label:nth-of-type(3)": "METHOD",
      "#createPaymentForm > label": "DESCRIPTION (WHAT IS BEING CHARGED)",
      ".execute-btn": "RUN PAYMENT",
      ".panel-table h2": "Real-Time Transactions",
      ".panel-table .stream": "STREAMING...",
      "#listPayments": "Refresh Payments",
      ".panel-customer h2": "Quick Customer Registration",
      "#createCustomerForm label:nth-of-type(1)": "NAME",
      "#createCustomerForm label:nth-of-type(2)": "DOCUMENT",
      "#createCustomerForm label:nth-of-type(3)": "E-MAIL",
      "#createCustomerForm button": "Create Customer",
      ".terminal-head p": "HUBPAY-CONSOLE@LOCAL: ~ /ACTIVITY-LOG",
      "#paymentMethod option[value='1']": "Credit Card",
      "#paymentMethod option[value='2']": "Pix",
      "#paymentMethod option[value='3']": "Bank Slip"
    },
    staticAttr: {
      "#langToggle": { "aria-label": "Switch language" },
      "#apiBaseUrl": { placeholder: "http://localhost:5201" },
      "#merchantId": { placeholder: "mid_live_xxxxxxxx" },
      "#apiKey": { placeholder: "sk_test_..." },
      "#merchantDocument": { placeholder: "Tax ID" },
      "#revokeApiKeyInput": { placeholder: "key to revoke" },
      "#webhookUrl": { placeholder: "https://..." },
      "#paymentCustomerId": { placeholder: "cus_98234..." },
      "#idempotencyKey": { placeholder: "uuid-v4" },
      "#paymentAmount": { placeholder: "e.g.: 49.90" },
      "#paymentDescription": { placeholder: "e.g.: shirt + shipping" }
    },
    runtime: {
      processing: "Processing...",
      saveSession: "Save Session",
      clearSession: "Clear",
      connectionSavedLog: "Connection saved.",
      connectionSavedToast: "Session saved",
      connectionClearedLog: "Connection cleared.",
      connectionClearedToast: "Session cleared",
      errorOperationToast: "Operation failed",
      merchantRequired: "Merchant ID is required in connection settings.",
      merchantCreatedLog: "Merchant created: {id}",
      merchantCreatedToast: "Merchant created",
      merchantsLoadedLog: "Merchants loaded: {count}.",
      apiKeyGeneratedLog: "API key generated and saved in session.",
      apiKeyGeneratedToast: "API key generated",
      apiKeyRevokedLog: "API key revoked.",
      apiKeyRevokedToast: "API key revoked",
      customerCreatedLog: "Customer created: {id}",
      customerCreatedToast: "Customer created",
      paymentCreatedLog: "Payment created: {id}",
      paymentCreatedToast: "Payment created",
      paymentsLoadedLog: "Payments loaded: {count}.",
      paymentsListErrorToast: "Failed to load payments",
      authRequiredTitle: "Authentication required",
      authHint: "Unauthorized. Check Merchant ID + API Key and click Save Session.",
      paymentEventsLoadedLog: "Events loaded for payment {id}: {count}.",
      timelineUpdatedToast: "Timeline updated",
      paymentActionLog: "Payment {id}: action '{action}' executed.",
      statusUpdatedToast: "Status updated",
      webhookCreatedLog: "Webhook created: {id}",
      webhookCreatedToast: "Webhook created",
      webhooksLoadedLog: "Webhooks loaded: {count}.",
      webhookDisabledLog: "Webhook disabled: {id}",
      webhookDisabledToast: "Webhook disabled",
      paymentsTitleId: "ID",
      paymentsTitleStatus: "Status",
      paymentsTitleAmount: "Amount",
      paymentsTitleMethod: "Method",
      paymentsTitleDescription: "Description",
      paymentsTitleActions: "Actions",
      actionAuthorize: "Authorize",
      actionMarkPaid: "Paid",
      actionRefuse: "Refuse",
      actionCancel: "Cancel",
      actionEvents: "Events",
      noPayments: "No payments found.",
      webhooksTitleId: "ID",
      webhooksTitleUrl: "URL",
      webhooksTitleStatus: "Status",
      webhooksTitleAction: "Action",
      actionDisable: "Disable",
      noWebhooks: "No webhooks found.",
      loadingCreating: "Creating...",
      loadingRefreshing: "Refreshing...",
      loadingGenerating: "Generating...",
      loadingRevoking: "Revoking...",
      loadingExecuting: "Running...",
      loadingDisabling: "Disabling...",
      bootLog: "HubPay Console started.",
      bootToast: "Console ready",
      statusMap: {
        pending: "PENDING",
        authorized: "AUTHORIZED",
        paid: "PAID",
        refused: "REFUSED",
        cancelled: "CANCELLED",
        active: "ACTIVE",
        inactive: "INACTIVE"
      },
      paymentMethodMap: {
        "1": "Credit Card",
        "2": "Pix",
        "3": "Bank Slip",
        creditcard: "Credit Card",
        pix: "Pix",
        boleto: "Bank Slip"
      }
    }
  }
};

const state = {
  baseUrl: localStorage.getItem("hubpay.baseUrl") || window.location.origin,
  merchantId: localStorage.getItem("hubpay.merchantId") || "",
  apiKey: localStorage.getItem("hubpay.apiKey") || "",
  lang: localStorage.getItem("hubpay.console.lang") || "pt"
};

const ui = {
  apiBaseUrl: $("apiBaseUrl"),
  merchantId: $("merchantId"),
  apiKey: $("apiKey"),
  activityOutput: $("activityOutput"),
  langToggle: $("langToggle"),
  langLabel: $("langLabel")
};

function currentPack() {
  return i18n[state.lang] || i18n.pt;
}

function t(key, values = {}) {
  const template = currentPack().runtime[key] ?? key;
  return Object.entries(values).reduce((acc, [k, v]) => acc.replaceAll(`{${k}}`, String(v)), template);
}

function setText(selector, text) {
  const el = document.querySelector(selector);
  if (!el) return;

  if (el.tagName === "LABEL") {
    const directControls = Array.from(el.children).filter((child) =>
      ["INPUT", "SELECT", "TEXTAREA"].includes(child.tagName)
    );

    if (directControls.length > 0) {
      directControls.forEach((control) => control.remove());
      el.textContent = text;
      directControls.forEach((control) => el.appendChild(control));
      return;
    }
  }

  el.textContent = text;
}

function setAttr(selector, attrs) {
  const el = document.querySelector(selector);
  if (!el) return;
  Object.entries(attrs).forEach(([name, value]) => el.setAttribute(name, value));
}

function applyLanguage(lang) {
  state.lang = lang === "en" ? "en" : "pt";
  localStorage.setItem("hubpay.console.lang", state.lang);

  const pack = currentPack();

  Object.entries(pack.staticText).forEach(([selector, text]) => setText(selector, text));
  Object.entries(pack.staticAttr).forEach(([selector, attrs]) => setAttr(selector, attrs));

  document.documentElement.lang = pack.htmlLang;
  if (ui.langLabel) ui.langLabel.textContent = pack.nextLabel;

  refreshDynamicLabels();
}

function displayStatus(status) {
  const raw = String(status ?? "");
  const key = raw.toLowerCase();
  return currentPack().runtime.statusMap[key] || raw;
}

function displayPaymentMethod(method) {
  const raw = String(method ?? "");
  const key = raw.toLowerCase();
  return currentPack().runtime.paymentMethodMap[key] || raw;
}

function refreshDynamicLabels() {
  const runtime = currentPack().runtime;

  document.querySelectorAll("#paymentsOutput button[data-action='authorize']").forEach((el) => {
    el.textContent = runtime.actionAuthorize;
  });
  document.querySelectorAll("#paymentsOutput button[data-action='markPaid']").forEach((el) => {
    el.textContent = runtime.actionMarkPaid;
  });
  document.querySelectorAll("#paymentsOutput button[data-action='refuse']").forEach((el) => {
    el.textContent = runtime.actionRefuse;
  });
  document.querySelectorAll("#paymentsOutput button[data-action='cancel']").forEach((el) => {
    el.textContent = runtime.actionCancel;
  });
  document.querySelectorAll("#paymentsOutput button[data-action='events']").forEach((el) => {
    el.textContent = runtime.actionEvents;
  });

  const paymentHeader = document.querySelectorAll("#paymentsOutput th");
  if (paymentHeader.length === 6) {
    paymentHeader[0].textContent = runtime.paymentsTitleId;
    paymentHeader[1].textContent = runtime.paymentsTitleStatus;
    paymentHeader[2].textContent = runtime.paymentsTitleAmount;
    paymentHeader[3].textContent = runtime.paymentsTitleMethod;
    paymentHeader[4].textContent = runtime.paymentsTitleDescription;
    paymentHeader[5].textContent = runtime.paymentsTitleActions;
  }

  const webhooksHeader = document.querySelectorAll("#webhooksOutput th");
  if (webhooksHeader.length === 4) {
    webhooksHeader[0].textContent = runtime.webhooksTitleId;
    webhooksHeader[1].textContent = runtime.webhooksTitleUrl;
    webhooksHeader[2].textContent = runtime.webhooksTitleStatus;
    webhooksHeader[3].textContent = runtime.webhooksTitleAction;
  }

  document.querySelectorAll("#webhooksOutput button[data-action='disable-webhook']").forEach((el) => {
    el.textContent = runtime.actionDisable;
  });
}

function bootstrapConnectionFields() {
  ui.apiBaseUrl.value = state.baseUrl;
  ui.merchantId.value = state.merchantId;
  ui.apiKey.value = state.apiKey;
}

function saveConnection() {
  state.baseUrl = ui.apiBaseUrl.value.trim() || window.location.origin;
  state.merchantId = ui.merchantId.value.trim();
  state.apiKey = ui.apiKey.value.trim();
  localStorage.setItem("hubpay.baseUrl", state.baseUrl);
  localStorage.setItem("hubpay.merchantId", state.merchantId);
  localStorage.setItem("hubpay.apiKey", state.apiKey);
  log(t("connectionSavedLog"));
  toast(t("connectionSavedToast"), "success");
}

function clearConnection() {
  localStorage.removeItem("hubpay.baseUrl");
  localStorage.removeItem("hubpay.merchantId");
  localStorage.removeItem("hubpay.apiKey");
  state.baseUrl = window.location.origin;
  state.merchantId = "";
  state.apiKey = "";
  bootstrapConnectionFields();
  log(t("connectionClearedLog"));
  toast(t("connectionClearedToast"), "info");
}

function getHeaders(extra = {}) {
  const headers = { "Content-Type": "application/json", ...extra };
  if (state.apiKey) headers.Authorization = `Bearer ${state.apiKey}`;
  return headers;
}

async function api(path, options = {}) {
  saveConnection();

  const requestOptions = {
    ...options,
    headers: {
      ...getHeaders(),
      ...(options.headers || {})
    }
  };

  const response = await fetch(`${state.baseUrl}${path}`, requestOptions);
  const contentType = response.headers.get("content-type") || "";
  const body = contentType.includes("application/json")
    ? await response.json().catch(() => null)
    : await response.text().catch(() => "");

  if (!response.ok) {
    const detail = typeof body === "string" ? body : (body?.detail || JSON.stringify(body));
    throw new Error(`${response.status} ${response.statusText}: ${detail}`);
  }

  return body;
}

function log(message) {
  const locale = state.lang === "en" ? "en-US" : "pt-BR";
  const time = new Date().toLocaleTimeString(locale);
  ui.activityOutput.textContent = `[${time}] ${message}\n` + ui.activityOutput.textContent;
}

function toast(message, type = "info") {
  const node = document.createElement("div");
  node.textContent = message;
  Object.assign(node.style, {
    position: "fixed",
    top: "18px",
    right: "18px",
    zIndex: "9999",
    background: type === "success" ? "#1f7a46" : type === "error" ? "#b42318" : "#1a2a44",
    color: "#fff",
    padding: "10px 12px",
    borderRadius: "9px",
    fontSize: "12px",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: ".06em",
    boxShadow: "0 10px 24px rgba(0,0,0,.2)"
  });

  document.body.appendChild(node);
  setTimeout(() => node.remove(), 1800);
}

function setLoading(button, isLoading, loadingText = t("processing")) {
  if (!button) return;
  if (!button.dataset.originalText) button.dataset.originalText = button.textContent;
  button.disabled = isLoading;
  button.textContent = isLoading ? loadingText : button.dataset.originalText;
}

function renderJson(targetId, data) {
  $(targetId).textContent = JSON.stringify(data, null, 2);
}

function requireMerchantId() {
  if (!state.merchantId) throw new Error(t("merchantRequired"));
}

function escapeHtml(text) {
  return String(text ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderCardError(targetId, title, detail) {
  const target = $(targetId);
  if (!target) return;
  target.innerHTML = `
    <div style="padding:12px;border:1px solid #f6c7c1;background:#fff3f2;border-radius:10px;color:#912018;">
      <strong style="display:block;margin-bottom:6px;text-transform:uppercase;letter-spacing:.05em;font-size:.74rem;">${escapeHtml(title)}</strong>
      <span style="font-size:.86rem;">${escapeHtml(detail)}</span>
    </div>
  `;
}

function statusClass(status) {
  const key = String(status || "").toLowerCase();
  if (key === "paid" || key === "active") return "#dff7e8;#1f7a46;#b9e6ca";
  if (key === "authorized") return "#fff6d9;#9a6a00;#f6dea4";
  if (key === "refused") return "#fee5e2;#b42318;#f7c9c2";
  if (key === "cancelled" || key === "inactive") return "#eceff3;#475467;#d2d8e0";
  return "#edf2ff;#2448aa;#cfdaf9";
}

function statusBadge(status) {
  const [bg, fg, bd] = statusClass(status).split(";");
  return `<span class="badge" style="background:${bg};color:${fg};border-color:${bd}">${escapeHtml(displayStatus(status))}</span>`;
}

async function runAction(button, fn, loadingText) {
  try {
    setLoading(button, true, loadingText);
    await fn();
  } catch (err) {
    log(err.message);
    toast(t("errorOperationToast"), "error");
  } finally {
    setLoading(button, false);
  }
}

async function createMerchant(e) {
  e.preventDefault();
  const button = e.submitter || e.target.querySelector("button[type='submit']");
  await runAction(button, async () => {
    const merchant = await api("/merchants/", {
      method: "POST",
      body: JSON.stringify({
        name: $("merchantName").value.trim(),
        document: $("merchantDocument").value.trim(),
        email: $("merchantEmail").value.trim()
      })
    });

    state.merchantId = merchant.id;
    ui.merchantId.value = merchant.id;
    saveConnection();
    renderJson("merchantsOutput", merchant);
    log(t("merchantCreatedLog", { id: merchant.id }));
    toast(t("merchantCreatedToast"), "success");
  }, t("loadingCreating"));
}

async function listMerchants() {
  const button = $("listMerchants");
  await runAction(button, async () => {
    const merchants = await api("/merchants/");
    renderJson("merchantsOutput", merchants);
    log(t("merchantsLoadedLog", { count: merchants.length }));
  }, t("loadingRefreshing"));
}

async function generateApiKey() {
  const button = $("generateApiKey");
  await runAction(button, async () => {
    requireMerchantId();
    const response = await api(`/merchants/${state.merchantId}/api-keys`, { method: "POST" });
    if (response?.key) {
      state.apiKey = response.key;
      ui.apiKey.value = response.key;
      saveConnection();
    }
    renderJson("merchantsOutput", response);
    log(t("apiKeyGeneratedLog"));
    toast(t("apiKeyGeneratedToast"), "success");
  }, t("loadingGenerating"));
}

async function revokeApiKey(e) {
  e.preventDefault();
  const button = e.submitter || e.target.closest("section")?.querySelector(".btn-danger");
  await runAction(button, async () => {
    requireMerchantId();
    await api(`/merchants/${state.merchantId}/api-keys/revoke`, {
      method: "POST",
      body: JSON.stringify({ key: $("revokeApiKeyInput").value.trim() })
    });
    log(t("apiKeyRevokedLog"));
    toast(t("apiKeyRevokedToast"), "success");
  }, t("loadingRevoking"));
}

async function createCustomer(e) {
  e.preventDefault();
  const button = e.submitter || e.target.querySelector("button[type='submit']");
  await runAction(button, async () => {
    const customer = await api("/customers/", {
      method: "POST",
      body: JSON.stringify({
        name: $("customerName").value.trim(),
        document: $("customerDocument").value.trim(),
        email: $("customerEmail").value.trim()
      })
    });
    renderJson("customersOutput", customer);
    $("paymentCustomerId").value = customer.id;
    log(t("customerCreatedLog", { id: customer.id }));
    toast(t("customerCreatedToast"), "success");
  }, t("loadingCreating"));
}

async function createPayment(e) {
  e.preventDefault();
  const button = e.submitter || e.target.querySelector("button[type='submit']");
  await runAction(button, async () => {
    const idempotencyKey = $("idempotencyKey").value.trim();
    const headers = {};
    if (idempotencyKey) headers["Idempotency-Key"] = idempotencyKey;

    const payment = await api("/payments/", {
      method: "POST",
      headers,
      body: JSON.stringify({
        customerId: $("paymentCustomerId").value.trim(),
        amount: Number($("paymentAmount").value),
        currency: $("paymentCurrency").value.trim().toUpperCase(),
        paymentMethod: Number($("paymentMethod").value),
        description: $("paymentDescription").value.trim()
      })
    });

    log(t("paymentCreatedLog", { id: payment.id }));
    toast(t("paymentCreatedToast"), "success");
    await listPayments();
  }, t("loadingExecuting"));
}

async function listPayments() {
  const button = $("listPayments");
  setLoading(button, true, t("loadingRefreshing"));
  try {
    const payments = await api("/payments/");
    const rows = payments.map((p) => `
      <tr>
        <td><code>${escapeHtml(p.id)}</code></td>
        <td>${statusBadge(p.status)}</td>
        <td>${escapeHtml(p.amount)} ${escapeHtml(p.currency)}</td>
        <td>${escapeHtml(displayPaymentMethod(p.paymentMethod))}</td>
        <td>${escapeHtml(p.description)}</td>
        <td>
          <div class="actions">
            <button class="btn btn-light" data-action="authorize" data-id="${p.id}">${escapeHtml(t("actionAuthorize"))}</button>
            <button class="btn btn-light" data-action="markPaid" data-id="${p.id}">${escapeHtml(t("actionMarkPaid"))}</button>
            <button class="btn btn-light" data-action="refuse" data-id="${p.id}">${escapeHtml(t("actionRefuse"))}</button>
            <button class="btn btn-light" data-action="cancel" data-id="${p.id}">${escapeHtml(t("actionCancel"))}</button>
            <button class="btn btn-primary" data-action="events" data-id="${p.id}">${escapeHtml(t("actionEvents"))}</button>
          </div>
        </td>
      </tr>
    `).join("");

    $("paymentsOutput").innerHTML = `
      <table>
        <thead>
          <tr>
            <th>${escapeHtml(t("paymentsTitleId"))}</th><th>${escapeHtml(t("paymentsTitleStatus"))}</th><th>${escapeHtml(t("paymentsTitleAmount"))}</th><th>${escapeHtml(t("paymentsTitleMethod"))}</th><th>${escapeHtml(t("paymentsTitleDescription"))}</th><th>${escapeHtml(t("paymentsTitleActions"))}</th>
          </tr>
        </thead>
        <tbody>${rows || `<tr><td colspan="6">${escapeHtml(t("noPayments"))}</td></tr>`}</tbody>
      </table>
    `;

    log(t("paymentsLoadedLog", { count: payments.length }));
  } catch (err) {
    if (String(err.message).startsWith("401")) {
      renderCardError("paymentsOutput", t("authRequiredTitle"), t("authHint"));
    }
    log(err.message);
    toast(t("paymentsListErrorToast"), "error");
  } finally {
    setLoading(button, false);
  }
}

async function paymentAction(action, id, button) {
  await runAction(button, async () => {
    if (action === "events") {
      const events = await api(`/payments/${id}/events`);
      renderJson("paymentEventsOutput", events);
      log(t("paymentEventsLoadedLog", { id, count: events.length }));
      toast(t("timelineUpdatedToast"), "info");
      return;
    }

    const map = { authorize: "authorize", markPaid: "capture", refuse: "refuse", cancel: "cancel" };
    await api(`/payments/${id}/${map[action]}`, { method: "POST" });
    log(t("paymentActionLog", { id, action }));
    toast(t("statusUpdatedToast"), "success");
    await listPayments();
  }, t("processing"));
}

async function createWebhook(e) {
  e.preventDefault();
  const button = e.submitter || e.target.querySelector("button[type='submit']");
  await runAction(button, async () => {
    const webhook = await api("/webhooks/", {
      method: "POST",
      body: JSON.stringify({ url: $("webhookUrl").value.trim() })
    });
    log(t("webhookCreatedLog", { id: webhook.id }));
    toast(t("webhookCreatedToast"), "success");
    await listWebhooks();
  }, t("loadingCreating"));
}

async function listWebhooks() {
  const button = $("listWebhooks");
  await runAction(button, async () => {
    const webhooks = await api("/webhooks/");
    const rows = webhooks.map((w) => `
      <tr>
        <td><code>${escapeHtml(w.id)}</code></td>
        <td>${escapeHtml(w.url)}</td>
        <td>${statusBadge(w.isActive ? "active" : "inactive")}</td>
        <td><button class="btn btn-danger" data-action="disable-webhook" data-id="${w.id}">${escapeHtml(t("actionDisable"))}</button></td>
      </tr>
    `).join("");

    $("webhooksOutput").innerHTML = `
      <table>
        <thead><tr><th>${escapeHtml(t("webhooksTitleId"))}</th><th>${escapeHtml(t("webhooksTitleUrl"))}</th><th>${escapeHtml(t("webhooksTitleStatus"))}</th><th>${escapeHtml(t("webhooksTitleAction"))}</th></tr></thead>
        <tbody>${rows || `<tr><td colspan="4">${escapeHtml(t("noWebhooks"))}</td></tr>`}</tbody>
      </table>
    `;

    log(t("webhooksLoadedLog", { count: webhooks.length }));
  }, t("loadingRefreshing"));
}

async function disableWebhook(id, button) {
  await runAction(button, async () => {
    await api(`/webhooks/${id}/disable`, { method: "POST" });
    log(t("webhookDisabledLog", { id }));
    toast(t("webhookDisabledToast"), "success");
    await listWebhooks();
  }, t("loadingDisabling"));
}

function bindEvents() {
  $("saveConnection").addEventListener("click", saveConnection);
  $("clearConnection").addEventListener("click", clearConnection);

  $("createMerchantForm").addEventListener("submit", createMerchant);
  $("listMerchants").addEventListener("click", listMerchants);
  $("generateApiKey").addEventListener("click", generateApiKey);
  $("revokeApiKeyForm").addEventListener("submit", revokeApiKey);

  $("createCustomerForm").addEventListener("submit", createCustomer);

  $("createPaymentForm").addEventListener("submit", createPayment);
  $("listPayments").addEventListener("click", listPayments);
  $("paymentsOutput").addEventListener("click", (e) => {
    const target = e.target.closest("button[data-action]");
    if (!target) return;
    paymentAction(target.dataset.action, target.dataset.id, target);
  });

  $("createWebhookForm").addEventListener("submit", createWebhook);
  $("listWebhooks").addEventListener("click", listWebhooks);
  $("webhooksOutput").addEventListener("click", (e) => {
    const target = e.target.closest("button[data-action='disable-webhook']");
    if (!target) return;
    disableWebhook(target.dataset.id, target);
  });

  if (ui.langToggle) {
    ui.langToggle.addEventListener("click", () => {
      applyLanguage(state.lang === "pt" ? "en" : "pt");
    });
  }
}

applyLanguage(state.lang);
bootstrapConnectionFields();
bindEvents();
log(t("bootLog"));
toast(t("bootToast"), "info");
