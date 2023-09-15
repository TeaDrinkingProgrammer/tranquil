/* dark mode */
const themeToggle = document.querySelector("#theme-toggle");
const preferDark = window.matchMedia("(prefers-color-scheme: dark)");
const LIGHT_THEME = 0;
const DARK_THEME = 1;

if (!localStorage.getItem("theme") && preferDark.matches) toggleTheme(DARK_THEME);
if (localStorage.getItem("theme") == DARK_THEME) toggleTheme(DARK_THEME);

function toggleTheme(theme) {
  if (theme === DARK_THEME) document.documentElement.classList.add("dark");
  else document.documentElement.classList.remove("dark");
  themeToggle.innerHTML =
    theme === DARK_THEME
      ? themeToggle.dataset.sunIcon
      : themeToggle.dataset.moonIcon;
  localStorage.setItem("theme", theme);
  toggleGiscusTheme(theme);
}

themeToggle.addEventListener("click", () =>
  toggleTheme(localStorage.getItem("theme") == DARK_THEME ? LIGHT_THEME : DARK_THEME),
);
preferDark.addEventListener("change", (e) =>
  toggleTheme(e.matches ? DARK_THEME : LIGHT_THEME),
);

function toggleGiscusTheme(theme) {
  const iframe = document.querySelector("iframe.giscus-frame");
  if (iframe)
    iframe.contentWindow.postMessage(
      {
        giscus: {
          setConfig: { theme: `${location.origin}/giscus_${theme}.css` },
        },
      },
      "https://giscus.app",
    );
}

window.addEventListener("message", initGiscusTheme);
function initGiscusTheme() {
  toggleGiscusTheme(
    localStorage.getItem("theme") || (preferDark.matches ? "dark" : "light"),
  );
  window.removeEventListener("message", initGiscusTheme);
}