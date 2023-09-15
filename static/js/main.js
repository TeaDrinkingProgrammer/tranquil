/* dark mode */
const LIGHT_THEME = "light";
const DARK_THEME = "dark";

const themeToggle = document.querySelector("#theme-toggle");
const currentTheme = localStorage.getItem("theme");
const preferDark = window.matchMedia("(prefers-color-scheme: dark)");

toggleGiscusTheme(currentTheme);
setThemeToggle(currentTheme);
setCodeHighlightTheme(currentTheme);

themeToggle.addEventListener("click", () =>
  toggleTheme(localStorage.getItem("theme") == DARK_THEME ? LIGHT_THEME : DARK_THEME),
);
preferDark.addEventListener("change", (e) =>
  toggleTheme(e.matches ? DARK_THEME : LIGHT_THEME),
);

function toggleTheme(theme) {
  if (theme === DARK_THEME) document.documentElement.classList.add(DARK_THEME);
  else document.documentElement.classList.remove(DARK_THEME);
  
  localStorage.setItem("theme", theme);
  
  setThemeToggle(theme);
  toggleGiscusTheme(theme);
  setCodeHighlightTheme(theme);
}

function setCodeHighlightTheme(theme) {
  const hlLink = document.querySelector('link#hl');
  if (hlLink) hlLink.href = `/hl-${theme}.css`;
}

function setThemeToggle(theme) {
  themeToggle.innerHTML =
  theme === DARK_THEME
    ? themeToggle.dataset.sunIcon
    : themeToggle.dataset.moonIcon;
}

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