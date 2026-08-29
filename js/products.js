/* ============================================================
   BETHELS SHOE GALLERY — Products Data & Rendering (Naira ₦)
   ============================================================ */

const PRODUCTS = [
  {
    id: 1,
    name: "Classic Low-Top Sneakers",
    brand: "Sneaker Company",
    category: "Men",
    price: 75000,
    oldPrice: 150000,
    discount: 50,
    rating: 4.8,
    reviews: 128,
    img: "assets/images/shoe1_1.jpg",
    galleryImages: [
      "assets/images/shoe1_1.jpg",
      "assets/images/shoe1_2.jpg",
      "assets/images/shoe1_3.jpg",
      "assets/images/shoe1_4.jpg"
    ],
    colors: ["#F5F0E8", "#D97B2A", "#1A1A1A"],
    sizes: [40, 41, 42, 43, 44, 45],
    badge: "50% OFF",
    bestseller: true,
    desc: "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer."
  },
  {
    id: 2,
    name: "Oxford Cap-Toe Dress Shoes",
    brand: "Bethels Leather Craft",
    category: "Men",
    price: 120000,
    oldPrice: 140000,
    discount: 14,
    rating: 4.9,
    reviews: 84,
    img: "assets/images/shoe2_1.jpg",
    galleryImages: [
      "assets/images/shoe2_1.jpg"
    ],
    colors: ["#1A1A1A", "#4A3728", "#6B5B47"],
    sizes: [40, 41, 42, 43, 44, 45],
    badge: "NEW",
    bestseller: false,
    desc: "Handcrafted from full-grain calfskin leather, these Oxford cap-toe dress shoes offer timeless elegance for formal business and black-tie events."
  },
  {
    id: 3,
    name: "Nude Suede Stiletto Heels",
    brand: "Bethels Couture",
    category: "Women",
    price: 95000,
    oldPrice: 125000,
    discount: 25,
    rating: 4.7,
    reviews: 203,
    img: "assets/images/shoe3_1.jpg",
    galleryImages: [
      "assets/images/shoe3_1.jpg"
    ],
    colors: ["#C8A882", "#E8D5C4", "#8B6F5A"],
    sizes: [36, 37, 38, 39, 40, 41],
    badge: "25% OFF",
    bestseller: true,
    desc: "Sleek and sophisticated nude suede stilettos with ankle strap detailing. Designed with padded insoles for elegant evening comfort."
  },
  {
    id: 4,
    name: "Rugged Leather Hiking Boots",
    brand: "Outdoor Craft",
    category: "Men",
    price: 135000,
    oldPrice: 175000,
    discount: 23,
    rating: 4.6,
    reviews: 67,
    img: "assets/images/shoe4_1.jpg",
    galleryImages: [
      "assets/images/shoe4_1.jpg"
    ],
    colors: ["#5C3A1E", "#8B6F5A", "#3D2B1F"],
    sizes: [40, 41, 42, 43, 44, 45, 46],
    badge: null,
    bestseller: false,
    desc: "Heavy-duty waterproof leather boots engineered with Vibram soles for outdoor trails, wilderness trekking, and winter weather."
  },
  {
    id: 5,
    name: "Chunky Platform Streetwear",
    brand: "Urban Runner",
    category: "Women",
    price: 85000,
    oldPrice: 115000,
    discount: 25,
    rating: 4.5,
    reviews: 312,
    img: "assets/images/shoe5_1.jpg",
    galleryImages: [
      "assets/images/shoe5_1.jpg"
    ],
    colors: ["#FFFFFF", "#3B82F6", "#F97316"],
    sizes: [36, 37, 38, 39, 40, 41],
    badge: "HOT",
    bestseller: true,
    desc: "Bold 90s retro-inspired chunky platform sneakers with vivid blue and orange pops. Lightweight foam sole for all-day urban comfort."
  },
  {
    id: 6,
    name: "Red Strappy Block Sandals",
    brand: "Summer Atelier",
    category: "Women",
    price: 65000,
    oldPrice: 85000,
    discount: 25,
    rating: 4.4,
    reviews: 156,
    img: "assets/images/shoe6_1.jpg",
    galleryImages: [
      "assets/images/shoe6_1.jpg"
    ],
    colors: ["#DC2626", "#000000", "#C8A882"],
    sizes: [36, 37, 38, 39, 40, 41],
    badge: "25% OFF",
    bestseller: false,
    desc: "Vibrant red leather strappy sandals with gold buckle hardware and sturdy block heels. Perfect for summer parties and vacations."
  },
  {
    id: 7,
    name: "Tan Suede Chelsea Boots",
    brand: "Bethels Gallery",
    category: "Men",
    price: 110000,
    oldPrice: 145000,
    discount: 23,
    rating: 4.8,
    reviews: 91,
    img: "assets/images/shoe1_2.jpg",
    galleryImages: [
      "assets/images/shoe1_2.jpg"
    ],
    colors: ["#C8A882", "#1A1A1A", "#5C3A1E"],
    sizes: [40, 41, 42, 43, 44, 45],
    badge: null,
    bestseller: false,
    desc: "Italian suede Chelsea boots featuring elastic side gores and tab pullers for versatile smart casual styling."
  },
  {
    id: 8,
    name: "Sport Runner Pro",
    brand: "Bethels Gallery",
    category: "Men",
    price: 70000,
    oldPrice: 95000,
    discount: 26,
    rating: 4.6,
    reviews: 445,
    img: "assets/images/shoe1_1.jpg",
    galleryImages: [
      "assets/images/shoe1_1.jpg"
    ],
    colors: ["#FFFFFF", "#F97316", "#3B82F6"],
    sizes: [40, 41, 42, 43, 44, 45, 46],
    badge: "SALE",
    bestseller: true,
    desc: "Breathable performance running shoes built with shock-absorbing soles for long-distance training."
  }
];

function formatNaira(amount) {
  return "₦" + amount.toLocaleString("en-NG");
}

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
  const imgHtml = `<img src="${p.img}" alt="${p.name}" loading="lazy">`;

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
        <span class="card-price">${formatNaira(p.price)}</span>
        ${p.oldPrice ? `<span class="card-price-old">${formatNaira(p.oldPrice)}</span>` : ""}
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
  if (p) Cart.addItem({ id: p.id, name: p.name, price: p.price, img: p.img, size: p.sizes ? p.sizes[0] : "Default", color: p.colors ? p.colors[0] : "#000" });
}

// Render grid
// options: { filter, excludeId, limit }
function renderGrid(filter = "All", options = {}) {
  const grid = document.getElementById("products-grid");
  const countEl = document.getElementById("results-count");
  if (!grid) return;

  let filtered = filter === "All" ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  // Exclude a specific product (used on detail page to hide current product)
  if (options.excludeId !== undefined) {
    filtered = filtered.filter(p => p.id !== options.excludeId);
  }

  // Limit number of results (used on detail page for related products)
  if (options.limit !== undefined) {
    filtered = filtered.slice(0, options.limit);
  }

  grid.innerHTML = filtered.map(renderCard).join("");
  if (countEl) countEl.textContent = `${filtered.length} products`;
}

// Filter buttons (products page only)
document.addEventListener("DOMContentLoaded", () => {
  // Only auto-render on the products listing page (filter buttons exist)
  const filterButtons = document.querySelectorAll(".filter-btn");
  if (filterButtons.length > 0) {
    renderGrid();
    filterButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderGrid(btn.dataset.filter);
      });
    });
  }
});
