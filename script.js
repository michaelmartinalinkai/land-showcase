// Renders the site from data.js

document.addEventListener("DOMContentLoaded", () => {
  // ---- Header ----
  document.getElementById("brandName").textContent = SITE.brand;

  // ---- Footer contact ----
  document.getElementById("contactPhoneDisplay").textContent = SITE.contactPhone;
  document.getElementById("contactWhatsapp").href = `https://wa.me/${SITE.contactWhatsapp}`;
  document.getElementById("contactEmailDisplay").textContent = SITE.contactEmail;
  document.getElementById("contactEmail").href = `mailto:${SITE.contactEmail}`;

  // ---- Land picker (jump menu) ----
  const picker = document.getElementById("landPicker");
  picker.innerHTML = PROPERTIES.map((p, i) => {
    const n = i + 1;
    return `<a href="#land-${n}" class="land-chip" data-land="${n}">
      <span class="chip-num">#${n}</span>
      <span class="chip-loc">${escapeHtml(p.location)}</span>
    </a>`;
  }).join("");

  // ---- Property cards ----
  const list = document.getElementById("propertyList");
  list.innerHTML = PROPERTIES.map((p, i) => renderProperty(p, i + 1)).join("");

  // Highlight chip on scroll
  const sections = PROPERTIES.map((_, i) => document.getElementById(`land-${i + 1}`));
  const chips = Array.from(document.querySelectorAll(".land-chip"));
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const idx = sections.indexOf(e.target);
        chips.forEach((c, i) => c.classList.toggle("active", i === idx));
        // Keep the active chip in view inside the scrolling picker strip
        if (chips[idx]) chips[idx].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    });
  }, { rootMargin: "-40% 0px -50% 0px" });
  sections.forEach((s) => s && obs.observe(s));
});

function renderProperty(p, index) {
  const statusClass =
    p.status === "Sold" ? "sold" :
    p.status === "Reserved" ? "reserved" :
    p.status === "Coming Soon" ? "coming-soon" : "available";

  const photoGallery = (p.photos && p.photos.length)
    ? `<div class="photo-grid">
         ${p.photos.map(src => `
           <img src="${src}" alt="${escapeHtml(p.title)}" loading="lazy" onclick="openLightbox('${src}')" />
         `).join("")}
       </div>`
    : `<div class="empty-photos">Photos coming soon</div>`;

  const videos = (p.videos && p.videos.length)
    ? p.videos.map(src => `
        <video controls preload="metadata" playsinline>
          <source src="${src}" type="video/mp4" />
          Your browser does not support video.
        </video>`).join("")
    : "";

  const highlights = (p.highlights || []).map(h => `<li>${escapeHtml(h)}</li>`).join("");
  const details = (p.details || []).map(d => `
    <div class="detail-row">
      <span class="detail-label">${escapeHtml(d.label)}</span>
      <span class="detail-value">${escapeHtml(d.value)}</span>
    </div>`).join("");

  const map = (p.coords && p.coords.lat && p.coords.lng)
    ? `<iframe
         class="map"
         loading="lazy"
         referrerpolicy="no-referrer-when-downgrade"
         src="https://www.google.com/maps?q=${p.coords.lat},${p.coords.lng}&z=15&output=embed">
       </iframe>
       <a class="map-link" target="_blank" rel="noopener"
          href="https://www.google.com/maps?q=${p.coords.lat},${p.coords.lng}">
          Open in Google Maps →
       </a>`
    : "";

  const totalPriceRow = p.totalPrice
    ? `<div class="price-total">Total: <strong>${escapeHtml(p.totalPrice)}</strong></div>`
    : "";

  const zoningRow = p.zoning
    ? `<p class="zoning"><strong>Zoning:</strong> ${escapeHtml(p.zoning)}</p>`
    : "";

  return `
  <article class="property" id="land-${index}">
    <div class="property-head">
      <div>
        <div class="land-number">Land #${index}</div>
        <h3>${escapeHtml(p.title)}</h3>
        <p class="location">${escapeHtml(p.location)}</p>
      </div>
      <span class="status ${statusClass}">${escapeHtml(p.status)}</span>
    </div>

    <div class="price-block">
      <div class="price-main">${escapeHtml(p.price)}</div>
      ${totalPriceRow}
      <div class="size">${escapeHtml(p.size)} · ${escapeHtml(p.certificate || "")}</div>
    </div>

    ${videos ? `<div class="videos">${videos}</div>` : ""}

    ${photoGallery}

    <p class="description">${escapeHtml(p.description)}</p>
    ${zoningRow}

    ${highlights ? `<ul class="highlights">${highlights}</ul>` : ""}

    ${details ? `<div class="details">${details}</div>` : ""}

    ${map ? `<div class="map-wrap">${map}</div>` : ""}
  </article>`;
}

function openLightbox(src) {
  const lb = document.getElementById("lightbox");
  document.getElementById("lightboxImg").src = src;
  lb.classList.add("open");
}
function closeLightbox() {
  document.getElementById("lightbox").classList.remove("open");
}

function escapeHtml(s) {
  if (s == null) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
