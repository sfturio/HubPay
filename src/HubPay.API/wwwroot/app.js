const $ = (id) => document.getElementById(id);

const state = {
  baseUrl: localStorage.getItem("hubpay.baseUrl") || window.location.origin,
  merchantId: localStorage.getItem("hubpay.merchantId") || "",
  apiKey: localStorage.getItem("hubpay.apiKey") || "",
  lastPayments: [],
  lastCustomers: []
};

const ui = {
  apiBaseUrl: $("apiBaseUrl"),
  merchantId: $("merchantId"),
  apiKey: $("apiKey"),
  activityOutput: $("activityOutput")
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

function bootstrapConnectionFields() {
  ui.apiBaseUrl.value = state.baseUrl;
  ui.merchantId.value = state.merchantId;
  ui.apiKey.value = state.apiKey;
}

function log(message) {
  const time = new Date().toLocaleTimeString("pt-BR");
  ui.activityOutput.textContent = `[${time}] ${message}\n` + ui.activityOutput.textContent;
}

function toast(message, type = "info") {
  const node = document.createElement("div");
  node.textContent = message;

  const colors = {
    info: "#1f4654",
    success: "#127766",
    error: "#b43e37"
  };

  Object.assign(node.style, {
    position: "fixed",
    top: "16px",
    right: "16px",
    zIndex: "9999",
    background: colors[type] || colors.info,
    color: "#fff",
    padding: "10px 12px",
    borderRadius: "10px",
    fontWeight: "700",
    fontSize: "12px",
    boxShadow: "0 10px 24px rgba(0,0,0,.22)"
  });

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

  log("Conexao salva.");
  toast("Conexao salva", "success");
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
  toast("Conexao limpa", "info");
}

function getHeaders(extra = {}) {
  const headers = { "Content-Type": "application/json", ...extra };
  if (state.apiKey) headers["x-api-key"] = state.apiKey;
  return headers;
}

async function api(path, options = {}) {
  saveConnection();

  const response = await fetch(`${state.baseUrl}${path}`, {
    ...options,
    headers: {
      ...getHeaders(),
      ...(options.headers || {})
    }
  });

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

function setLoading(button, isLoading, text = "Processando...") {
  if (!button) return;
  if (!button.dataset.originalText) button.dataset.originalText = button.textContent;
  button.disabled = isLoading;
  button.textContent = isLoading ? text : button.dataset.originalText;
}

async function runAction(button, handler, loadingText) {
  try {
    setLoading(button, true, loadingText);
    await handler();
  } catch (err) {
    log(err.message);
    toast("Nao foi possivel concluir a acao", "error");
  } finally {
    setLoading(button, false);
  }
}

function escapeHtml(text) {
  return String(text ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeStatus(status) {
  return String(status || "").toLowerCase();
}

function statusBadge(status) {
  const key = normalizeStatus(status);

  if (key === "paid") {
    return '<span class="badge" style="background:#e8f7f2;color:#127766;border-color:#b6e1d7">Pago</span>';
  }

  if (key === "active") {
    return '<span class="badge" style="background:#e8f7f2;color:#127766;border-color:#b6e1d7">Ativo</span>';
  }

  if (key === "authorized") {
    return '<span class="badge" style="background:#fff8e9;color:#9c6a1a;border-color:#f3deb2">Em analise</span>';
  }

  if (key === "refused") {
    return '<span class="badge" style="background:#fff0ef;color:#b43e37;border-color:#efcac7">Recusado</span>';
  }

  if (key === "refunded") {
    return '<span class="badge" style="background:#f2f5f7;color:#51636a;border-color:#d5dfe2">Cancelado</span>';
  }

  if (key === "inactive") {
    return '<span class="badge" style="background:#f2f5f7;color:#51636a;border-color:#d5dfe2">Inativo</span>';
  }

  return '<span class="badge" style="background:#edf4ff;color:#375694;border-color:#cddcf3">Pendente</span>';
}

function paymentMethodLabel(method) {
  const key = String(method || "").toLowerCase();
  const map = {
    "1": "Cartao de credito",
    "2": "Pix",
    "3": "Boleto",
    creditcard: "Cartao de credito",
    pix: "Pix",
    boleto: "Boleto"
  };

  return map[key] || method;
}

function toDate(value) {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function isOpenCharge(status) {
  const key = normalizeStatus(status);
  return key === "pending" || key === "authorized";
}

function renderDashboard() {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();

  const inMonth = state.lastPayments.filter((payment) => {
    const createdAt = toDate(payment.createdAt);
    return createdAt && createdAt.getMonth() === month && createdAt.getFullYear() === year;
  });

  const paidInMonth = inMonth.filter((p) => normalizeStatus(p.status) === "paid");
  const totalReceived = paidInMonth.reduce((acc, payment) => acc + Number(payment.amount || 0), 0);
  const pendingCharges = state.lastPayments.filter((p) => isOpenCharge(p.status)).length;
  const overdueCharges = state.lastPayments.filter((payment) => {
    if (!isOpenCharge(payment.status)) return false;
    const createdAt = toDate(payment.createdAt);
    if (!createdAt) return false;
    const diffDays = (now - createdAt) / (1000 * 60 * 60 * 24);
    return diffDays > 7;
  }).length;

  const avgTicket = paidInMonth.length > 0 ? totalReceived / paidInMonth.length : 0;

  $("monthSummary").textContent = `${inMonth.length} cobrancas`;
  $("monthSummaryHint").textContent = paidInMonth.length > 0
    ? `Ticket medio: ${currencyFormatter.format(avgTicket)}`
    : "Sem recebimentos confirmados neste mes.";
  $("totalReceived").textContent = currencyFormatter.format(totalReceived);
  $("pendingCharges").textContent = String(pendingCharges);
  $("overdueCharges").textContent = String(overdueCharges);

  renderRecentCustomers();
}

function renderRecentCustomers() {
  const target = $("recentCustomers");
  const customers = state.lastCustomers.slice(0, 5);

  if (customers.length === 0) {
    target.className = "empty-state";
    target.textContent = "Cadastre seu primeiro cliente para comecar.";
    return;
  }

  target.className = "table-wrap";
  const rows = customers.map((customer) => {
    const createdAt = toDate(customer.createdAt);
    const formattedDate = createdAt ? createdAt.toLocaleDateString("pt-BR") : "-";

    return `
      <tr>
        <td>${escapeHtml(customer.name)}</td>
        <td>${escapeHtml(customer.email)}</td>
        <td>${escapeHtml(customer.document)}</td>
        <td>${formattedDate}</td>
      </tr>
    `;
  }).join("");

  target.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Documento</th>
          <th>Criado em</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function renderCustomersTable(customers) {
  const target = $("customersOutput");

  if (!customers.length) {
    target.innerHTML = '<div class="empty-state">Nenhum cliente cadastrado ainda.</div>';
    return;
  }

  const rows = customers.map((customer) => {
    const createdAt = toDate(customer.createdAt);
    const formattedDate = createdAt ? createdAt.toLocaleString("pt-BR") : "-";

    return `
      <tr>
        <td><code>${escapeHtml(customer.id)}</code></td>
        <td>${escapeHtml(customer.name)}</td>
        <td>${escapeHtml(customer.email)}</td>
        <td>${escapeHtml(customer.document)}</td>
        <td>${formattedDate}</td>
      </tr>
    `;
  }).join("");

  target.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Documento</th>
          <th>Criado em</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function renderPaymentsTable(payments) {
  const target = $("paymentsOutput");

  if (!payments.length) {
    target.innerHTML = '<div class="empty-state">Nenhuma cobranca encontrada.</div>';
    return;
  }

  const rows = payments.map((payment) => `
    <tr>
      <td><code>${escapeHtml(payment.id)}</code></td>
      <td>${statusBadge(payment.status)}</td>
      <td>${currencyFormatter.format(Number(payment.amount || 0))}</td>
      <td>${escapeHtml(paymentMethodLabel(payment.paymentMethod))}</td>
      <td>${escapeHtml(payment.description || "-")}</td>
      <td>
        <div class="actions">
          <button class="btn btn-ghost" data-action="authorize" data-id="${payment.id}">Autorizar</button>
          <button class="btn btn-ghost" data-action="markPaid" data-id="${payment.id}">Marcar pago</button>
          <button class="btn btn-ghost" data-action="refuse" data-id="${payment.id}">Recusar</button>
          <button class="btn btn-ghost" data-action="refund" data-id="${payment.id}">Cancelar</button>
          <button class="btn btn-secondary" data-action="events" data-id="${payment.id}">Historico</button>
        </div>
      </td>
    </tr>
  `).join("");

  target.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Status da cobranca</th>
          <th>Valor</th>
          <th>Forma</th>
          <th>Descricao</th>
          <th>Acoes</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function renderWebhooksTable(webhooks) {
  const target = $("webhooksOutput");

  if (!webhooks.length) {
    target.innerHTML = '<div class="empty-state">Nenhum webhook cadastrado.</div>';
    return;
  }

  const rows = webhooks.map((webhook) => `
    <tr>
      <td><code>${escapeHtml(webhook.id)}</code></td>
      <td>${escapeHtml(webhook.url)}</td>
      <td>${statusBadge(webhook.isActive ? "active" : "inactive")}</td>
      <td><button class="btn btn-danger" data-action="disable-webhook" data-id="${webhook.id}">Desativar</button></td>
    </tr>
  `).join("");

  target.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>URL</th>
          <th>Status</th>
          <th>Acao</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

async function createMerchant(event) {
  event.preventDefault();
  const button = event.submitter || event.target.querySelector("button[type='submit']");

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

    $("merchantsOutput").textContent = JSON.stringify(merchant, null, 2);
    log(`Conta criada: ${merchant.id}`);
    toast("Conta criada", "success");
  }, "Criando...");
}

async function generateApiKey() {
  const button = $("generateApiKey");

  await runAction(button, async () => {
    if (!state.merchantId) {
      throw new Error("Crie uma conta ou preencha o ID da conta antes de gerar a chave.");
    }

    const response = await api(`/merchants/${state.merchantId}/api-keys`, { method: "POST" });
    if (response?.key) {
      state.apiKey = response.key;
      ui.apiKey.value = response.key;
      saveConnection();
    }

    $("merchantsOutput").textContent = JSON.stringify(response, null, 2);
    log("Chave de API gerada.");
    toast("Chave gerada", "success");
  }, "Gerando...");
}

async function revokeApiKey(event) {
  event.preventDefault();
  const button = event.submitter || event.target.querySelector("button[type='submit']");

  await runAction(button, async () => {
    if (!state.merchantId) {
      throw new Error("Informe o ID da conta para revogar uma chave.");
    }

    await api(`/merchants/${state.merchantId}/api-keys/revoke`, {
      method: "POST",
      body: JSON.stringify({ key: $("revokeApiKeyInput").value.trim() })
    });

    log("Chave revogada.");
    toast("Chave revogada", "success");
  }, "Revogando...");
}

async function createCustomer(event) {
  event.preventDefault();
  const button = event.submitter || event.target.querySelector("button[type='submit']");

  await runAction(button, async () => {
    const customer = await api("/customers/", {
      method: "POST",
      body: JSON.stringify({
        name: $("customerName").value.trim(),
        document: $("customerDocument").value.trim(),
        email: $("customerEmail").value.trim()
      })
    });

    $("paymentCustomerId").value = customer.id;
    log(`Cliente criado: ${customer.name}`);
    toast("Cliente salvo", "success");

    await listCustomers();
  }, "Salvando...");
}

async function listCustomers() {
  const button = $("refreshCustomers");
  setLoading(button, true, "Atualizando...");

  try {
    const customers = await api("/customers?take=20");
    state.lastCustomers = customers;
    renderCustomersTable(customers);
    renderDashboard();
    log(`Clientes carregados: ${customers.length}.`);
  } catch (err) {
    log(err.message);
    $("customersOutput").innerHTML = '<div class="empty-state">Nao foi possivel carregar os clientes. Verifique ID da conta e chave da API.</div>';
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

    log(`Cobranca criada: ${payment.id}`);
    toast("Cobranca criada", "success");

    await listPayments();
  }, "Criando...");
}

async function listPayments() {
  const button = $("listPayments");
  setLoading(button, true, "Atualizando...");

  try {
    const payments = await api("/payments/");
    state.lastPayments = payments;
    renderPaymentsTable(payments);
    renderDashboard();
    log(`Cobrancas carregadas: ${payments.length}.`);
  } catch (err) {
    log(err.message);
    $("paymentsOutput").innerHTML = '<div class="empty-state">Nao foi possivel carregar as cobrancas. Verifique ID da conta e chave da API.</div>';
  } finally {
    setLoading(button, false);
  }
}

async function paymentAction(action, id, button) {
  await runAction(button, async () => {
    if (action === "events") {
      const events = await api(`/payments/${id}/events`);
      $("paymentEventsOutput").textContent = JSON.stringify(events, null, 2);
      log(`Historico carregado para cobranca ${id}.`);
      return;
    }

    const routeMap = {
      authorize: "authorize",
      markPaid: "pay",
      refuse: "refuse",
      refund: "cancel"
    };

    await api(`/payments/${id}/${routeMap[action]}`, { method: "POST" });
    log(`Cobranca ${id} atualizada para: ${action}.`);
    toast("Status atualizado", "success");
    await listPayments();
  }, "Processando...");
}

async function createWebhook(event) {
  event.preventDefault();
  const button = event.submitter || event.target.querySelector("button[type='submit']");

  await runAction(button, async () => {
    const webhook = await api("/webhooks/", {
      method: "POST",
      body: JSON.stringify({ url: $("webhookUrl").value.trim() })
    });

    log(`Webhook criado: ${webhook.id}`);
    toast("Webhook salvo", "success");
    await listWebhooks();
  }, "Salvando...");
}

async function listWebhooks() {
  const button = $("listWebhooks");

  await runAction(button, async () => {
    const webhooks = await api("/webhooks/");
    renderWebhooksTable(webhooks);
    log(`Webhooks carregados: ${webhooks.length}.`);
  }, "Atualizando...");
}

async function disableWebhook(id, button) {
  await runAction(button, async () => {
    await api(`/webhooks/${id}/disable`, { method: "POST" });
    log(`Webhook desativado: ${id}.`);
    toast("Webhook desativado", "success");
    await listWebhooks();
  }, "Desativando...");
}

function bindShortcutButtons() {
  const goToCustomer = () => {
    $("customersSection").scrollIntoView({ behavior: "smooth", block: "start" });
    $("customerName").focus();
  };

  const goToCharge = () => {
    $("chargesSection").scrollIntoView({ behavior: "smooth", block: "start" });
    $("paymentCustomerId").focus();
  };

  ["newCustomerTop", "newCustomerHero"].forEach((id) => {
    const button = $(id);
    if (button) button.addEventListener("click", goToCustomer);
  });

  ["newChargeTop", "newChargeHero"].forEach((id) => {
    const button = $(id);
    if (button) button.addEventListener("click", goToCharge);
  });
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
    if (!button) return;
    paymentAction(button.dataset.action, button.dataset.id, button);
  });

  $("createWebhookForm").addEventListener("submit", createWebhook);
  $("listWebhooks").addEventListener("click", listWebhooks);
  $("webhooksOutput").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action='disable-webhook']");
    if (!button) return;
    disableWebhook(button.dataset.id, button);
  });

  $("refreshDashboard").addEventListener("click", async () => {
    await Promise.allSettled([listCustomers(), listPayments()]);
  });

  bindShortcutButtons();
}

async function bootstrap() {
  bootstrapConnectionFields();
  bindEvents();

  $("customersOutput").innerHTML = '<div class="empty-state">Conecte sua conta para ver os clientes.</div>';
  $("paymentsOutput").innerHTML = '<div class="empty-state">Conecte sua conta para ver as cobrancas.</div>';
  $("webhooksOutput").innerHTML = '<div class="empty-state">Sem webhooks configurados.</div>';

  renderDashboard();

  if (state.apiKey && state.merchantId) {
    await Promise.allSettled([listCustomers(), listPayments(), listWebhooks()]);
  }

  log("HubPay pronto para uso.");
  toast("Painel carregado", "info");
}

bootstrap();

