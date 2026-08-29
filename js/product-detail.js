/* ============================================================
   BETHELS SHOE GALLERY — Product Detail Page Logic (Unified Gallery)
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  // Get product ID from URL query param (e.g. product-detail.html?id=2)
  const params = new URLSearchParams(window.location.search);
  const productId = parseInt(params.get("id")) || 1;
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];

  // Gallery Images setup for the selected product
  const galleryImages = (product.galleryImages && product.galleryImages.length > 0)
    ? product.galleryImages
    : [product.img || "assets/images/shoe1_1.jpg"];

  let currentIndex = 0;
  let currentQty = 1;
  let selectedSize = product.sizes ? product.sizes[0] : 42;
  let selectedColor = product.colors ? product.colors[0] : "#F5F0E8";

  // 1. Populate Product Info Metadata
  const brandEl = document.getElementById("p-brand");
  const titleEl = document.getElementById("p-title");
  const descEl = document.getElementById("p-desc");
  const priceEl = document.getElementById("p-price");
  const oldPriceEl = document.getElementById("p-old-price");
  const badgeEl = document.getElementById("p-badge");

  function formatNaira(amount) {
    return "₦" + Number(amount).toLocaleString("en-NG");
  }

  if (brandEl) brandEl.textContent = (product.brand || "BETHELS GALLERY").toUpperCase();
  if (titleEl) titleEl.textContent = product.name;
  if (descEl) descEl.textContent = product.desc || `Experience unmatched style and comfort with our premium ${product.name}. Handcrafted with high-quality materials for everyday elegance.`;

  if (priceEl) priceEl.textContent = formatNaira(product.price);
  if (oldPriceEl) {
    if (product.oldPrice) {
      oldPriceEl.textContent = formatNaira(product.oldPrice);
      oldPriceEl.style.display = "block";
    } else {
      oldPriceEl.style.display = "none";
    }
  }
  if (badgeEl) {
    if (product.discount) {
      badgeEl.textContent = `${product.discount}%`;
      badgeEl.style.display = "inline-flex";
    } else {
      badgeEl.style.display = "none";
    }
  }

  // Page title & breadcrumb
  document.title = `${product.name} — Bethels Shoe Gallery`;
  const bcCurrent = document.getElementById("bc-current");
  if (bcCurrent) bcCurrent.textContent = product.name;

  // 2. Render Size Buttons
  const sizesContainer = document.getElementById("sizes-container");
  if (sizesContainer && product.sizes) {
    sizesContainer.innerHTML = product.sizes.map(sz => `
      <button class="size-btn ${sz === selectedSize ? 'active' : ''}" data-size="${sz}">${sz}</button>
    `).join('');

    sizesContainer.querySelectorAll(".size-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        sizesContainer.querySelectorAll(".size-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedSize = parseInt(btn.dataset.size);
      });
    });
  }

  // 3. Render Color Options
  const colorsContainer = document.getElementById("colors-container");
  if (colorsContainer && product.colors) {
    colorsContainer.innerHTML = product.colors.map(c => `
      <button class="color-btn ${c === selectedColor ? 'active' : ''}" data-color="${c}" style="background-color:${c}"></button>
    `).join('');

    colorsContainer.querySelectorAll(".color-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        colorsContainer.querySelectorAll(".color-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedColor = btn.dataset.color;
      });
    });
  }

  // 4. Render Gallery Elements (Unified Gallery & Lightbox)
  const mainImage = document.getElementById("main-image");
  const galleryThumbsContainer = document.getElementById("gallery-thumbs");
  const lbThumbsContainer = document.getElementById("lb-thumbs");
  const lbMainImg = document.getElementById("lb-main-image");

  // Render Thumbnails (Only show thumbnail row if > 1 image, or 1 clean thumbnail)
  if (galleryThumbsContainer) {
    if (galleryImages.length > 1) {
      galleryThumbsContainer.style.display = "flex";
      galleryThumbsContainer.innerHTML = galleryImages.map((imgUrl, idx) => `
        <button class="thumb-btn ${idx === 0 ? 'active' : ''}" data-index="${idx}">
          <img src="${imgUrl}" alt="${product.name} Angle ${idx + 1}">
        </button>
      `).join('');
    } else {
      galleryThumbsContainer.style.display = "none";
    }
  }

  // Render Lightbox Thumbnails
  if (lbThumbsContainer) {
    if (galleryImages.length > 1) {
      lbThumbsContainer.style.display = "flex";
      lbThumbsContainer.innerHTML = galleryImages.map((imgUrl, idx) => `
        <button class="lb-thumb ${idx === 0 ? 'active' : ''}" data-index="${idx}">
          <img src="${imgUrl}" alt="LB Angle ${idx + 1}">
        </button>
      `).join('');
    } else {
      lbThumbsContainer.style.display = "none";
    }
  }

  // Hide side arrows on main image if product has only 1 image
  const galleryPrev = document.getElementById("gallery-prev");
  const galleryNext = document.getElementById("gallery-next");
  const lbPrev = document.getElementById("lb-prev");
  const lbNext = document.getElementById("lb-next");

  if (galleryImages.length <= 1) {
    if (galleryPrev) galleryPrev.style.display = "none";
    if (galleryNext) galleryNext.style.display = "none";
    if (lbPrev) lbPrev.style.display = "none";
    if (lbNext) lbNext.style.display = "none";
  } else {
    if (galleryPrev) galleryPrev.style.display = "flex";
    if (galleryNext) galleryNext.style.display = "flex";
    if (lbPrev) lbPrev.style.display = "flex";
    if (lbNext) lbNext.style.display = "flex";
  }

  // 5. Update Active Gallery Image Function
  function updateGallery(index) {
    currentIndex = index;
    if (mainImage) mainImage.src = galleryImages[currentIndex];
    if (lbMainImg) lbMainImg.src = galleryImages[currentIndex];

    document.querySelectorAll(".thumb-btn").forEach((thumb, idx) => {
      thumb.classList.toggle("active", idx === currentIndex);
    });

    document.querySelectorAll(".lb-thumb").forEach((thumb, idx) => {
      thumb.classList.toggle("active", idx === currentIndex);
    });
  }

  // Thumbnail Click Handlers
  document.querySelectorAll(".thumb-btn").forEach((thumb, idx) => {
    thumb.addEventListener("click", () => updateGallery(idx));
  });

  document.querySelectorAll(".lb-thumb").forEach((thumb, idx) => {
    thumb.addEventListener("click", () => updateGallery(idx));
  });

  // Main Gallery Navigation Arrows
  if (galleryPrev) {
    galleryPrev.addEventListener("click", (e) => {
      e.stopPropagation();
      const prevIdx = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      updateGallery(prevIdx);
    });
  }

  if (galleryNext) {
    galleryNext.addEventListener("click", (e) => {
      e.stopPropagation();
      const nextIdx = (currentIndex + 1) % galleryImages.length;
      updateGallery(nextIdx);
    });
  }

  // 6. Lightbox Controls
  const mainImageWrap = document.getElementById("main-image-wrap");
  const lightbox = document.getElementById("lightbox");
  const lbClose = document.getElementById("lb-close");

  if (mainImageWrap && lightbox) {
    mainImageWrap.addEventListener("click", (e) => {
      // Don't trigger lightbox if user clicked side arrows
      if (e.target.closest(".gallery-arrow")) return;
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
      updateGallery(currentIndex);
    });
  }

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove("open");
      document.body.style.overflow = "";
    }
  }

  if (lbClose) lbClose.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  if (lbPrev) {
    lbPrev.addEventListener("click", (e) => {
      e.stopPropagation();
      const prevIdx = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      updateGallery(prevIdx);
    });
  }

  if (lbNext) {
    lbNext.addEventListener("click", (e) => {
      e.stopPropagation();
      const nextIdx = (currentIndex + 1) % galleryImages.length;
      updateGallery(nextIdx);
    });
  }

  // Keyboard navigation for lightbox
  document.addEventListener("keydown", (e) => {
    if (!lightbox || !lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft" && lbPrev) lbPrev.click();
    if (e.key === "ArrowRight" && lbNext) lbNext.click();
  });

  // 7. Touch Swipe Gesture Support for Mobile
  let touchStartX = 0;
  let touchEndX = 0;

  if (mainImageWrap && galleryImages.length > 1) {
    mainImageWrap.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    mainImageWrap.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 35) {
        if (diff < 0) {
          // Swipe Left -> Next
          updateGallery((currentIndex + 1) % galleryImages.length);
        } else {
          // Swipe Right -> Prev
          updateGallery((currentIndex - 1 + galleryImages.length) % galleryImages.length);
        }
      }
    }, { passive: true });
  }

  // 8. Quantity Control
  const qtyMinus = document.getElementById("qty-minus");
  const qtyPlus = document.getElementById("qty-plus");
  const qtyInput = document.getElementById("qty-input");

  if (qtyMinus && qtyPlus && qtyInput) {
    qtyMinus.addEventListener("click", () => {
      if (currentQty > 1) {
        currentQty--;
        qtyInput.value = currentQty;
      }
    });

    qtyPlus.addEventListener("click", () => {
      currentQty++;
      qtyInput.value = currentQty;
    });

    qtyInput.addEventListener("change", () => {
      const val = parseInt(qtyInput.value);
      currentQty = isNaN(val) || val < 1 ? 1 : val;
      qtyInput.value = currentQty;
    });
  }

  // 9. Add to Cart Action
  const btnAddToCart = document.getElementById("btn-add-to-cart");
  if (btnAddToCart) {
    btnAddToCart.addEventListener("click", () => {
      Cart.addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        img: galleryImages[0],
        size: selectedSize,
        color: selectedColor
      }, currentQty);
    });
  }

  // Init gallery view
  updateGallery(0);

  // Render "You Might Also Like" related products (exclude current, max 4)
  renderGrid("All", { excludeId: product.id, limit: 4 });
});
