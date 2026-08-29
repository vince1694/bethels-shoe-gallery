/* ============================================================
   BETHELS SHOE GALLERY — Product Detail Page Logic
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  // Get product ID from URL query param, default to 1 (Fall Limited Edition Sneakers / Classic Low-Top)
  const params = new URLSearchParams(window.location.search);
  const productId = parseInt(params.get("id")) || 1;
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];

  // Gallery Images setup for product detail
  const galleryImages = [
    product.img || "assets/images/shoe1_1.jpg",
    "assets/images/shoe2_1.jpg",
    "assets/images/shoe3_1.jpg",
    "assets/images/shoe4_1.jpg"
  ];

  let currentIndex = 0;
  let currentQty = 1;
  let selectedSize = product.sizes ? product.sizes[2] || product.sizes[0] : 42;
  let selectedColor = product.colors ? product.colors[0] : "#F5F0E8";

  // Populate Product Metadata
  const brandEl = document.getElementById("p-brand");
  const titleEl = document.getElementById("p-title");
  const descEl = document.getElementById("p-desc");
  const priceEl = document.getElementById("p-price");
  const oldPriceEl = document.getElementById("p-old-price");
  const badgeEl = document.getElementById("p-badge");

  if (brandEl) brandEl.textContent = (product.brand || "SNEAKER COMPANY").toUpperCase();
  if (titleEl) titleEl.textContent = product.name === "Classic Low-Top Sneakers" ? "Fall Limited Edition Sneakers" : product.name;
  if (descEl && product.name === "Classic Low-Top Sneakers") {
    descEl.textContent = "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.";
  } else if (descEl) {
    descEl.textContent = `Experience unmatched style and comfort with our premium ${product.name}. Handcrafted with high-quality materials and modern engineering for everyday elegance.`;
  }

  if (priceEl) priceEl.textContent = `$${product.price.toFixed(2)}`;
  if (oldPriceEl) {
    if (product.oldPrice) {
      oldPriceEl.textContent = `$${product.oldPrice.toFixed(2)}`;
      oldPriceEl.style.display = "inline";
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

  // Set page title
  document.title = `${product.name} — Bethels Shoe Gallery`;
  const bcCurrent = document.getElementById("bc-current");
  if (bcCurrent) bcCurrent.textContent = product.name;

  // Render Size Buttons
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

  // Render Color Options
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

  // Gallery Elements
  const mainImage = document.getElementById("main-image");
  const desktopThumbs = document.querySelectorAll("#desktop-thumbs .thumb-btn");
  const mobileThumbs = document.querySelectorAll("#mobile-thumbs-strip .mobile-thumb-item");

  function updateGallery(index) {
    currentIndex = index;
    if (mainImage) mainImage.src = galleryImages[currentIndex];

    // Update Desktop Thumbs
    desktopThumbs.forEach((thumb, idx) => {
      thumb.classList.toggle("active", idx === currentIndex);
    });

    // Update Mobile Thumbs
    mobileThumbs.forEach((thumb, idx) => {
      thumb.classList.toggle("active", idx === currentIndex);
    });

    // Update Lightbox Image & Thumbs
    const lbMainImg = document.getElementById("lb-main-image");
    if (lbMainImg) lbMainImg.src = galleryImages[currentIndex];
    
    document.querySelectorAll(".lb-thumb").forEach((thumb, idx) => {
      thumb.classList.toggle("active", idx === currentIndex);
    });

    // Update Mobile Carousel Track
    const mobileTrack = document.getElementById("mobile-gallery-track");
    if (mobileTrack) {
      mobileTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }

  desktopThumbs.forEach((thumb, idx) => {
    thumb.addEventListener("click", () => updateGallery(idx));
  });

  mobileThumbs.forEach((thumb, idx) => {
    thumb.addEventListener("click", () => updateGallery(idx));
  });

  // Lightbox Functionality
  const mainImageWrap = document.getElementById("main-image-wrap");
  const lightbox = document.getElementById("lightbox");
  const lbClose = document.getElementById("lb-close");
  const lbPrev = document.getElementById("lb-prev");
  const lbNext = document.getElementById("lb-next");

  if (mainImageWrap && lightbox) {
    mainImageWrap.addEventListener("click", () => {
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
    lbPrev.addEventListener("click", () => {
      const nextIdx = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      updateGallery(nextIdx);
    });
  }

  if (lbNext) {
    lbNext.addEventListener("click", () => {
      const nextIdx = (currentIndex + 1) % galleryImages.length;
      updateGallery(nextIdx);
    });
  }

  // Lightbox Thumbs
  document.querySelectorAll(".lb-thumb").forEach((thumb, idx) => {
    thumb.addEventListener("click", () => updateGallery(idx));
  });

  // Keyboard navigation for lightbox
  document.addEventListener("keydown", (e) => {
    if (!lightbox || !lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") lbPrev.click();
    if (e.key === "ArrowRight") lbNext.click();
  });

  // Mobile Gallery Navigation
  const mobilePrev = document.getElementById("mobile-prev");
  const mobileNext = document.getElementById("mobile-next");

  if (mobilePrev) {
    mobilePrev.addEventListener("click", () => {
      const nextIdx = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      updateGallery(nextIdx);
    });
  }

  if (mobileNext) {
    mobileNext.addEventListener("click", () => {
      const nextIdx = (currentIndex + 1) % galleryImages.length;
      updateGallery(nextIdx);
    });
  }

  // Quantity Control
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

  // Add to Cart Action
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
});
