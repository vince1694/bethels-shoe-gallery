/* ============================================================
   BETHELS SHOE GALLERY — Cart Manager
   ============================================================ */

const Cart = (() => {
  const KEY = "bsg_cart";

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch { return []; }
  }

  function save(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
    updateBadges();
  }

  function getItems() { return load(); }

  function addItem(product, qty = 1) {
    const items = load();
    const idx = items.findIndex(i => i.id === product.id && i.size === product.size && i.color === product.color);
    if (idx > -1) {
      items[idx].qty += qty;
    } else {
      items.push({ ...product, qty });
    }
    save(items);
    showToast(`<span class="toast-icon">🛒</span> ${product.name} added to cart!`);
  }

  function removeItem(id, size, color) {
    let items = load().filter(i => !(i.id === id && i.size === size && i.color === color));
    save(items);
  }

  function updateQty(id, size, color, qty) {
    const items = load();
    const idx = items.findIndex(i => i.id === id && i.size === size && i.color === color);
    if (idx > -1) { items[idx].qty = qty; if (qty <= 0) items.splice(idx, 1); }
    save(items);
  }

  function getCount() { return load().reduce((s, i) => s + i.qty, 0); }

  function getTotal() { return load().reduce((s, i) => s + i.price * i.qty, 0); }

  function clear() { save([]); }

  function updateBadges() {
    const count = getCount();
    document.querySelectorAll(".cart-badge").forEach(el => {
      el.textContent = count;
      el.classList.toggle("visible", count > 0);
    });
  }

  function showToast(html) {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      document.body.appendChild(container);
    }
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = html;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add("removing");
      toast.addEventListener("animationend", () => toast.remove());
    }, 3000);
  }

  // Init badges on load
  document.addEventListener("DOMContentLoaded", updateBadges);

  return { addItem, removeItem, updateQty, getItems, getCount, getTotal, clear, showToast };
})();
