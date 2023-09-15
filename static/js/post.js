/* outdate alert */
const alert = document.querySelector("#outdate_alert");
if (alert) {
  const publish = document.querySelector("#publish");
  const updated = document.querySelector("#updated");
  const updateDate = new Date(
    updated ? updated.textContent : publish.textContent,
  );
  const intervalDays = Math.floor(
    (Date.now() - updateDate.getTime()) / (24 * 60 * 60 * 1000),
  );
  const warnDays = parseInt(alert.dataset.days);
  if (intervalDays >= warnDays) {
    const msg =
      alert.dataset.alertTextBefore +
      intervalDays +
      alert.dataset.alertTextAfter;
    alert.querySelector(".content").textContent = msg;
    alert.classList.remove("hidden");
  }
}

/* code copy button */
const addCopyBtns = () => {
  const cfg = document.querySelector("#copy-cfg");
  if (!cfg) return;
  const copyIcon = cfg.dataset.copyIcon;
  const checkIcon = cfg.dataset.checkIcon;
  document.querySelectorAll("pre").forEach((block) => {
    if (block.classList.contains("mermaid")) return;
    const wrapper = document.createElement("div");
    wrapper.className = "codeblock";
    const btn = document.createElement("button");
    btn.className = "copy";
    btn.ariaLabel = "copy";
    btn.innerHTML = copyIcon;
    const copy = () => {
      navigator.clipboard.writeText(block.textContent).then(() => {
        btn.innerHTML = checkIcon;
        btn.classList.add("copied");
        btn.removeEventListener("click", copy);
        setTimeout(() => {
          btn.innerHTML = copyIcon;
          btn.classList.remove("copied");
          btn.addEventListener("click", copy);
        }, 2000);
      });
    };
    btn.addEventListener("click", copy);
    wrapper.appendChild(block.cloneNode(true));
    wrapper.appendChild(btn);
    block.replaceWith(wrapper);
  });
};
addCopyBtns();

/* back-to-top button */
const backBtn = document.querySelector("#back-to-top");
if (backBtn) {
  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const toggle = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop > 200 && !backBtn.classList.contains("shown")) {
      backBtn.classList.add("shown");
      backBtn.addEventListener("click", toTop);
    } else if (scrollTop <= 200 && backBtn.classList.contains("shown")) {
      backBtn.classList.remove("shown");
      backBtn.removeEventListener("click", toTop);
    }
  };
  window.addEventListener("scroll", toggle);
  toggle();
}

/* footnote backlink */
const backlinkIcon = document.querySelector("article").dataset.backlinkIcon;
const footnotes = document.querySelectorAll(".footnote-definition");
footnotes.forEach((footnote) => {
  const backlink = document.createElement("button");
  backlink.className = "backlink";
  backlink.ariaLabel = "backlink";
  backlink.innerHTML = backlinkIcon;
  backlink.addEventListener("click", () =>
    window.scrollTo({
      top:
        document
          .querySelector(`a[href="#${footnote.id}"]`)
          .getBoundingClientRect().top +
        window.scrollY -
        100,
      behavior: "smooth"
    }),
  );
  footnote.appendChild(backlink);
});

/* img lightsense */
window.addEventListener("load", () =>
  Lightense("article img", { background: "rgba(43, 43, 43, 0.19)" }),
);