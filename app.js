
/* =====================================================
   PACIFIQUE DESIGN – SETTINGS (edit here)
   ===================================================== */
const CONFIG = {
  name: "Pacifique Design",

  /* LOGO: put your logo file/link between the quotes. Example: "logo.PNG" or "https://..." */
  logo: "1.JPG",

  /* HERO PHOTO (home page, top) and ABOUT PHOTO */
  heroImage: "1.JPG",
  aboutImage: "1.JPG",

  phone: "+257 69 57 71 36",
  whatsapp: "257 69 57 71 36",                 // number without + or spaces
  email: "nderagakurapacifique09@gmail.com",
  location: "Bujumbura, Burundi",

  /* SOCIAL MEDIA – replace with your exact page links if they are different */
  social: [
    { id: "facebook",  label: "Facebook",  url: "https://tiktok.com/@nderagakura.pacifique09" },
    
    { id: "instagram", label: "Instagram", url: "https://www.instagram.com/pacifique.design?stkn=MXQ3cmowMGY1OTF4cw==" },
    
    { id: "pinterest", label: "Pinterest", url: "https://pin.it/2nQsmoW5P" },
    
    { id: "youtube",   label: "YouTube",   url: "https://www.youtube.com/@Pacifiquedesign" },
    
    { id: "tiktok",    label: "TikTok",    url: "https://tiktok.com/@nderagakura.pacifique09" }
  ],

  /* PORTFOLIO – put your picture in "image" (file name or link). Leave "" to show a placeholder. */
  works: [
    { title: "Birthday Design",     category: "Birthday",      image: "2.PNG" },
    
    { title: "Brand Identity Pack",    category: "Branding",   image: "3.JPG" },
    
    { title: "Event Poster",           category: "Posters",    image: "4.PNG" },
    
    { title: "Social Post Series",  category: "Social Media", image: "5.PNG" },
    
    { title: "Calendar Design",      category: "Print",      image: "7.JPG" },
    
    { title: "Restaurant Menu",        category: "Print",      image: "6.PNG" },
    
    { title: "Song Cover",            category: "Song",    image: "8.PNG" },
    
    { title: "Football Design",      category: "Football",      image: "9.PNG" }
    
  ],

  services: [
    { icon: "pen",     title: "Logo Design",          text: "A memorable logo that tells your story and works everywhere." },
    { icon: "layers",  title: "Brand Identity",       text: "Colors, fonts and style guides so your brand looks consistent." },
    { icon: "printer", title: "Posters & Flyers",     text: "Eye-catching print designs for events, promotions and shops." },
    { icon: "monitor", title: "Social Media Design",  text: "Posts, covers and ads that make people stop scrolling." },
    { icon: "card",    title: "Business Cards",       text: "Clean, professional cards that leave a great first impression." },
    { icon: "package", title: "Packaging & Labels",   text: "Product labels and packaging that sell on the shelf." }
  ]
};

/* =====================================================
   APP CODE
   ===================================================== */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.prototype.slice.call(r.querySelectorAll(s));
const ic = (id, cls = "ic") => `<svg class="${cls}" aria-hidden="true"><use href="#i-${id}"/></svg>`;
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

const waLink = (text) => `https://wa.me/${CONFIG.whatsapp}` + (text ? `?text=${encodeURIComponent(text)}` : "");
const telLink  = "tel:" + CONFIG.phone.replace(/\s/g, "");
const mailLink = (subject, body) => `mailto:${CONFIG.email}` + (subject ? `?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body || "")}` : "");

/* Image frame: same shape for every picture, tall or wide images are cropped neatly */
function frame(src, alt, label = "Add your image here") {
  const img = src ? `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" onerror="this.remove()">` : "";
  return `<div class="ph">${ic("image")}<span>${esc(label)}</span></div>${img}`;
}

/* ---------- Logo ---------- */
function paintLogos() {
  const initials = CONFIG.name.split(" ").map(w => w[0]).join("").slice(0, 2);
  $$(".js-logo").forEach(el => {
    el.innerHTML = `<span>${initials}</span>` +
      (CONFIG.logo ? `<img src="${esc(CONFIG.logo)}" alt="${esc(CONFIG.name)} logo" onerror="this.remove()">` : "");
  });
}

/* ---------- Contact links ---------- */
function paintContact() {
  $$(".js-wa").forEach(a => { a.href = waLink("Hello Pacifique Design, I would like to talk about a design project."); a.target = "_blank"; a.rel = "noopener"; });
  $$(".js-tel").forEach(a => a.href = telLink);
  $$(".js-mail").forEach(a => a.href = mailLink());
  $$(".js-phone").forEach(e => e.textContent = CONFIG.phone);
  $$(".js-email").forEach(e => e.textContent = CONFIG.email);
  $$(".js-loc").forEach(e => e.textContent = CONFIG.location);
  $("#yr").textContent = new Date().getFullYear();
}

/* ---------- Social ---------- */
function paintSocial() {
  const html = CONFIG.social.map(s =>
    `<a href="${esc(s.url)}" target="_blank" rel="noopener" aria-label="${esc(CONFIG.name)} on ${esc(s.label)}">${ic(s.id, s.id === "pinterest" || s.id === "tiktok" ? "ic-f" : "ic")}</a>`
  ).join("");
  $("#socialFooter").innerHTML = html;
  $("#socialDrawer").innerHTML = html;
}

/* ---------- Work ---------- */
function workCard(w, i) {
  return `<button class="work" data-i="${i}" aria-label="Open ${esc(w.title)}">
    <div class="frame" style="--pb:125%">${frame(w.image, w.title)}</div>
    <div class="meta"><b>${esc(w.title)}</b><small>${esc(w.category)}</small></div>
  </button>`;
}
function paintWork(filter = "All") {
  const list = CONFIG.works.map((w, i) => ({ w, i })).filter(x => filter === "All" || x.w.category === filter);
  $("#workGrid").innerHTML = list.map(x => workCard(x.w, x.i)).join("");
}
function paintChips() {
  const cats = ["All"].concat(Array.from(new Set(CONFIG.works.map(w => w.category))));
  $("#chips").innerHTML = cats.map((c, i) => `<button class="chip${i ? "" : " on"}" data-c="${esc(c)}">${esc(c)}</button>`).join("");
  $("#chips").addEventListener("click", e => {
    const b = e.target.closest(".chip"); if (!b) return;
    $$(".chip").forEach(c => c.classList.toggle("on", c === b));
    paintWork(b.dataset.c);
  });
}
function paintHome() {
  $("#homeWork").innerHTML = CONFIG.works.slice(0, 4).map(workCard.bind(null)).map((h, i) => h).join("");
  $("#homeServices").innerHTML = CONFIG.services.slice(0, 3).map(svcCard(false)).join("");
  $("#heroImg").innerHTML = frame(CONFIG.heroImage, CONFIG.name, "Add your photo here");
  $("#aboutImg").innerHTML = frame(CONFIG.aboutImage, "About " + CONFIG.name, "Add your photo here");
}

/* ---------- Services ---------- */
const svcCard = (withLink) => (s) => `
  <div class="svc"><div class="ico">${ic(s.icon)}</div>
    <div><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p>
    ${withLink ? `<a class="link" href="#/order?service=${encodeURIComponent(s.title)}">Request this ${ic("arrow")}</a>` : ""}</div>
  </div>`;
function paintServices() {
  $("#serviceList").innerHTML = CONFIG.services.map(svcCard(true)).join("");
  $("#fDesign").innerHTML = `<option value="">Choose a design...</option>` +
    CONFIG.services.map(s => `<option>${esc(s.title)}</option>`).join("") + `<option>Other / Not sure yet</option>`;
}

/* ---------- Lightbox ---------- */
function openLB(i) {
  const w = CONFIG.works[i]; if (!w) return;
  $("#lbBox").innerHTML = w.image
    ? `<img src="${esc(w.image)}" alt="${esc(w.title)}" onerror="this.outerHTML='<div class=&quot;frame&quot; style=&quot;--pb:125%;max-width:340px&quot;><div class=&quot;ph&quot;>Image not found</div></div>'">`
    : `<div class="frame" style="--pb:125%;max-width:340px">${frame("", w.title)}</div>`;
  $("#lbTitle").textContent = w.title;
  $("#lbCat").textContent = w.category;
  $("#lbCta").href = "#/order?service=" + encodeURIComponent(w.category);
  $("#lb").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeLB() { $("#lb").classList.remove("open"); document.body.style.overflow = ""; }
document.addEventListener("click", e => {
  const b = e.target.closest(".work"); if (b) openLB(+b.dataset.i);
});
$("#lbClose").onclick = closeLB;
$("#lbCta").onclick = closeLB;
$("#lb").addEventListener("click", e => { if (e.target.id === "lb") closeLB(); });

/* ---------- Drawer ---------- */
const drawer = $("#drawer"), scrim = $("#scrim");
const openMenu = () => { drawer.classList.add("open"); scrim.classList.add("open"); };
const closeMenu = () => { drawer.classList.remove("open"); scrim.classList.remove("open"); };
$("#openMenu").onclick = openMenu;
$("#closeMenu").onclick = closeMenu;
scrim.onclick = closeMenu;
$("#drawerNav").addEventListener("click", closeMenu);
document.addEventListener("keydown", e => { if (e.key === "Escape") { closeMenu(); closeLB(); } });

/* ---------- Toast ---------- */
let tt;
function toast(msg) {
  const t = $("#toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(tt); tt = setTimeout(() => t.classList.remove("show"), 2800);
}

/* ---------- Router ---------- */
const PAGES = ["home", "work", "services", "order", "contact", "about"];
function route() {
  const raw = location.hash.replace(/^#\/?/, "");
  const [p, q] = raw.split("?");
  const page = PAGES.includes(p) ? p : "home";
  $$(".page").forEach(s => s.classList.toggle("active", s.dataset.page === page));
  $$("[data-tab]").forEach(t => t.classList.toggle("on", t.dataset.tab === page));
  if (page === "order" && q) {
    const svc = new URLSearchParams(q).get("service");
    if (svc) {
      const sel = $("#fDesign");
      const hit = Array.prototype.slice.call(sel.options).find(o => o.value.toLowerCase() === svc.toLowerCase());
      if (hit) sel.value = hit.value;
    }
  }
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  closeMenu(); closeLB();
}
window.addEventListener("hashchange", route);

/* ---------- Order form ---------- */
const form = $("#orderForm");
function validate() {
  const v = n => form.elements[n].value.trim();
  const rules = {
    name:    v("name").length >= 2,
    country: v("country").length >= 2,
    contact: /^[+()\d\s-]{7,20}$/.test(v("contact")),
    design:  v("design") !== ""
  };
  let ok = true;
  Object.entries(rules).forEach(([k, pass]) => {
    $(`[data-f="${k}"]`).classList.toggle("bad", !pass);
    if (!pass) ok = false;
  });
  if (!ok) { const first = $(".field.bad input, .field.bad select"); first && first.focus(); }
  return ok;
}
function buildMessage() {
  const v = n => form.elements[n].value.trim();
  return `Hello Pacifique Design!\n\nNew project request:\n` +
    `Name: ${v("name")}\nCountry: ${v("country")}\nContact: ${v("contact")}\nDesign needed: ${v("design")}\n` +
    (v("details") ? `Details: ${v("details")}\n` : "") + `\nThank you!`;
}
form.addEventListener("submit", e => {
  e.preventDefault();
  if (!validate()) { toast("Please check the highlighted fields"); return; }
  window.open(waLink(buildMessage()), "_blank") || (location.href = waLink(buildMessage()));
  toast("Opening WhatsApp...");
});
$("#sendMail").addEventListener("click", () => {
  if (!validate()) { toast("Please check the highlighted fields"); return; }
  location.href = mailLink("New project request – " + form.elements.design.value, buildMessage());
});
form.addEventListener("input", e => { const f = e.target.closest(".field"); f && f.classList.remove("bad"); });

/* ---------- Init ---------- */
[paintLogos, paintContact, paintSocial, paintServices, paintChips, paintWork, paintHome, route].forEach(function(fn){
  try { fn(); } catch (err) { console.error(fn.name, err); }
});

window.addEventListener("load", function(){
  setTimeout(function(){ var sp=$("#splash"); if(sp) sp.classList.add("hide"); }, 1000);
});
