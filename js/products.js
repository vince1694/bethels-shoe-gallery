/* ============================================================
   BETHELS SHOE GALLERY — Products Data & Rendering
   ============================================================ */

const PRODUCTS = [
  { id: 1, name: "Classic Low-Top Sneakers", brand: "Bethels Gallery", category: "Men", price: 125, oldPrice: 250, discount: 50, rating: 4.8, reviews: 128, img: "assets/images/shoe1_1.jpg", colors: ["#F5F0E8","#D97B2A","#1A1A1A"], sizes: [40,41,42,43,44,45], badge: "50% OFF", bestseller: true },
  { id: 2, name: "Oxford Cap-Toe Dress Shoes", brand: "Bethels Gallery", category: "Men", price: 189, oldPrice: 220, discount: 14, rating: 4.9, reviews: 84, img: "assets/images/shoe2_1.jpg", colors: ["#1A1A1A","#4A3728","#6B5B47"], sizes: [40,41,42,43,44,45], badge: "NEW", bestseller: false },
  { id: 3, name: "Nude Suede Stiletto Heels", brand: "Bethels Gallery", category: "Women", price: 149, oldPrice: 199, discount: 25, rating: 4.7, reviews: 203, img: "assets/images/shoe3_1.jpg", colors: ["#C8A882","#E8D5C4","#8B6F5A"], sizes: [36,37,38,39,40,41], badge: "25% OFF", bestseller: true },
  { id: 4, name: "Rugged Leather Hiking Boots", brand: "Bethels Gallery", category: "Men", price: 215, oldPrice: 280, discount: 23, rating: 4.6, reviews: 67, img: "assets/images/shoe4_1.jpg", colors: ["#5C3A1E","#8B6F5A","#3D2B1F"], sizes: [40,41,42,43,44,45,46], badge: null, bestseller: false },
  { id: 5, name: "Chunky Platform Streetwear", brand: "Bethels Gallery", category: "Women", price: 135, oldPrice: 180, discount: 25, rating: 4.5, reviews: 312, img: "assets/images/shoe5_1.jpg", colors: ["#FFFFFF","#3B82F6","#F97316"], sizes: [36,37,38,39,40,41], badge: "HOT", bestseller: true },
  { id: 6, name: "Red Strappy Block Sandals", brand: "Bethels Gallery", category: "Women", price: 98, oldPrice: 130, discount: 25, rating: 4.4, reviews: 156, img: "assets/images/shoe6_1.jpg", colors: ["#DC2626","#000000","#C8A882"], sizes: [36,37,38,39,40,41], badge: "25% OFF", bestseller: false },
  { id: 7, name: "Tan Suede Chelsea Boots", brand: "Bethels Gallery", category: "Men", price: 178, oldPrice: 230, discount: 23, rating: 4.8, reviews: 91, img: null, gradClass: "placeholder-grad-7", gradIcon: "🥾", colors: ["#C8A882","#1A1A1A","#5C3A1E"], sizes: [40,41,42,43,44,45], badge: null, bestseller: false },
  { id: 8, name: "Sport Runner Pro", brand: "Bethels Gallery", category: "Men", price: 115, oldPrice: 155, discount: 26, rating: 4.6, reviews: 445, img: null, gradClass: "placeholder-grad-8", gradIcon: "👟", colors: ["#FFFFFF","#F97316","#3B82F6"], sizes: [40,41,42,43,44,45,46], badge: "SALE", bestseller: true }
];

function getStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let s = "";
  for (let i = 0; i < full; i++) s += "★";
  if (half) s += "☆";
  while (s.length < 5) s += "☆";
  return s;
}

function renderCard(p) {
  const imgHtml = p.img
    ? `<img src="${p.img}" alt="${p.name}" loading="lazy">`
    : `<div class="card-img-placeholder ${p.gradClass}"><span style="font-size:4rem">${p.gradIcon}</span></div>`;

  return `
  <article class="product-card" data-category="${p.category}" data-id="${p.id}" onclick="goToDetail(${p.id})">
    <div class="card-img-wrap">
      ${imgHtml}
      ${p.badge ? `<div class="card-badge"><span class="badge-discount">${p.badge}</span></div>` : ""}
      <button class="card-wishlist" aria-label="Add to wishlist" onclick="toggleWishlist(event, this)">
        <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      </button>
      <button class="card-quick-add" onclick="quickAdd(event, ${p.id})">+ QUICK ADD</button>
    </div>
    <div class="card-body">
      <div class="card-category">${p.category}</div>
      <div class="card-name">${p.name}</div>
      <div class="card-stars">
        <span class="star">${getStars(p.rating)}</span>
        <span class="card-rating-count">(${p.reviews})</span>
      </div>
      <div class="card-price-row">
        <span class="card-price">$${p.price.toFixed(2)}</span>
        ${p.oldPrice ? `<span class="card-price-old">$${p.oldPrice.toFixed(2)}</span>` : ""}
        ${p.discount ? `<span class="badge-discount">${p.discount}%</span>` : ""}
      </div>
    </div>
  </article>`;
}

function goToDetail(id) {
  window.location.href = `product-detail.html?id=${id}`;
}

function toggleWishlist(e, btn) {
  e.stopPropagation();
  btn.classList.toggle("active");
}

function quickAdd(e, id) {
  e.stopPropagation();
  const p = PRODUCTS.find(x => x.id === id);
  if (p) Cart.addItem({ id: p.id, name: p.name, price: p.price, img: p.img, size: "Default", color: p.colors[0] });
}

// Render grid
function renderGrid(filter = "All") {
  const grid = document.getElementById("products-grid");
  const countEl = document.getElementById("results-count");
  if (!grid) return;

  const filtered = filter === "All" ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);
  grid.innerHTML = filtered.map(renderCard).join("");
  if (countEl) countEl.textContent = `${filtered.length} products`;
}

// Filter buttons
document.addEventListener("DOMContentLoaded", () => {
  renderGrid();
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderGrid(btn.dataset.filter);
    });
  });
});
