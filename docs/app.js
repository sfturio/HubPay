(() => {
  const menuBtn = document.getElementById("menuBtn");
  const sidebar = document.getElementById("sidebar");
  const themeBtn = document.getElementById("themeBtn");

  if (menuBtn && sidebar) {
    menuBtn.addEventListener("click", () => {
      sidebar.classList.toggle("hidden");
    });

    sidebar.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth < 1024) {
          sidebar.classList.add("hidden");
        }
      });
    });
  }

  const savedTheme = localStorage.getItem("hubpay.docs.theme") || "light";
  if (savedTheme === "dark") {
    document.body.classList.add("theme-dark");
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const isDark = document.body.classList.toggle("theme-dark");
      localStorage.setItem("hubpay.docs.theme", isDark ? "dark" : "light");
    });
  }
})();

