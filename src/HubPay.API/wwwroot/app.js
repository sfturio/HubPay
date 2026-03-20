const $ = (id) => document.getElementById(id);

const i18n = {
  pt: {
    htmlLang: "pt-BR",
    locale: "pt-BR",
    nextLabel: "EN",
    text: {
      ".brand-sub": "Sistema simples para organizar clientes, cobrancas e pagamentos",
      "a[href='https://sfturio.github.io/HubPay/']": "Documentacao",
      ".side-panel .card:nth-of-type(1) h2": "Conta da loja",
      ".side-panel .card:nth-of-type(1) .muted": "Esses dados conectam sua conta a API.",
      ".side-panel .card:nth-of-type(1) label:nth-of-type(1)": "URL da API",
      ".side-panel .card:nth-of-type(1) label:nth-of-type(2)": "ID da conta",
      ".side-panel .card:nth-of-type(1) label:nth-of-type(3)": "Chave da API",
      "#saveConnection": "Salvar conexao",
      "#clearConnection": "Limpar",
      ".side-panel .card:nth-of-type(2) h2": "Criar conta da loja",
      ".side-panel .card:nth-of-type(2) .muted": "Passo inicial para liberar clientes e cobrancas.",
      "#createMerchantForm label:nth-of-type(1)": "Nome da loja",
      "#createMerchantForm label:nth-of-type(2)": "Documento",
      "#createMerchantForm label:nth-of-type(3)": "E-mail",
      "#createMerchantForm button[type='submit']": "Criar conta",
      "#generateApiKey": "Gerar chave",
      "#revokeApiKeyForm button": "Revogar",
      ".side-panel .card:nth-of-type(3) h2": "Atividade",
      "#dashboard h1": "Visao rapida do mes",
      "#newChargeHero": "Nova cobranca",
      "#newCustomerHero": "Novo cliente",
      ".stats-grid article:nth-of-type(1) .stat-label": "Resumo do mes",
      ".stats-grid article:nth-of-type(2) .stat-label": "Total recebido",
      ".stats-grid article:nth-of-type(3) .stat-label": "Cobrancas pendentes",
      ".stats-grid article:nth-of-type(4) .stat-label": "Cobrancas atrasadas",
      ".stats-grid article:nth-of-type(2) .stat-note": "Somente cobrancas pagas no mes.",
      ".stats-grid article:nth-of-type(3) .stat-note": "Aguardando confirmacao.",
      ".stats-grid article:nth-of-type(4) .stat-note": "Pendentes ha mais de 7 dias.",
      ".customers-preview h3": "Clientes recentes",
      "#refreshDashboard": "Atualizar visao",
      "#customersSection .section-head h2": "Clientes",
      "#refreshCustomers": "Atualizar clientes",
      "#createCustomerForm label:nth-of-type(1)": "Nome",
      "#createCustomerForm label:nth-of-type(2)": "Documento",
      "#createCustomerForm label:nth-of-type(3)": "E-mail",
      "#createCustomerForm button": "Salvar cliente",
      "#chargesSection .section-head h2": "Cobrancas",
      "#listPayments": "Atualizar cobrancas",
      "#createPaymentForm label:nth-of-type(1)": "ID do cliente",
      "#createPaymentForm label:nth-of-type(2)": "Valor",
      "#createPaymentForm label:nth-of-type(3)": "Moeda",
      "#createPaymentForm label:nth-of-type(4)": "Forma de pagamento",
      "#createPaymentForm label:nth-of-type(5)": "Descricao da cobranca",
      "#createPaymentForm label:nth-of-type(6)": "Idempotency-Key (opcional)",
      "#createPaymentForm button": "Criar cobranca",
      "#historySection h2": "Pagamentos e historico",
      "#historySection .muted": "Veja os eventos da cobranca selecionada para acompanhar a evolucao do status.",
      "details.card summary": "Integracoes avancadas (opcional)",
      "details.card .muted": "Webhooks sao tecnicos e nao sao obrigatorios para usar o sistema no dia a dia.",
      "#createWebhookForm button": "Adicionar webhook",
      "#listWebhooks": "Atualizar webhooks"
    },
    placeholders: {
      "#merchantId": "gerado ao criar conta",
      "#merchantDocument": "CPF ou CNPJ",
      "#revokeApiKeyInput": "chave para revogar",
      "#paymentCustomerId": "cole o ID ou crie um cliente acima",
      "#paymentDescription": "Ex.: Servico de manutencao",
      "#idempotencyKey": "uuid-v4",
      "#webhookUrl": "https://seu-endpoint.com/webhook"
    },
    runtime: {
      processing: "Processando...",
      creating: "Criando...",
      saving: "Salvando...",
      refreshing: "Atualizando...",
      generating: "Gerando...",
      revoking: "Revogando...",
      disabling: "Desativando...",
      defaultErrorToast: "Nao foi possivel concluir a acao",
      saveConnectionLog: "Conexao salva.",
      saveConnectionToast: "Conexao salva",
      clearConnectionLog: "Conexao limpa.",
      clearConnectionToast: "Conexao limpa",
      monthCharges: "{count} cobrancas",
      monthAvgTicket: "Ticket medio: {value}",
      monthNoRevenue: "Sem recebimentos confirmados neste mes.",
      emptyRecentCustomers: "Cadastre seu primeiro cliente para comecar.",
      emptyCustomers: "Nenhum cliente cadastrado ainda.",
      emptyPayments: "Nenhuma cobranca encontrada.",
      emptyWebhooks: "Nenhum webhook cadastrado.",
      connectCustomers: "Conecte sua conta para ver os clientes.",
      connectPayments: "Conecte sua conta para ver as cobrancas.",
      emptyWebhooksPanel: "Sem webhooks configurados.",
      selectHistory: "Selecione uma cobranca e clique em \"Historico\".",
      table: { id: "ID", name: "Nome", email: "E-mail", document: "Documento", createdAt: "Criado em", status: "Status", amount: "Valor", method: "Forma", description: "Descricao", actions: "Acoes", url: "URL", chargeStatus: "Status da cobranca", action: "Acao" },
      actions: { authorize: "Autorizar", paid: "Marcar pago", refuse: "Recusar", cancel: "Cancelar", events: "Historico", disable: "Desativar" },
      status: { pending: "Pendente", authorized: "Em analise", paid: "Pago", refused: "Recusado", refunded: "Cancelado", active: "Ativo", inactive: "Inativo" },
      method: { "1": "Cartao de credito", "2": "Pix", "3": "Boleto", creditcard: "Cartao de credito", pix: "Pix", boleto: "Boleto" }
    }
  },
  en: {
    htmlLang: "en",
    locale: "en-US",
    nextLabel: "PT",
    text: {
      ".brand-sub": "Simple system to manage clients, charges, and payments",
      "a[href='https://sfturio.github.io/HubPay/']": "Documentation",
      ".side-panel .card:nth-of-type(1) h2": "Store account",
      ".side-panel .card:nth-of-type(1) .muted": "These details connect your account to the API.",
      ".side-panel .card:nth-of-type(1) label:nth-of-type(1)": "API URL",
      ".side-panel .card:nth-of-type(1) label:nth-of-type(2)": "Account ID",
      ".side-panel .card:nth-of-type(1) label:nth-of-type(3)": "API key",
      "#saveConnection": "Save connection",
      "#clearConnection": "Clear",
      ".side-panel .card:nth-of-type(2) h2": "Create store account",
      ".side-panel .card:nth-of-type(2) .muted": "First step to enable clients and charges.",
      "#createMerchantForm label:nth-of-type(1)": "Store name",
      "#createMerchantForm label:nth-of-type(2)": "Document",
      "#createMerchantForm label:nth-of-type(3)": "Email",
      "#createMerchantForm button[type='submit']": "Create account",
      "#generateApiKey": "Generate key",
      "#revokeApiKeyForm button": "Revoke",
      ".side-panel .card:nth-of-type(3) h2": "Activity",
      "#dashboard h1": "Quick month overview",
      "#newChargeHero": "New charge",
      "#newCustomerHero": "New client",
      ".stats-grid article:nth-of-type(1) .stat-label": "Month summary",
      ".stats-grid article:nth-of-type(2) .stat-label": "Total received",
      ".stats-grid article:nth-of-type(3) .stat-label": "Pending charges",
      ".stats-grid article:nth-of-type(4) .stat-label": "Overdue charges",
      ".stats-grid article:nth-of-type(2) .stat-note": "Only paid charges this month.",
      ".stats-grid article:nth-of-type(3) .stat-note": "Waiting for confirmation.",
      ".stats-grid article:nth-of-type(4) .stat-note": "Pending for more than 7 days.",
      ".customers-preview h3": "Recent clients",
      "#refreshDashboard": "Refresh view",
      "#customersSection .section-head h2": "Clients",
      "#refreshCustomers": "Refresh clients",
      "#createCustomerForm label:nth-of-type(1)": "Name",
      "#createCustomerForm label:nth-of-type(2)": "Document",
      "#createCustomerForm label:nth-of-type(3)": "Email",
      "#createCustomerForm button": "Save client",
      "#chargesSection .section-head h2": "Charges",
      "#listPayments": "Refresh charges",
      "#createPaymentForm label:nth-of-type(1)": "Client ID",
      "#createPaymentForm label:nth-of-type(2)": "Amount",
      "#createPaymentForm label:nth-of-type(3)": "Currency",
      "#createPaymentForm label:nth-of-type(4)": "Payment method",
      "#createPaymentForm label:nth-of-type(5)": "Charge description",
      "#createPaymentForm label:nth-of-type(6)": "Idempotency-Key (optional)",
      "#createPaymentForm button": "Create charge",
      "#historySection h2": "Payments and history",
      "#historySection .muted": "Check selected charge events to track status changes.",
      "details.card summary": "Advanced integrations (optional)",
      "details.card .muted": "Webhooks are technical and not required for daily use.",
      "#createWebhookForm button": "Add webhook",
      "#listWebhooks": "Refresh webhooks"
    },
    placeholders: {
      "#merchantId": "generated when account is created",
      "#merchantDocument": "Tax ID",
      "#revokeApiKeyInput": "key to revoke",
      "#paymentCustomerId": "paste client ID or create a client above",
      "#paymentDescription": "Example: Maintenance service",
      "#idempotencyKey": "uuid-v4",
      "#webhookUrl": "https://your-endpoint.com/webhook"
    },
    runtime: {
      processing: "Processing...",
      creating: "Creating...",
      saving: "Saving...",
      refreshing: "Refreshing...",
      generating: "Generating...",
      revoking: "Revoking...",
      disabling: "Disabling...",
      defaultErrorToast: "Could not complete the action",
      saveConnectionLog: "Connection saved.",
      saveConnectionToast: "Connection saved",
      clearConnectionLog: "Connection cleared.",
      clearConnectionToast: "Connection cleared",
      monthCharges: "{count} charges",
      monthAvgTicket: "Average ticket: {value}",
      monthNoRevenue: "No confirmed revenue this month.",
      emptyRecentCustomers: "Create your first client to get started.",
      emptyCustomers: "No clients registered yet.",
      emptyPayments: "No charges found.",
      emptyWebhooks: "No webhooks registered.",
      connectCustomers: "Connect your account to view clients.",
      connectPayments: "Connect your account to view charges.",
      emptyWebhooksPanel: "No webhooks configured.",
      selectHistory: "Select a charge and click \"History\".",
      table: { id: "ID", name: "Name", email: "Email", document: "Document", createdAt: "Created at", status: "Status", amount: "Amount", method: "Method", description: "Description", actions: "Actions", url: "URL", chargeStatus: "Charge status", action: "Action" },
      actions: { authorize: "Authorize", paid: "Mark paid", refuse: "Refuse", cancel: "Cancel", events: "History", disable: "Disable" },
      status: { pending: "Pending", authorized: "Authorized", paid: "Paid", refused: "Refused", refunded: "Cancelled", active: "Active", inactive: "Inactive" },
      method: { "1": "Credit card", "2": "Pix", "3": "Bank slip", creditcard: "Credit card", pix: "Pix", boleto: "Bank slip" }
    }
  }
};

const state = {
  baseUrl: localStorage.getItem("hubpay.baseUrl") || window.location.origin,
  merchantId: localStorage.getItem("hubpay.merchantId") || "",
  apiKey: localStorage.getItem("hubpay.apiKey") || "",
  lang: localStorage.getItem("hubpay.lang") || "pt",
  lastPayments: [],
  lastCustomers: []
};

const ui = {
  apiBaseUrl: $("apiBaseUrl"),
  merchantId: $("merchantId"),
  apiKey: $("apiKey"),
  activityOutput: $("activityOutput"),
  langToggle: $("langToggle")
};

const pack = () => i18n[state.lang] || i18n.pt;
const rt = () => pack().runtime;
const tr = (key, values = {}) => Object.entries(values).reduce((acc, [k, v]) => acc.replaceAll(`{${k}}`, String(v)), rt()[key] ?? key);
const trStatus = (status) => rt().status[String(status || "").toLowerCase()] || status;
const trMethod = (method) => rt().method[String(method || "").toLowerCase()] || method;
const trTable = (key) => rt().table[key] || key;
const trAction = (key) => rt().actions[key] || key;
const formatMoney = (value) => new Intl.NumberFormat(pack().locale, { style: "currency", currency: "BRL" }).format(value);

function setText(selector, text) {
  const el = document.querySelector(selector);
  if (!el) return;
  if (el.tagName === "LABEL") {
    const controls = Array.from(el.children).filter((child) => ["INPUT", "SELECT", "TEXTAREA"].includes(child.tagName));
    if (controls.length > 0) {
      controls.forEach((c) => c.remove());
      el.textContent = text;
      controls.forEach((c) => el.appendChild(c));
      return;
    }
  }
  el.textContent = text;
}

function applyLanguage(lang) {
  state.lang = lang === "en" ? "en" : "pt";
  localStorage.setItem("hubpay.lang", state.lang);
  document.documentElement.lang = pack().htmlLang;

  Object.entries(pack().text).forEach(([selector, text]) => setText(selector, text));
  Object.entries(pack().placeholders).forEach(([selector, placeholder]) => {
    const el = document.querySelector(selector);
    if (el) el.setAttribute("placeholder", placeholder);
  });
  if (ui.langToggle) ui.langToggle.textContent = pack().nextLabel;

  renderDashboard();
  renderCustomersTable(state.lastCustomers);
  renderPaymentsTable(state.lastPayments);
}

function bootstrapConnectionFields() {
  ui.apiBaseUrl.value = state.baseUrl;
  ui.merchantId.value = state.merchantId;
  ui.apiKey.value = state.apiKey;
}

function log(message) {
  const time = new Date().toLocaleTimeString(pack().locale);
  ui.activityOutput.textContent = `[${time}] ${message}\n` + ui.activityOutput.textContent;
}

function toast(message, type = "info") {
  const node = document.createElement("div");
  node.textContent = message;
  const colors = { info: "#1f4654", success: "#127766", error: "#b43e37" };
  Object.assign(node.style, { position: "fixed", top: "16px", right: "16px", zIndex: "9999", background: colors[type] || colors.info, color: "#fff", padding: "10px 12px", borderRadius: "10px", fontWeight: "700", fontSize: "12px", boxShadow: "0 10px 24px rgba(0,0,0,.22)" });
  document.body.appendChild(node);
  setTimeout(() => node.remove(), 2000);
}

function saveConnection() {
  state.baseUrl = ui.apiBaseUrl.value.trim() || window.location.origin;
  state.merchantId = ui.merchantId.value.trim();
  state.apiKey = ui.apiKey.value.trim();
  localStorage.setItem("hubpay.baseUrl", state.baseUrl);
  localStorage.setItem("hubpay.merchantId", state.merchantId);
  localStorage.setItem("hubpay.apiKey", state.apiKey);
  log(tr("saveConnectionLog"));
  toast(tr("saveConnectionToast"), "success");
}

function clearConnection() {
  localStorage.removeItem("hubpay.baseUrl");
  localStorage.removeItem("hubpay.merchantId");
  localStorage.removeItem("hubpay.apiKey");
  state.baseUrl = window.location.origin;
  state.merchantId = "";
  state.apiKey = "";
  bootstrapConnectionFields();
  log(tr("clearConnectionLog"));
  toast(tr("clearConnectionToast"), "info");
}

function getHeaders(extra = {}) {
  const headers = { "Content-Type": "application/json", ...extra };
  if (state.apiKey) headers["x-api-key"] = state.apiKey;
  return headers;
}

async function api(path, options = {}) {
  saveConnection();
  const response = await fetch(`${state.baseUrl}${path}`, { ...options, headers: { ...getHeaders(), ...(options.headers || {}) } });
  const contentType = response.headers.get("content-type") || "";
  const body = contentType.includes("application/json") ? await response.json().catch(() => null) : await response.text().catch(() => "");
  if (!response.ok) {
    const detail = typeof body === "string" ? body : (body?.detail || JSON.stringify(body));
    throw new Error(`${response.status} ${response.statusText}: ${detail}`);
  }
  return body;
}

function setLoading(button, isLoading, text = tr("processing")) {
  if (!button) return;
  if (!button.dataset.originalText) button.dataset.originalText = button.textContent;
  button.disabled = isLoading;
  button.textContent = isLoading ? text : button.dataset.originalText;
}

async function runAction(button, fn, loadingText) {
  try {
    setLoading(button, true, loadingText);
    await fn();
  } catch (err) {
    log(err.message);
    toast(tr("defaultErrorToast"), "error");
  } finally {
    setLoading(button, false);
  }
}

function escapeHtml(text) {
  return String(text ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function toDate(value) {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function isOpenCharge(status) {
  const key = String(status || "").toLowerCase();
  return key === "pending" || key === "authorized";
}

function statusBadge(status) {
  const key = String(status || "").toLowerCase();
  const label = trStatus(status);
  if (key === "paid" || key === "active") return `<span class="badge" style="background:#e8f7f2;color:#127766;border-color:#b6e1d7">${escapeHtml(label)}</span>`;
  if (key === "authorized") return `<span class="badge" style="background:#fff8e9;color:#9c6a1a;border-color:#f3deb2">${escapeHtml(label)}</span>`;
  if (key === "refused") return `<span class="badge" style="background:#fff0ef;color:#b43e37;border-color:#efcac7">${escapeHtml(label)}</span>`;
  if (key === "refunded" || key === "inactive") return `<span class="badge" style="background:#f2f5f7;color:#51636a;border-color:#d5dfe2">${escapeHtml(label)}</span>`;
  return `<span class="badge" style="background:#edf4ff;color:#375694;border-color:#cddcf3">${escapeHtml(label)}</span>`;
}

function renderDashboard() {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  const inMonth = state.lastPayments.filter((p) => {
    const date = toDate(p.createdAt);
    return date && date.getMonth() === month && date.getFullYear() === year;
  });
  const paidInMonth = inMonth.filter((p) => String(p.status || "").toLowerCase() === "paid");
  const totalReceived = paidInMonth.reduce((acc, p) => acc + Number(p.amount || 0), 0);
  const pending = state.lastPayments.filter((p) => isOpenCharge(p.status)).length;
  const overdue = state.lastPayments.filter((p) => {
    if (!isOpenCharge(p.status)) return false;
    const date = toDate(p.createdAt);
    if (!date) return false;
    return (now - date) / (1000 * 60 * 60 * 24) > 7;
  }).length;
  const avgTicket = paidInMonth.length > 0 ? totalReceived / paidInMonth.length : 0;

  $("monthSummary").textContent = tr("monthCharges", { count: inMonth.length });
  $("monthSummaryHint").textContent = paidInMonth.length > 0 ? tr("monthAvgTicket", { value: formatMoney(avgTicket) }) : tr("monthNoRevenue");
  $("totalReceived").textContent = formatMoney(totalReceived);
  $("pendingCharges").textContent = String(pending);
  $("overdueCharges").textContent = String(overdue);
  renderRecentCustomers();
}

function renderRecentCustomers() {
  const target = $("recentCustomers");
  const customers = state.lastCustomers.slice(0, 5);
  if (!customers.length) {
    target.className = "empty-state";
    target.textContent = tr("emptyRecentCustomers");
    return;
  }
  target.className = "table-wrap";
  const rows = customers.map((c) => `<tr><td>${escapeHtml(c.name)}</td><td>${escapeHtml(c.email)}</td><td>${escapeHtml(c.document)}</td><td>${toDate(c.createdAt)?.toLocaleDateString(pack().locale) || "-"}</td></tr>`).join("");
  target.innerHTML = `<table><thead><tr><th>${trTable("name")}</th><th>${trTable("email")}</th><th>${trTable("document")}</th><th>${trTable("createdAt")}</th></tr></thead><tbody>${rows}</tbody></table>`;
}

function renderCustomersTable(customers) {
  const target = $("customersOutput");
  if (!customers.length) {
    target.innerHTML = `<div class="empty-state">${escapeHtml(tr("emptyCustomers"))}</div>`;
    return;
  }
  const rows = customers.map((c) => `<tr><td><code>${escapeHtml(c.id)}</code></td><td>${escapeHtml(c.name)}</td><td>${escapeHtml(c.email)}</td><td>${escapeHtml(c.document)}</td><td>${toDate(c.createdAt)?.toLocaleString(pack().locale) || "-"}</td></tr>`).join("");
  target.innerHTML = `<table><thead><tr><th>${trTable("id")}</th><th>${trTable("name")}</th><th>${trTable("email")}</th><th>${trTable("document")}</th><th>${trTable("createdAt")}</th></tr></thead><tbody>${rows}</tbody></table>`;
}

function renderPaymentsTable(payments) {
  const target = $("paymentsOutput");
  if (!payments.length) {
    target.innerHTML = `<div class="empty-state">${escapeHtml(tr("emptyPayments"))}</div>`;
    return;
  }
  const rows = payments.map((p) => `<tr><td><code>${escapeHtml(p.id)}</code></td><td>${statusBadge(p.status)}</td><td>${formatMoney(Number(p.amount || 0))}</td><td>${escapeHtml(trMethod(p.paymentMethod))}</td><td>${escapeHtml(p.description || "-")}</td><td><div class="actions"><button class="btn btn-ghost" data-action="authorize" data-id="${p.id}">${trAction("authorize")}</button><button class="btn btn-ghost" data-action="markPaid" data-id="${p.id}">${trAction("paid")}</button><button class="btn btn-ghost" data-action="refuse" data-id="${p.id}">${trAction("refuse")}</button><button class="btn btn-ghost" data-action="refund" data-id="${p.id}">${trAction("cancel")}</button><button class="btn btn-secondary" data-action="events" data-id="${p.id}">${trAction("events")}</button></div></td></tr>`).join("");
  target.innerHTML = `<table><thead><tr><th>${trTable("id")}</th><th>${trTable("chargeStatus")}</th><th>${trTable("amount")}</th><th>${trTable("method")}</th><th>${trTable("description")}</th><th>${trTable("actions")}</th></tr></thead><tbody>${rows}</tbody></table>`;
}

function renderWebhooksTable(webhooks) {
  const target = $("webhooksOutput");
  if (!webhooks.length) {
    target.innerHTML = `<div class="empty-state">${escapeHtml(tr("emptyWebhooks"))}</div>`;
    return;
  }
  const rows = webhooks.map((w) => `<tr><td><code>${escapeHtml(w.id)}</code></td><td>${escapeHtml(w.url)}</td><td>${statusBadge(w.isActive ? "active" : "inactive")}</td><td><button class="btn btn-danger" data-action="disable-webhook" data-id="${w.id}">${trAction("disable")}</button></td></tr>`).join("");
  target.innerHTML = `<table><thead><tr><th>${trTable("id")}</th><th>${trTable("url")}</th><th>${trTable("status")}</th><th>${trTable("action")}</th></tr></thead><tbody>${rows}</tbody></table>`;
}

async function createMerchant(event) {
  event.preventDefault();
  const button = event.submitter || event.target.querySelector("button[type='submit']");
  await runAction(button, async () => {
    const merchant = await api("/merchants/", { method: "POST", body: JSON.stringify({ name: $("merchantName").value.trim(), document: $("merchantDocument").value.trim(), email: $("merchantEmail").value.trim() }) });
    state.merchantId = merchant.id;
    ui.merchantId.value = merchant.id;
    saveConnection();
    $("merchantsOutput").textContent = JSON.stringify(merchant, null, 2);
  }, tr("creating"));
}

async function generateApiKey() {
  const button = $("generateApiKey");
  await runAction(button, async () => {
    if (!state.merchantId) throw new Error(state.lang === "en" ? "Fill account ID before generating key." : "Preencha o ID da conta antes de gerar chave.");
    const response = await api(`/merchants/${state.merchantId}/api-keys`, { method: "POST" });
    if (response?.key) {
      state.apiKey = response.key;
      ui.apiKey.value = response.key;
      saveConnection();
    }
    $("merchantsOutput").textContent = JSON.stringify(response, null, 2);
  }, tr("generating"));
}

async function revokeApiKey(event) {
  event.preventDefault();
  const button = event.submitter || event.target.querySelector("button[type='submit']");
  await runAction(button, async () => {
    if (!state.merchantId) throw new Error(state.lang === "en" ? "Provide account ID first." : "Informe o ID da conta.");
    await api(`/merchants/${state.merchantId}/api-keys/revoke`, { method: "POST", body: JSON.stringify({ key: $("revokeApiKeyInput").value.trim() }) });
  }, tr("revoking"));
}

async function createCustomer(event) {
  event.preventDefault();
  const button = event.submitter || event.target.querySelector("button[type='submit']");
  await runAction(button, async () => {
    const customer = await api("/customers/", { method: "POST", body: JSON.stringify({ name: $("customerName").value.trim(), document: $("customerDocument").value.trim(), email: $("customerEmail").value.trim() }) });
    $("paymentCustomerId").value = customer.id;
    await listCustomers();
  }, tr("saving"));
}

async function listCustomers() {
  const button = $("refreshCustomers");
  setLoading(button, true, tr("refreshing"));
  try {
    state.lastCustomers = await api("/customers?take=20");
    renderCustomersTable(state.lastCustomers);
    renderDashboard();
  } catch {
    $("customersOutput").innerHTML = `<div class="empty-state">${escapeHtml(tr("connectCustomers"))}</div>`;
  } finally {
    setLoading(button, false);
  }
}

async function createPayment(event) {
  event.preventDefault();
  const button = event.submitter || event.target.querySelector("button[type='submit']");
  await runAction(button, async () => {
    const idempotencyKey = $("idempotencyKey").value.trim();
    const headers = {};
    if (idempotencyKey) headers["Idempotency-Key"] = idempotencyKey;
    await api("/payments/", { method: "POST", headers, body: JSON.stringify({ customerId: $("paymentCustomerId").value.trim(), amount: Number($("paymentAmount").value), currency: $("paymentCurrency").value.trim().toUpperCase(), paymentMethod: Number($("paymentMethod").value), description: $("paymentDescription").value.trim() }) });
    await listPayments();
  }, tr("creating"));
}

async function listPayments() {
  const button = $("listPayments");
  setLoading(button, true, tr("refreshing"));
  try {
    state.lastPayments = await api("/payments/");
    renderPaymentsTable(state.lastPayments);
    renderDashboard();
  } catch {
    $("paymentsOutput").innerHTML = `<div class="empty-state">${escapeHtml(tr("connectPayments"))}</div>`;
  } finally {
    setLoading(button, false);
  }
}

async function paymentAction(action, id, button) {
  await runAction(button, async () => {
    if (action === "events") {
      $("paymentEventsOutput").textContent = JSON.stringify(await api(`/payments/${id}/events`), null, 2);
      return;
    }
    const routeMap = { authorize: "authorize", markPaid: "pay", refuse: "refuse", refund: "cancel" };
    await api(`/payments/${id}/${routeMap[action]}`, { method: "POST" });
    await listPayments();
  }, tr("processing"));
}

async function createWebhook(event) {
  event.preventDefault();
  const button = event.submitter || event.target.querySelector("button[type='submit']");
  await runAction(button, async () => {
    await api("/webhooks/", { method: "POST", body: JSON.stringify({ url: $("webhookUrl").value.trim() }) });
    await listWebhooks();
  }, tr("saving"));
}

async function listWebhooks() {
  const button = $("listWebhooks");
  await runAction(button, async () => renderWebhooksTable(await api("/webhooks/")), tr("refreshing"));
}

async function disableWebhook(id, button) {
  await runAction(button, async () => {
    await api(`/webhooks/${id}/disable`, { method: "POST" });
    await listWebhooks();
  }, tr("disabling"));
}

function bindEvents() {
  $("saveConnection").addEventListener("click", saveConnection);
  $("clearConnection").addEventListener("click", clearConnection);
  $("createMerchantForm").addEventListener("submit", createMerchant);
  $("generateApiKey").addEventListener("click", generateApiKey);
  $("revokeApiKeyForm").addEventListener("submit", revokeApiKey);
  $("createCustomerForm").addEventListener("submit", createCustomer);
  $("refreshCustomers").addEventListener("click", listCustomers);
  $("createPaymentForm").addEventListener("submit", createPayment);
  $("listPayments").addEventListener("click", listPayments);
  $("paymentsOutput").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (button) paymentAction(button.dataset.action, button.dataset.id, button);
  });
  $("createWebhookForm").addEventListener("submit", createWebhook);
  $("listWebhooks").addEventListener("click", listWebhooks);
  $("webhooksOutput").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action='disable-webhook']");
    if (button) disableWebhook(button.dataset.id, button);
  });
  $("refreshDashboard").addEventListener("click", async () => Promise.allSettled([listCustomers(), listPayments()]));
  $("newCustomerHero").addEventListener("click", () => {
    $("customersSection").scrollIntoView({ behavior: "smooth", block: "start" });
    $("customerName").focus();
  });
  $("newChargeHero").addEventListener("click", () => {
    $("chargesSection").scrollIntoView({ behavior: "smooth", block: "start" });
    $("paymentCustomerId").focus();
  });
  if (ui.langToggle) ui.langToggle.addEventListener("click", () => applyLanguage(state.lang === "pt" ? "en" : "pt"));
}

async function bootstrap() {
  bootstrapConnectionFields();
  bindEvents();
  applyLanguage(state.lang);
  $("customersOutput").innerHTML = `<div class="empty-state">${escapeHtml(tr("connectCustomers"))}</div>`;
  $("paymentsOutput").innerHTML = `<div class="empty-state">${escapeHtml(tr("connectPayments"))}</div>`;
  $("webhooksOutput").innerHTML = `<div class="empty-state">${escapeHtml(tr("emptyWebhooksPanel"))}</div>`;
  $("paymentEventsOutput").textContent = tr("selectHistory");
  renderDashboard();
  if (state.apiKey && state.merchantId) await Promise.allSettled([listCustomers(), listPayments(), listWebhooks()]);
  log(state.lang === "en" ? "HubPay is ready." : "HubPay pronto para uso.");
  toast(state.lang === "en" ? "Panel loaded" : "Painel carregado", "info");
}

bootstrap();
