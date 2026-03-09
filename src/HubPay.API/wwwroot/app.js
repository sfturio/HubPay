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
  log("Connection saved.");
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
  log("Connection cleared.");
  toast("Sessao limpa", "info");
}

function getHeaders(extra = {}) {
  const headers = { "Content-Type": "application/json", ...extra };
  if (state.apiKey) headers.Authorization = `Bearer ${state.apiKey}`;
  return headers;
}

async function api(path, options = {}) {
  saveConnection();
  const response = await fetch(`${state.baseUrl}${path}`, options);
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
  node.className = `hubpay-toast ${type}`;
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
    boxShadow: "0 10px 24px rgba(0,0,0,.2)",
    transform: "translateY(-8px)",
    opacity: "0",
    transition: "all .18s ease"
  });

  document.body.appendChild(node);
  requestAnimationFrame(() => {
    node.style.transform = "translateY(0)";
    node.style.opacity = "1";
  });

  setTimeout(() => {
    node.style.transform = "translateY(-8px)";
    node.style.opacity = "0";
    setTimeout(() => node.remove(), 180);
  }, 1800);
}

function setLoading(button, isLoading, loadingText = "Working...") {
  if (!button) return;
  if (!button.dataset.originalText) button.dataset.originalText = button.textContent;
  button.disabled = isLoading;
  button.style.opacity = isLoading ? ".75" : "1";
  button.style.cursor = isLoading ? "wait" : "pointer";
  button.textContent = isLoading ? loadingText : button.dataset.originalText;
}

function renderJson(targetId, data) {
  $(targetId).textContent = JSON.stringify(data, null, 2);
}

function requireMerchantId() {
  if (!state.merchantId) {
    throw new Error("Merchant ID is required in Connection.");
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
    const body = {
      name: $("merchantName").value.trim(),
      document: $("merchantDocument").value.trim(),
      email: $("merchantEmail").value.trim()
    };

    const merchant = await api("/merchants/", {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(body)
    });

    state.merchantId = merchant.id;
    ui.merchantId.value = merchant.id;
    saveConnection();

    renderJson("merchantsOutput", merchant);
    log(`Merchant created: ${merchant.id}`);
    toast("Merchant criado", "success");
  }, "Creating...");
}

async function listMerchants() {
  const button = $("listMerchants");
  await runAction(button, async () => {
    const merchants = await api("/merchants/");
    renderJson("merchantsOutput", merchants);
    log(`Loaded ${merchants.length} merchants.`);
  }, "Refreshing...");
}

async function generateApiKey() {
  const button = $("generateApiKey");
  await runAction(button, async () => {
    requireMerchantId();
    const response = await api(`/merchants/${state.merchantId}/api-keys`, {
      method: "POST",
      headers: getHeaders()
    });
    if (response?.key) {
      state.apiKey = response.key;
      ui.apiKey.value = response.key;
      saveConnection();
    }
    renderJson("merchantsOutput", response);
    log("API key generated and saved in session.");
    toast("API key gerada", "success");
  }, "Generating...");
}

async function revokeApiKey(e) {
  e.preventDefault();
  const button = e.submitter || e.target.closest("section")?.querySelector(".btn-danger");

  await runAction(button, async () => {
    requireMerchantId();
    const key = $("revokeApiKeyInput").value.trim();
    await api(`/merchants/${state.merchantId}/api-keys/revoke`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ key })
    });
    log("API key revoked.");
    toast("API key revogada", "success");
  }, "Revoking...");
}

async function createCustomer(e) {
  e.preventDefault();
  const button = e.submitter || e.target.querySelector("button[type='submit']");

  await runAction(button, async () => {
    const customer = await api("/customers/", {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        name: $("customerName").value.trim(),
        document: $("customerDocument").value.trim(),
        email: $("customerEmail").value.trim()
      })
    });

    renderJson("customersOutput", customer);
    $("paymentCustomerId").value = customer.id;
    log(`Customer created: ${customer.id}`);
    toast("Cliente criado", "success");
  }, "Creating...");
}

async function createPayment(e) {
  e.preventDefault();
  const button = e.submitter || e.target.querySelector("button[type='submit']");

  await runAction(button, async () => {
    const idempotencyKey = $("idempotencyKey").value.trim();
    const headers = getHeaders();
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

    log(`Payment created: ${payment.id}`);
    toast("Pagamento criado", "success");
    await listPayments();
  }, "Executing...");
}

async function listPayments() {
  const button = $("listPayments");
  await runAction(button, async () => {
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
            <button class="btn btn-light" data-action="authorize" data-id="${p.id}">Authorize</button>
            <button class="btn btn-light" data-action="capture" data-id="${p.id}">Capture</button>
            <button class="btn btn-light" data-action="refuse" data-id="${p.id}">Refuse</button>
            <button class="btn btn-light" data-action="cancel" data-id="${p.id}">Cancel</button>
            <button class="btn btn-primary" data-action="events" data-id="${p.id}">Events</button>
          </div>
        </td>
      </tr>
    `).join("");

    $("paymentsOutput").innerHTML = `
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Status</th><th>Amount</th><th>Method</th><th>Description</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>${rows || '<tr><td colspan="6">No payments yet.</td></tr>'}</tbody>
      </table>
    `;

    log(`Loaded ${payments.length} payments.`);
  }, "Refreshing...");
}

async function paymentAction(action, id, button) {
  await runAction(button, async () => {
    if (action === "events") {
      const events = await api(`/payments/${id}/events`);
      renderJson("paymentEventsOutput", events);
      log(`Loaded ${events.length} events for payment ${id}.`);
      toast("Timeline atualizada", "info");
      return;
    }

    const map = {
      authorize: "authorize",
      capture: "capture",
      refuse: "refuse",
      cancel: "cancel"
    };

    await api(`/payments/${id}/${map[action]}`, {
      method: "POST",
      headers: getHeaders()
    });

    log(`Payment ${id} ${action} executed.`);
    toast(`Pagamento ${action}`, "success");
    await listPayments();
  }, "Working...");
}

async function createWebhook(e) {
  e.preventDefault();
  const button = e.submitter || e.target.querySelector("button[type='submit']");

  await runAction(button, async () => {
    const webhook = await api("/webhooks/", {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ url: $("webhookUrl").value.trim() })
    });

    log(`Webhook created: ${webhook.id}`);
    toast("Webhook criado", "success");
    await listWebhooks();
  }, "Adding...");
}

async function listWebhooks() {
  const button = $("listWebhooks");
  await runAction(button, async () => {
    const webhooks = await api("/webhooks/");
    const rows = webhooks.map((w) => `
      <tr>
        <td><code>${escapeHtml(w.id)}</code></td>
        <td>${escapeHtml(w.url)}</td>
        <td>${w.isActive ? statusBadge("ACTIVE") : statusBadge("DISABLED")}</td>
        <td><button class="btn btn-danger" data-action="disable-webhook" data-id="${w.id}">Disable</button></td>
      </tr>
    `).join("");

    $("webhooksOutput").innerHTML = `
      <table>
        <thead><tr><th>ID</th><th>URL</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>${rows || '<tr><td colspan="4">No webhooks yet.</td></tr>'}</tbody>
      </table>
    `;

    log(`Loaded ${webhooks.length} webhooks.`);
  }, "Refreshing...");
}

async function disableWebhook(id, button) {
  await runAction(button, async () => {
    await api(`/webhooks/${id}/disable`, { method: "POST", headers: getHeaders() });
    log(`Webhook disabled: ${id}`);
    toast("Webhook desativado", "success");
    await listWebhooks();
  }, "Disabling...");
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
log("HubPay Console ready.");
toast("Console pronto", "info");