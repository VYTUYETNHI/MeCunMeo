document.addEventListener("DOMContentLoaded", function () {
  // Lấy productId từ URL params nếu có (để sync với trang list)
  const urlParams = new URLSearchParams(window.location.search);
  let productIdFromUrl = urlParams.get("id");
  const productContainer = document.querySelector(".row.g-5");
  if (productIdFromUrl && productContainer) {
    productContainer.dataset.productId = productIdFromUrl;
  }

  // Cập nhật badge giỏ hàng
  function updateCartBadge() {
    const badge = document.querySelector(".badge-cart");
    if (!badge) return;
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = total;
    badge.style.display = total > 0 ? "block" : "none";
  }

  // ==================== THÊM VÀO GIỎ HÀNG ====================
  function addToCart(event) {
    // Thêm event param để nhất quán, dù không dùng
    // Lấy ID sản phẩm
    const productId = productContainer?.dataset.productId;
    if (!productId) {
      alert("Không tìm thấy ID sản phẩm!");
      return;
    }
    // Phân loại (variant)
    let variant = null;
    const checked = document.querySelector(".btn-check:checked");
    if (checked) {
      const label = checked.nextElementSibling;
      variant = label.textContent.trim();
    } else {
      alert("Vui lòng chọn phân loại sản phẩm!");
      return;
    }
    // Số lượng
    let qty = 1;
    const qtyInput = document.getElementById("qtyInput");
    if (qtyInput) qty = parseInt(qtyInput.value) || 1;
    // LẤY THÔNG TIN SẢN PHẨM
    const titleEl = document.querySelector("h2.fw-bold.mb-3");
    const priceEl = document.getElementById("product-price");
    const originalPriceEl = document.getElementById("original-price");
    const imgEl = document.getElementById("mainImage");
    if (!titleEl || !priceEl || !imgEl) {
      console.error("Không tìm thấy tiêu đề / giá / ảnh sản phẩm");
      return;
    }
    const price = parseInt(priceEl.textContent.replace(/[^0-9]/g, ""), 10);
    const originalPrice = parseInt(
      originalPriceEl.textContent.replace(/[^0-9]/g, ""),
      10
    );
    const product = {
      id: productId,
      title: titleEl.textContent.trim(),
      price: price,
      originalPrice: originalPrice,
      image: imgEl.src,
      variant: variant,
      quantity: qty,
    };
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const exist = cart.find(
      (p) => p.id === product.id && p.variant === product.variant
    );
    if (exist) {
      exist.quantity += qty;
    } else {
      cart.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartBadge();
    alert(
      `${
        product.title
      } (${variant}) × ${qty} đã thêm vào giỏ hàng với giá ${price.toLocaleString(
        "vi-VN"
      )}đ!`
    );
  }

  // ==================== YÊU THÍCH ====================
  function toggleFavorite(event) {
    const button = event.target.closest(".btn-love");
    if (!button) return; // Bảo vệ nếu không tìm thấy button

    const productContainer = button.closest(".row.g-5");
    const productId = productContainer?.dataset.productId;
    if (!productId) {
      console.error("Không tìm thấy productId cho nút yêu thích!");
      alert("Lỗi: Không tìm thấy ID sản phẩm. Vui lòng thử lại.");
      return;
    }

    const titleEl = document.querySelector("h2.fw-bold.mb-3");
    const priceEl = document.getElementById("product-price");
    const imgEl = document.getElementById("mainImage");
    if (!titleEl || !priceEl || !imgEl) {
      console.error("Không tìm thấy thông tin sản phẩm cho yêu thích");
      return;
    }
    const price = parseInt(priceEl.textContent.replace(/[^0-9]/g, ""), 10);
    const product = {
      id: productId,
      title: titleEl.textContent.trim(),
      price: price,
      image: imgEl.src,
    };
    let favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    const index = favs.findIndex((p) => p.id === productId);
    const icon = button.querySelector("i"); // Sửa: Lấy icon từ button cụ thể, không query toàn bộ document
    if (!icon) {
      console.error("Không tìm thấy icon trong nút yêu thích!");
      return;
    }
    if (index > -1) {
      favs.splice(index, 1);
      icon.classList.replace("fas", "far");
      alert("Đã bỏ yêu thích");
    } else {
      favs.push(product);
      icon.classList.replace("far", "fas");
      alert("Đã thêm vào yêu thích");
    }
    localStorage.setItem("favorites", JSON.stringify(favs));
    // Dispatch event để sync real-time nếu multi-tab
    window.dispatchEvent(new Event("storage"));
  }

  // Cập nhật icon yêu thích cho tất cả (dù chỉ 1 ở detail, nhưng tương thích)
  function updateAllFavoriteIcons() {
    const favList = JSON.parse(localStorage.getItem("favorites") || "[]");
    document.querySelectorAll(".btn-love").forEach((button) => {
      const productContainer = button.closest(".row.g-5");
      const productId = productContainer?.dataset.productId;
      const icon = button.querySelector("i");
      if (!icon) return;
      if (productId && favList.some((p) => p.id === productId)) {
        icon.classList.replace("far", "fas");
      } else {
        icon.classList.replace("fas", "far");
      }
    });
  }

  // ==================== GẮN SỰ KIỆN ====================
  const addBtn = document.querySelector(".btn-add-cart");
  const loveBtn = document.querySelector(".btn-love");
  if (addBtn) addBtn.addEventListener("click", addToCart);
  if (loveBtn) loveBtn.addEventListener("click", toggleFavorite);

  // Khởi tạo: Update icons và badge
  updateAllFavoriteIcons();
  updateCartBadge();

  // Listener cho thay đổi localStorage từ tab khác (real-time sync)
  window.addEventListener("storage", updateAllFavoriteIcons);
});

// Các function khác (star rating, submit review, increase/decrease qty, changeImage) giữ nguyên như code bạn cung cấp
// Function to handle star rating selection
function selectStar(event) {
  // ... (giữ nguyên)
}

// Function to handle submit review
function submitReview(event) {
  // ... (giữ nguyên)
}

// Khởi tạo review
document.addEventListener("DOMContentLoaded", () => {
  // ... (giữ nguyên listener cho star và submit, load reviews)
});

// Hàm tăng/giảm số lượng
function increaseQty() {
  // ... (giữ nguyên)
}
function decreaseQty() {
  // ... (giữ nguyên)
}

// Hàm đổi ảnh thumbnail
function changeImage(element) {
  // ... (giữ nguyên)
}
