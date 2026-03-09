const $ = (id) => document.getElementById(id);

const state = {
  baseUrl: localStorage.getItem("hubpay.baseUrl") || window.location.origin,
  merchantId: localStorage.getItem("hubpay.merchantId") || "",
  apiKey: localStorage.getItem("hubpay.apiKey") || ""
};

const ui = {
  apiBaseUrl: $("apiBaseUrl"),
  merchantId: $("merchantId"),
  apiKey: $("apiKey"),
  activityOutput: $("activityOutput")
};

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
  log("Conexao salva.");
  toast("Sessao salva", "success");
}

function clearConnection() {
  localStorage.removeItem("hubpay.baseUrl");
  localStorage.removeItem("hubpay.merchantId");
  localStorage.removeItem("hubpay.apiKey");
  state.baseUrl = window.location.origin;
  state.merchantId = "";
  state.apiKey = "";
  bootstrapConnectionFields();
  log("Conexao limpa.");
  toast("Sessao limpa", "info");
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
  const time = new Date().toLocaleTimeString();
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

function setLoading(button, isLoading, loadingText = "Processando...") {
  if (!button) return;
  if (!button.dataset.originalText) button.dataset.originalText = button.textContent;
  button.disabled = isLoading;
  button.textContent = isLoading ? loadingText : button.dataset.originalText;
}

function renderJson(targetId, data) {
  $(targetId).textContent = JSON.stringify(data, null, 2);
}

function requireMerchantId() {
  if (!state.merchantId) throw new Error("ID do merchant e obrigatorio na conexao.");
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

function authHint() {
  return "Nao autorizado. Verifique Merchant ID + API Key e clique em Salvar Sessao.";
}

function statusClass(status) {
  const key = String(status || "").toLowerCase();
  if (key === "paid") return "#dff7e8;#1f7a46;#b9e6ca";
  if (key === "authorized") return "#fff6d9;#9a6a00;#f6dea4";
  if (key === "refused") return "#fee5e2;#b42318;#f7c9c2";
  if (key === "cancelled") return "#eceff3;#475467;#d2d8e0";
  return "#edf2ff;#2448aa;#cfdaf9";
}

function statusBadge(status) {
  const [bg, fg, bd] = statusClass(status).split(";");
  return `<span class="badge" style="background:${bg};color:${fg};border-color:${bd}">${escapeHtml(status)}</span>`;
}

async function runAction(button, fn, loadingText) {
  try {
    setLoading(button, true, loadingText);
    await fn();
  } catch (err) {
    log(err.message);
    toast("Erro na operacao", "error");
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
    log(`Merchant criado: ${merchant.id}`);
    toast("Merchant criado", "success");
  }, "Criando...");
}

async function listMerchants() {
  const button = $("listMerchants");
  await runAction(button, async () => {
    const merchants = await api("/merchants/");
    renderJson("merchantsOutput", merchants);
    log(`Merchants carregados: ${merchants.length}.`);
  }, "Atualizando...");
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
    log("API key gerada e salva na sessao.");
    toast("API key gerada", "success");
  }, "Gerando...");
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
    log("API key revogada.");
    toast("API key revogada", "success");
  }, "Revogando...");
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
    log(`Cliente criado: ${customer.id}`);
    toast("Cliente criado", "success");
  }, "Criando...");
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

    log(`Pagamento criado: ${payment.id}`);
    toast("Pagamento criado", "success");
    await listPayments();
  }, "Executando...");
}

async function listPayments() {
  const button = $("listPayments");
  setLoading(button, true, "Atualizando...");
  try {
    const payments = await api("/payments/");
    const rows = payments.map((p) => `
      <tr>
        <td><code>${escapeHtml(p.id)}</code></td>
        <td>${statusBadge(p.status)}</td>
        <td>${escapeHtml(p.amount)} ${escapeHtml(p.currency)}</td>
        <td>${escapeHtml(p.paymentMethod)}</td>
        <td>${escapeHtml(p.description)}</td>
        <td>
          <div class="actions">
            <button class="btn btn-light" data-action="authorize" data-id="${p.id}">Autorizar</button>
            <button class="btn btn-light" data-action="markPaid" data-id="${p.id}">Marcar como Pago</button>
            <button class="btn btn-light" data-action="refuse" data-id="${p.id}">Recusar</button>
            <button class="btn btn-light" data-action="cancel" data-id="${p.id}">Cancelar</button>
            <button class="btn btn-primary" data-action="events" data-id="${p.id}">Eventos</button>
          </div>
        </td>
      </tr>
    `).join("");

    $("paymentsOutput").innerHTML = `
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Status</th><th>Valor</th><th>Metodo</th><th>Descricao</th><th>Acoes</th>
          </tr>
        </thead>
        <tbody>${rows || '<tr><td colspan="6">Nenhum pagamento encontrado.</td></tr>'}</tbody>
      </table>
    `;

    log(`Pagamentos carregados: ${payments.length}.`);
  } catch (err) {
    if (String(err.message).startsWith("401")) {
      renderCardError("paymentsOutput", "Autenticacao necessaria", authHint());
    }
    log(err.message);
    toast("Erro ao listar pagamentos", "error");
  } finally {
    setLoading(button, false);
  }
}

async function paymentAction(action, id, button) {
  await runAction(button, async () => {
    if (action === "events") {
      const events = await api(`/payments/${id}/events`);
      renderJson("paymentEventsOutput", events);
      log(`Eventos carregados para o pagamento ${id}: ${events.length}.`);
      toast("Linha do tempo atualizada", "info");
      return;
    }

    const map = { authorize: "authorize", markPaid: "capture", refuse: "refuse", cancel: "cancel" };
    await api(`/payments/${id}/${map[action]}`, { method: "POST" });
    log(`Pagamento ${id}: acao '${action}' executada.`);
    toast("Status atualizado", "success");
    await listPayments();
  }, "Processando...");
}

async function createWebhook(e) {
  e.preventDefault();
  const button = e.submitter || e.target.querySelector("button[type='submit']");
  await runAction(button, async () => {
    const webhook = await api("/webhooks/", {
      method: "POST",
      body: JSON.stringify({ url: $("webhookUrl").value.trim() })
    });
    log(`Webhook criado: ${webhook.id}`);
    toast("Webhook criado", "success");
    await listWebhooks();
  }, "Criando...");
}

async function listWebhooks() {
  const button = $("listWebhooks");
  await runAction(button, async () => {
    const webhooks = await api("/webhooks/");
    const rows = webhooks.map((w) => `
      <tr>
        <td><code>${escapeHtml(w.id)}</code></td>
        <td>${escapeHtml(w.url)}</td>
        <td>${w.isActive ? statusBadge("ATIVO") : statusBadge("DESATIVADO")}</td>
        <td><button class="btn btn-danger" data-action="disable-webhook" data-id="${w.id}">Desativar</button></td>
      </tr>
    `).join("");

    $("webhooksOutput").innerHTML = `
      <table>
        <thead><tr><th>ID</th><th>URL</th><th>Status</th><th>Acao</th></tr></thead>
        <tbody>${rows || '<tr><td colspan="4">Nenhum webhook encontrado.</td></tr>'}</tbody>
      </table>
    `;

    log(`Webhooks carregados: ${webhooks.length}.`);
  }, "Atualizando...");
}

async function disableWebhook(id, button) {
  await runAction(button, async () => {
    await api(`/webhooks/${id}/disable`, { method: "POST" });
    log(`Webhook desativado: ${id}`);
    toast("Webhook desativado", "success");
    await listWebhooks();
  }, "Desativando...");
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
}

bootstrapConnectionFields();
bindEvents();
log("HubPay Console iniciado.");
toast("Console pronto", "info");
