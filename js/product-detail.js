/* ============================================================
   BETHELS SHOE GALLERY — Product Detail Dynamic Page Logic
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  // Get product ID from URL query param (e.g. product-detail.html?id=2)
  const params = new URLSearchParams(window.location.search);
  const productId = parseInt(params.get("id")) || 1;
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];

  // Gallery Images setup specifically for the clicked product
  const galleryImages = (product.galleryImages && product.galleryImages.length > 0)
    ? product.galleryImages
    : [product.img || "assets/images/shoe1_1.jpg"];

  let currentIndex = 0;
  let currentQty = 1;
  let selectedSize = product.sizes ? product.sizes[0] : 42;
  let selectedColor = product.colors ? product.colors[0] : "#F5F0E8";

  // 1. Populate Product Text & Details
  const brandEl = document.getElementById("p-brand");
  const titleEl = document.getElementById("p-title");
  const descEl = document.getElementById("p-desc");
  const priceEl = document.getElementById("p-price");
  const oldPriceEl = document.getElementById("p-old-price");
  const badgeEl = document.getElementById("p-badge");

  if (brandEl) brandEl.textContent = (product.brand || "BETHELS GALLERY").toUpperCase();
  if (titleEl) titleEl.textContent = product.name;
  if (descEl) descEl.textContent = product.desc || `Experience unmatched style and comfort with our premium ${product.name}. Handcrafted with high-quality materials for everyday elegance.`;

  function formatNaira(amount) {
    return "₦" + Number(amount).toLocaleString("en-NG");
  }

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

  // Set page title & breadcrumb
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

  // 4. Dynamically Render Gallery Elements for Desktop, Mobile & Lightbox
  const mainImage = document.getElementById("main-image");
  const desktopThumbsContainer = document.getElementById("desktop-thumbs");
  const mobileTrackContainer = document.getElementById("mobile-gallery-track");
  const mobileThumbsContainer = document.getElementById("mobile-thumbs-strip");
  const lightboxThumbsContainer = document.querySelector(".lightbox-thumbs");
  const lbMainImg = document.getElementById("lb-main-image");

  // Render Desktop Thumbnails
  if (desktopThumbsContainer) {
    desktopThumbsContainer.innerHTML = galleryImages.map((imgUrl, idx) => `
      <button class="thumb-btn ${idx === 0 ? 'active' : ''}" data-index="${idx}">
        <img src="${imgUrl}" alt="${product.name} View ${idx + 1}">
      </button>
    `).join('');
  }

  // Render Mobile Slider Track
  if (mobileTrackContainer) {
    mobileTrackContainer.innerHTML = galleryImages.map((imgUrl, idx) => `
      <div class="mobile-gallery-slide"><img src="${imgUrl}" alt="${product.name} View ${idx + 1}"></div>
    `).join('');
  }

  // Render Mobile Thumbnails Strip
  if (mobileThumbsContainer) {
    mobileThumbsContainer.innerHTML = galleryImages.map((imgUrl, idx) => `
      <button class="mobile-thumb-item ${idx === 0 ? 'active' : ''}" data-index="${idx}">
        <img src="${imgUrl}" alt="Thumb ${idx + 1}">
      </button>
    `).join('');
  }

  // Render Lightbox Thumbnails
  if (lightboxThumbsContainer) {
    lightboxThumbsContainer.innerHTML = galleryImages.map((imgUrl, idx) => `
      <button class="lb-thumb ${idx === 0 ? 'active' : ''}" data-index="${idx}">
        <img src="${imgUrl}" alt="LB Thumb ${idx + 1}">
      </button>
    `).join('');
  }

  // 5. Update Gallery State Function
  function updateGallery(index) {
    currentIndex = index;
    if (mainImage) mainImage.src = galleryImages[currentIndex];
    if (lbMainImg) lbMainImg.src = galleryImages[currentIndex];

    // Update Desktop Thumbs
    document.querySelectorAll("#desktop-thumbs .thumb-btn").forEach((thumb, idx) => {
      thumb.classList.toggle("active", idx === currentIndex);
    });

    // Update Mobile Thumbs
    document.querySelectorAll("#mobile-thumbs-strip .mobile-thumb-item").forEach((thumb, idx) => {
      thumb.classList.toggle("active", idx === currentIndex);
    });

    // Update Lightbox Thumbs
    document.querySelectorAll(".lb-thumb").forEach((thumb, idx) => {
      thumb.classList.toggle("active", idx === currentIndex);
    });

    // Update Mobile Track Transform
    if (mobileTrackContainer) {
      mobileTrackContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }

  // Attach Event Listeners to newly rendered thumbs
  document.querySelectorAll("#desktop-thumbs .thumb-btn").forEach((thumb, idx) => {
    thumb.addEventListener("click", () => updateGallery(idx));
  });

  document.querySelectorAll("#mobile-thumbs-strip .mobile-thumb-item").forEach((thumb, idx) => {
    thumb.addEventListener("click", () => updateGallery(idx));
  });

  document.querySelectorAll(".lb-thumb").forEach((thumb, idx) => {
    thumb.addEventListener("click", () => updateGallery(idx));
  });

  // Init default gallery view
  updateGallery(0);

  // 6. Lightbox Functionality
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

  // Keyboard navigation for lightbox
  document.addEventListener("keydown", (e) => {
    if (!lightbox || !lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") lbPrev ? lbPrev.click() : null;
    if (e.key === "ArrowRight") lbNext ? lbNext.click() : null;
  });

  // 7. Mobile Gallery Arrow & Touch Swipe Navigation
  const mobilePrev = document.getElementById("mobile-prev");
  const mobileNext = document.getElementById("mobile-next");
  const mobileTrackWrap = document.querySelector(".mobile-gallery-track-wrap");

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

  // Touch Swipe Gesture Handling
  let touchStartX = 0;
  let touchEndX = 0;

  if (mobileTrackWrap) {
    mobileTrackWrap.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    mobileTrackWrap.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 35) {
        if (diff < 0) {
          // Swipe Left -> Next Image
          const nextIdx = (currentIndex + 1) % galleryImages.length;
          updateGallery(nextIdx);
        } else {
          // Swipe Right -> Previous Image
          const prevIdx = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
          updateGallery(prevIdx);
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
});
