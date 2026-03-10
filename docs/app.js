(() => {
  const bundles = {
    pt: {
      htmlLang: "pt-BR",
      nextLabel: "EN",
      title: "HubPay Documentation",
      single: {
        "#menuToggle": "Menu",
        "header nav a[href='#changelog']": "Changelog",
        "header nav a[href='#contact']": "Contato",

        "#leftSidebar section:nth-child(1) h5": "Primeiros Passos",
        "#leftSidebar section:nth-child(1) a[href='#overview']": "Visao Geral",
        "#leftSidebar section:nth-child(1) a[href='#architecture']": "Arquitetura",
        "#leftSidebar section:nth-child(1) a[href='#tech-stack']": "Tech Stack",

        "#leftSidebar section:nth-child(2) h5": "Conceitos Centrais",
        "#leftSidebar section:nth-child(2) a[href='#payment-flow']": "Fluxo de Pagamento",
        "#leftSidebar section:nth-child(2) a[href='#authentication']": "Autenticacao",
        "#leftSidebar section:nth-child(2) a[href='#idempotency']": "Idempotencia",

        "#leftSidebar section:nth-child(3) h5": "Documentacao API",
        "#leftSidebar section:nth-child(3) a[href='#endpoints']": "API Endpoints",
        "#leftSidebar section:nth-child(3) a[href='#webhooks']": "Webhooks",
        "#leftSidebar section:nth-child(3) a[href='#changelog']": "Changelog",
        "#leftSidebar section:nth-child(3) a[href='#contact']": "Contato",

        "#introLabel": "Introducao",
        "#overview h1": "Visao Geral HubPay",
        "#overview > p": "HubPay e um mini gateway de pagamentos criado para estudar arquitetura backend e padroes comuns em APIs de pagamentos. O projeto simula como sistemas de pagamento organizam autenticacao, criacao de pagamentos e mudancas de estado. O foco e demonstrar boas praticas de backend de forma clara e objetiva.",
        "#overview .grid article:nth-child(1) h3": "Alta Performance",
        "#overview .grid article:nth-child(1) p": "O projeto demonstra Minimal APIs e design orientado a performance para respostas rapidas e consistentes.",
        "#overview .grid article:nth-child(2) h3": "Seguro por Design",
        "#overview .grid article:nth-child(2) p": "Autenticacao por API key e requisicoes idempotentes para reforcar seguranca e confiabilidade.",

        "#architecture h2": "Arquitetura do Sistema",
        "#architecture > p": "HubPay utiliza uma arquitetura em camadas para separar responsabilidades e manter o dominio isolado de detalhes tecnicos. Essa estrutura facilita evolucao do sistema, testes e manutencao do codigo.",
        "#architecture .h-28:first-child p": "App do Merchant",

        "#payment-flow h2": "Ciclo de Vida do Pagamento",
        "#payment-flow article:nth-child(1) span": "ETAPA 01",
        "#payment-flow article:nth-child(2) span": "ETAPA 02",
        "#payment-flow article:nth-child(3) span": "ETAPA 03",
        "#payment-flow article:nth-child(1) p": "Pending e o estado inicial de um pagamento logo apos sua criacao. O pagamento foi registrado, mas ainda nao foi autorizado.",
        "#payment-flow article:nth-child(2) p": "Authorized indica que o pagamento foi aprovado e pode ser capturado. Esse estado representa uma autorizacao valida antes da conclusao do pagamento.",
        "#payment-flow article:nth-child(3) p": "Paid representa a conclusao do pagamento. Nesse estado o valor foi efetivamente capturado e o pagamento e considerado finalizado.",

        "#authentication h2": "Autenticacao",
        "#authentication > p": "HubPay utiliza autenticacao baseada em API key para identificar o merchant que realiza a requisicao. Cada requisicao deve incluir a chave no header x-api-key para acessar os endpoints da API.",
        "#authentication .mb-4 .text-slate-500": "Header da Requisicao",

        "#idempotency h2": "Idempotencia",
        "#idempotency > p": "A criacao de pagamentos suporta idempotencia para evitar duplicacao de operacoes. Clientes podem enviar um Idempotency-Key para garantir que a mesma requisicao nao gere multiplos pagamentos.",
        "#idempotency .text-sm": "Quando uma requisicao com a mesma chave e recebida novamente, o sistema retorna a resposta original em vez de criar um novo pagamento.",

        "#endpoints h2": "Principais Endpoints da API",
        "#endpoints th:nth-child(1)": "Metodo",
        "#endpoints th:nth-child(2)": "Endpoint",
        "#endpoints th:nth-child(3)": "Descricao",
        "#endpoints tbody tr:nth-child(1) td:nth-child(3)": "Cria um novo pagamento associado a um merchant e inicia o fluxo de processamento.",
        "#endpoints tbody tr:nth-child(2) td:nth-child(3)": "Retorna os detalhes de um pagamento especifico usando seu identificador.",
        "#endpoints tbody tr:nth-child(3) td:nth-child(3)": "Lista pagamentos do merchant filtrando por status.",
        "#endpoints tbody tr:nth-child(4) td:nth-child(3)": "Lista pagamentos do merchant filtrando por cliente.",
        "#endpoints tbody tr:nth-child(5) td:nth-child(3)": "Autoriza um pagamento previamente criado, movendo seu estado de Pending para Authorized.",
        "#endpoints tbody tr:nth-child(6) td:nth-child(3)": "Marca um pagamento autorizado como pago.",
        "#endpoints tbody tr:nth-child(7) td:nth-child(3)": "Marca um pagamento pendente/autorizado como falho.",
        "#endpoints tbody tr:nth-child(8) td:nth-child(3)": "Reembolsa um pagamento que ja foi concluido.",

        "#webhooks > p": "HubPay gera eventos quando o estado de um pagamento muda. Esses eventos podem ser enviados para endpoints de webhook registrados pelos merchants para permitir integracao com sistemas externos.",

        "#tech-stack h2": "Construido Com",

        "#changelog h2": "Changelog",
        "#changelog article:nth-child(1) h3": "Swagger habilitado na API",
        "#changelog article:nth-child(1) p": "Adicionado Swagger UI em ambiente de desenvolvimento com metadata da versao v1 para facilitar exploracao dos endpoints.",
        "#changelog article:nth-child(2) h3": "Pagina de docs separada do app principal",
        "#changelog article:nth-child(2) p": "Criada estrutura dedicada em docs, sem impacto no fluxo do frontend/console da API.",
        "#changelog article:nth-child(3) h3": "Layout reformulado com base no Stitch",
        "#changelog article:nth-child(3) p": "Estrutura, hierarquia visual e secoes refeitas para espelhar o design Stitch mantendo conteudo real do HubPay.",

        "#contact h2": "Contato",
        "#contact a:nth-child(1) .font-semibold": "Email",

        ".xl\\:block h4": "Live Demo",
        ".xl\\:block p": "Acesse a live demo para explorar os fluxos do HubPay em execucao real.",
        ".xl\\:block a": "Ir para Live Demo",

        "footer p": "© 2026 HubPay API. Educational resources for modern architecture."
      },
      all: {
        "#webhooks .grid > div > span": "Evento"
      }
    },
    en: {
      htmlLang: "en",
      nextLabel: "PT-BR",
      title: "HubPay Documentation",
      single: {
        "#menuToggle": "Menu",
        "header nav a[href='#changelog']": "Changelog",
        "header nav a[href='#contact']": "Contact",

        "#leftSidebar section:nth-child(1) h5": "Getting Started",
        "#leftSidebar section:nth-child(1) a[href='#overview']": "Overview",
        "#leftSidebar section:nth-child(1) a[href='#architecture']": "Architecture",
        "#leftSidebar section:nth-child(1) a[href='#tech-stack']": "Tech Stack",

        "#leftSidebar section:nth-child(2) h5": "Core Concepts",
        "#leftSidebar section:nth-child(2) a[href='#payment-flow']": "Payment Flow",
        "#leftSidebar section:nth-child(2) a[href='#authentication']": "Authentication",
        "#leftSidebar section:nth-child(2) a[href='#idempotency']": "Idempotency",

        "#leftSidebar section:nth-child(3) h5": "API Documentation",
        "#leftSidebar section:nth-child(3) a[href='#endpoints']": "API Endpoints",
        "#leftSidebar section:nth-child(3) a[href='#webhooks']": "Webhooks",
        "#leftSidebar section:nth-child(3) a[href='#changelog']": "Changelog",
        "#leftSidebar section:nth-child(3) a[href='#contact']": "Contact",

        "#introLabel": "Introduction",
        "#overview h1": "HubPay Overview",
        "#overview > p": "HubPay is a mini payment gateway built to study backend architecture and common payment API patterns. The project simulates how payment systems handle authentication, payment creation, and status transitions. The goal is to demonstrate backend best practices in a clear and practical way.",
        "#overview .grid article:nth-child(1) h3": "High Performance",
        "#overview .grid article:nth-child(1) p": "The project demonstrates Minimal APIs and performance-oriented design for fast and consistent responses.",
        "#overview .grid article:nth-child(2) h3": "Secure by Design",
        "#overview .grid article:nth-child(2) p": "API key authentication and idempotent requests improve security and reliability.",

        "#architecture h2": "System Architecture",
        "#architecture > p": "HubPay uses a layered architecture to separate responsibilities and keep domain logic isolated from technical details. This structure improves maintainability, testing, and long-term evolution.",
        "#architecture .h-28:first-child p": "Merchant App",

        "#payment-flow h2": "Payment Lifecycle",
        "#payment-flow article:nth-child(1) span": "STEP 01",
        "#payment-flow article:nth-child(2) span": "STEP 02",
        "#payment-flow article:nth-child(3) span": "STEP 03",
        "#payment-flow article:nth-child(1) p": "Pending is the initial payment state right after creation. The payment is registered but not yet authorized.",
        "#payment-flow article:nth-child(2) p": "Authorized means the payment is approved and can be captured. It represents a valid authorization before final settlement.",
        "#payment-flow article:nth-child(3) p": "Paid represents payment completion. In this state, funds were effectively captured and the payment is considered finalized.",

        "#authentication h2": "Authentication",
        "#authentication > p": "HubPay uses API key authentication to identify the merchant making the request. Every request must include the key in the x-api-key header.",
        "#authentication .mb-4 .text-slate-500": "Request Header",

        "#idempotency h2": "Idempotency",
        "#idempotency > p": "Payment creation supports idempotency to avoid duplicate operations. Clients can send an Idempotency-Key to guarantee the same request will not generate multiple payments.",
        "#idempotency .text-sm": "When the same key is received again, the system returns the original response instead of creating a new payment.",

        "#endpoints h2": "Core API Endpoints",
        "#endpoints th:nth-child(1)": "Method",
        "#endpoints th:nth-child(2)": "Endpoint",
        "#endpoints th:nth-child(3)": "Description",
        "#endpoints tbody tr:nth-child(1) td:nth-child(3)": "Creates a new payment for a merchant and starts the processing flow.",
        "#endpoints tbody tr:nth-child(2) td:nth-child(3)": "Returns details for a specific payment using its identifier.",
        "#endpoints tbody tr:nth-child(3) td:nth-child(3)": "Lists merchant payments filtered by status.",
        "#endpoints tbody tr:nth-child(4) td:nth-child(3)": "Lists merchant payments filtered by customer.",
        "#endpoints tbody tr:nth-child(5) td:nth-child(3)": "Authorizes a previously created payment, moving its status from Pending to Authorized.",
        "#endpoints tbody tr:nth-child(6) td:nth-child(3)": "Marks an authorized payment as paid.",
        "#endpoints tbody tr:nth-child(7) td:nth-child(3)": "Marks a pending/authorized payment as failed.",
        "#endpoints tbody tr:nth-child(8) td:nth-child(3)": "Refunds a payment that was already completed.",

        "#webhooks > p": "HubPay generates events whenever a payment status changes. These events can be sent to merchant webhook endpoints for external integrations.",

        "#tech-stack h2": "Built With",

        "#changelog h2": "Changelog",
        "#changelog article:nth-child(1) h3": "Swagger enabled in the API",
        "#changelog article:nth-child(1) p": "Swagger UI was added in development with v1 metadata to simplify endpoint exploration.",
        "#changelog article:nth-child(2) h3": "Documentation page separated from main app",
        "#changelog article:nth-child(2) p": "A dedicated docs structure was created without impacting the API console frontend flow.",
        "#changelog article:nth-child(3) h3": "Layout rebuilt based on Stitch",
        "#changelog article:nth-child(3) p": "Structure, visual hierarchy, and sections were redesigned to match Stitch while preserving HubPay real content.",

        "#contact h2": "Contact",
        "#contact a:nth-child(1) .font-semibold": "Email",

        ".xl\\:block h4": "Live Demo",
        ".xl\\:block p": "Open the live demo to explore HubPay flows in a real running environment.",
        ".xl\\:block a": "Go to Live Demo",

        "footer p": "© 2026 HubPay API. Educational resources for modern architecture."
      },
      all: {
        "#webhooks .grid > div > span": "Event"
      }
    }
  };

  function setText(selector, text) {
    const el = document.querySelector(selector);
    if (el) el.textContent = text;
  }

  function setAll(selector, text) {
    document.querySelectorAll(selector).forEach((el) => {
      el.textContent = text;
    });
  }

  function applyLanguage(lang) {
    const pack = bundles[lang] || bundles.pt;

    Object.entries(pack.single).forEach(([selector, text]) => setText(selector, text));
    Object.entries(pack.all).forEach(([selector, text]) => setAll(selector, text));

    document.documentElement.lang = pack.htmlLang;
    document.title = pack.title;

    const langLabel = document.getElementById("langLabel");
    if (langLabel) langLabel.textContent = pack.nextLabel;

    localStorage.setItem("hubpay_lang", lang);
  }

  const langToggle = document.getElementById("langToggle");
  if (langToggle) {
    langToggle.addEventListener("click", () => {
      const current = localStorage.getItem("hubpay_lang") || "pt";
      const next = current === "pt" ? "en" : "pt";
      applyLanguage(next);
    });
  }

  const initialLang = localStorage.getItem("hubpay_lang") || "pt";
  applyLanguage(initialLang);

  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("leftSidebar");

  if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", () => {
      const hidden = sidebar.classList.toggle("-translate-x-full");
      menuToggle.setAttribute("aria-expanded", String(!hidden));
    });

    sidebar.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        if (window.innerWidth < 1024) {
          sidebar.classList.add("-translate-x-full");
          menuToggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  const copyButton = document.getElementById("copyAuthHeader");
  const authCode = document.getElementById("authHeaderCode");

  if (copyButton && authCode) {
    copyButton.addEventListener("click", async () => {
      const text = authCode.textContent.trim();
      try {
        await navigator.clipboard.writeText(text);
        copyButton.innerHTML = '<span class="material-symbols-outlined text-base">check</span>';
        setTimeout(() => {
          copyButton.innerHTML = '<span class="material-symbols-outlined text-base">content_copy</span>';
        }, 1200);
      } catch {
        copyButton.innerHTML = '<span class="material-symbols-outlined text-base">close</span>';
        setTimeout(() => {
          copyButton.innerHTML = '<span class="material-symbols-outlined text-base">content_copy</span>';
        }, 1200);
      }
    });
  }
})();



