(() => {
  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("leftSidebar");

  if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", () => {
      const open = sidebar.classList.toggle("-translate-x-full");
      menuToggle.setAttribute("aria-expanded", String(!open));
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
