sectionRoute();

function sectionRoute() {
  const mainPage = document.getElementById("mainPage");

  async function navigate(sectionName) {
    try {
      if (window.cleanupSection) {
        window.cleanupSection();
        window.cleanupSection = null;
      }

      const response = await fetch(`/api/sections/${sectionName}`);
      if (!response.ok) throw new Error("Section not found");

      const html = await response.text();
      mainPage.innerHTML = "";
      mainPage.innerHTML = html;

      window.history.pushState(
        { section: sectionName },
        "",
        sectionName === "system" ? "/" : `/${sectionName}`,
      );

      setCss(sectionName);
      setJs(sectionName);
    } catch (error) {
      console.error("Navigation error:", error);
      mainPage.innerHTML = `<div class="error">Failed to load ${sectionName}</div>`;
    }
  }

  document.querySelectorAll(".tab").forEach((tab) => {

    tab.addEventListener("click", () => {

      const landing_bg = document.getElementById("landing-bg");
      landing_bg.classList.remove('active');
      landing_bg.style.backgroundImage = '';

      const sectionName = tab.dataset.tab.trim().toLowerCase();
      document
        .querySelectorAll(".tab")
        .forEach((t) => t.classList.remove("active"));
      const matchingTabs = document.querySelectorAll(
        `.tab[data-tab="${sectionName}"]`,
      );
      matchingTabs.forEach((match) => match.classList.add("active"));

      navigate(sectionName);
    });
  });

  window.addEventListener("popstate", (e) => {
    if (e.state?.section) {
      navigate(e.state.section);
    }
  });

  function setCss(sectionName) {
    const isLinkExist = document.querySelector(
      `link[href="${sectionName}.css"]`,
    );
    if (isLinkExist) {
      return;
    }
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `sections/${sectionName}/${sectionName}.css`;
    // link.dataset.section = sectionName;
    document.head.appendChild(link);
  }
  function setJs(sectionName) {
    const src = `sections/${sectionName}/${sectionName}.js`;
    const existingScript = document.querySelector(`script[src="${src}"]`);
    if (existingScript) {
      existingScript.remove();
    }
    const script = document.createElement("script");
    script.src = src;
    document.body.appendChild(script);
  }

  const path = window.location.pathname.replace("/", "") || "home";
  navigate(path);
}
