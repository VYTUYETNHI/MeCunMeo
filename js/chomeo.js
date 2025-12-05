// JavaScript for Product Filter, Sorting, Cart, Favorite

// Function to parse price from string (e.g., "180.000đ" -> 180000)
function parsePrice(priceStr) {
  return parseInt(priceStr.replace(/[^0-9]/g, ""), 10);
}

// Function to get rating from star-rating element
function getRating(starElement) {
  let rating = 0;
  starElement.querySelectorAll("i").forEach((icon) => {
    if (icon.classList.contains("fa-star") && icon.classList.contains("fas"))
      rating += 1;
    else if (icon.classList.contains("fa-star-half-alt")) rating += 0.5;
    else if (
      icon.classList.contains("fa-star") &&
      icon.classList.contains("far")
    )
      rating += 0;
  });
  return rating;
}

// Function to get current filters from UI
function getFilters() {
  const search = document
    .querySelector(".search-group input")
    .value.toLowerCase();
  const maxPrice = parseInt(document.getElementById("customRange").value, 10);
  const categories = Array.from(
    document.querySelectorAll("#catCollapse .form-check-input:checked")
  ).map((checkbox) =>
    checkbox.nextElementSibling.textContent.trim().toLowerCase()
  );
  const brands = Array.from(
    document.querySelectorAll("#brandCollapse .form-check-input:checked")
  ).map((checkbox) =>
    checkbox.nextElementSibling.textContent.trim().toLowerCase()
  );
  const sale = document.getElementById("saleCheck").checked;
  return { search, maxPrice, categories, brands, sale };
}

// Function to get current sort from select
function getSort() {
  const select = document.querySelector(".form-select");
  return select.value;
}

// Function to filter products
function filterProducts(products) {
  const { search, maxPrice, categories, brands, sale } = getFilters();
  return products.filter((product) => {
    const title = product
      .querySelector(".product-title")
      .textContent.toLowerCase();
    const price = parsePrice(
      product.querySelector(".price-current").textContent
    );
    const category = product.dataset.category.toLowerCase();
    const brand = product
      .querySelector(".product-brand")
      .textContent.toLowerCase();
    const hasSale = product.querySelector(".discount-badge") !== null;
    return (
      (!search || title.includes(search)) &&
      price <= maxPrice &&
      (categories.length === 0 || categories.includes(category)) &&
      (brands.length === 0 || brands.includes(brand)) &&
      (!sale || hasSale)
    );
  });
}

// Function to sort products based on sort value
function sortProducts(products, sortValue) {
  const sorted = [...products];
  if (sortValue === "1") {
    // Mới nhất: reverse original order
    sorted.sort(
      (a, b) =>
        parseInt(b.closest(".col-6").dataset.originalIndex) -
        parseInt(a.closest(".col-6").dataset.originalIndex)
    );
  } else if (sortValue === "2") {
    // Giá thấp đến cao
    sorted.sort(
      (a, b) =>
        parsePrice(a.querySelector(".price-current").textContent) -
        parsePrice(b.querySelector(".price-current").textContent)
    );
  } else if (sortValue === "3") {
    // Giá cao đến thấp
    sorted.sort(
      (a, b) =>
        parsePrice(b.querySelector(".price-current").textContent) -
        parsePrice(a.querySelector(".price-current").textContent)
    );
  } else if (sortValue === "4") {
    // Đánh giá cao
    sorted.sort(
      (a, b) =>
        getRating(b.querySelector(".star-rating")) -
        getRating(a.querySelector(".star-rating"))
    );
  } else {
    // Default: Độ phổ biến, sort by original index asc
    sorted.sort(
      (a, b) =>
        parseInt(a.closest(".col-6").dataset.originalIndex) -
        parseInt(b.closest(".col-6").dataset.originalIndex)
    );
  }
  return sorted;
}

// Function to apply filters and sort
function applyFiltersAndSort() {
  const row = document.querySelector(".row.g-4");
  const filteredProducts = filterProducts(originalProducts);
  const sortValue = getSort();
  const sortedProducts = sortProducts(filteredProducts, sortValue);
  const nonFilteredCols = allCols.filter(
    (col) => !filteredProducts.includes(col.querySelector(".product-card"))
  );

  // Clear row
  while (row.firstChild) row.removeChild(row.firstChild);

  // Append sorted filtered cols
  sortedProducts.forEach((product) => {
    const col = product.closest(".col-6");
    col.style.display = "";
    row.appendChild(col);
  });

  // Append non-filtered cols with display 'none'
  nonFilteredCols.forEach((col) => {
    col.style.display = "none";
    row.appendChild(col);
  });

  updateURLParams();
}

// Function to update URL params based on filters and sort
function updateURLParams() {
  const { search, maxPrice, categories, brands, sale } = getFilters();
  const sort = getSort();
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (maxPrice !== 500000) params.set("maxPrice", maxPrice);
  if (categories.length > 0) params.set("categories", categories.join(","));
  if (brands.length > 0) params.set("brands", brands.join(","));
  if (sale) params.set("sale", "true");
  if (sort) params.set("sort", sort);
  const newURL = `${window.location.pathname}?${params.toString()}`;
  history.pushState(null, "", newURL);
}

// Function to set filters and sort from URL on load
function setFiltersFromURL() {
  const params = new URLSearchParams(window.location.search);
  const search = params.get("search") || "";
  document.querySelector(".search-group input").value = search;
  const maxPrice = parseInt(params.get("maxPrice"), 10) || 500000;
  document.getElementById("customRange").value = maxPrice;
  updatePriceDisplay(maxPrice);
  const categoriesParam = params.get("categories");
  if (categoriesParam) {
    const cats = categoriesParam.split(",").map((c) => c.trim().toLowerCase());
    document
      .querySelectorAll("#catCollapse .form-check-input")
      .forEach((checkbox) => {
        const label = checkbox.nextElementSibling.textContent
          .trim()
          .toLowerCase();
        checkbox.checked = cats.includes(label);
      });
  }
  const brandsParam = params.get("brands");
  if (brandsParam) {
    const brs = brandsParam.split(",").map((b) => b.trim().toLowerCase());
    document
      .querySelectorAll("#brandCollapse .form-check-input")
      .forEach((checkbox) => {
        const label = checkbox.nextElementSibling.textContent
          .trim()
          .toLowerCase();
        checkbox.checked = brs.includes(label);
      });
  }
  const sale = params.get("sale") === "true";
  document.getElementById("saleCheck").checked = sale;
  const sort = params.get("sort") || "";
  const select = document.querySelector(".form-select");
  select.value = sort;
  if (!select.value) select.selectedIndex = 0;
}

// Function to update the max price display
function updatePriceDisplay(value) {
  const maxSpan = document.querySelector(
    ".d-flex.justify-content-between span:last-child"
  );
  maxSpan.textContent = `${value.toLocaleString("vi-VN")}đ`;
}

let originalProducts;
let allCols;

// ==================== CART ====================
function updateCartBadge() {
  const badge = document.querySelector(".badge-cart");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  badge.textContent = totalItems;
  badge.style.display = totalItems > 0 ? "block" : "none";
}

function addToCart(event) {
  const button = event.target.closest(".btn-add-cart");
  const productContainer = button.closest(".product-card");
  if (!productContainer) return;
  // Variant default (nếu có variants, có thể thêm logic chọn, nhưng ở danh sách giả sử default)
  let variant = productContainer.dataset.variant || null; // Thêm data-variant vào HTML nếu cần
  let quantity = 1; // Default ở danh sách
  const product = {
    id: productContainer.dataset.productId,
    brand: productContainer.querySelector(".product-brand").textContent.trim(),
    title: productContainer.querySelector(".product-title").textContent.trim(),
    price: parsePrice(
      productContainer.querySelector(".price-current").textContent
    ),
    image: productContainer.querySelector("img").src,
    variant: variant,
    quantity: quantity,
  };
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(
    (item) => item.id === product.id && item.variant === product.variant
  );
  if (existing) {
    existing.quantity += product.quantity;
  } else {
    cart.push(product);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
  alert(
    `${product.title}${product.variant ? ` (${product.variant})` : ""} x ${
      product.quantity
    } đã được thêm vào giỏ hàng!`
  );
}

// ==================== FAVORITE ====================
function toggleFavorite(event) {
  const button = event.target.closest(".love-btn");
  const productContainer = button.closest(".product-card");
  if (!productContainer) return;
  const productId = productContainer.dataset.productId;
  const product = {
    id: productId,
    brand: productContainer.querySelector(".product-brand").textContent.trim(),
    title: productContainer.querySelector(".product-title").textContent.trim(),
    price: parsePrice(
      productContainer.querySelector(".price-current").textContent
    ),
    image: productContainer.querySelector("img").src,
  };
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const index = favorites.findIndex((item) => item.id === productId);
  if (index !== -1) {
    favorites.splice(index, 1);
    button.querySelector("i").classList.replace("fas", "far");
    alert(`${product.title} đã được xóa khỏi yêu thích!`);
  } else {
    favorites.push(product);
    button.querySelector("i").classList.replace("far", "fas");
    alert(`${product.title} đã được thêm vào yêu thích!`);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
  // Dispatch event để sync real-time
  window.dispatchEvent(new Event("storage"));
}

function updateAllFavoriteIcons() {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  document.querySelectorAll(".love-btn").forEach((button) => {
    const productId = button.closest(".product-card").dataset.productId;
    if (favorites.some((item) => item.id === productId)) {
      button.querySelector("i").classList.replace("far", "fas");
    } else {
      button.querySelector("i").classList.replace("fas", "far");
    }
  });
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  const row = document.querySelector(".row.g-4");
  allCols = Array.from(row.children);
  originalProducts = allCols.map((col) => col.querySelector(".product-card"));

  // Add data-category based on provided product info (sp1 to sp6)
  // Mapping: sp1 -> "bánh thưởng/snack", sp2 -> "thức ăn khô", sp3 -> "nước hầm xương", sp4 -> "thức ăn khô", sp5 -> "bánh thưởng/snack", sp6 -> "bánh thưởng/snack"
  // These match the lowercase labels from HTML checkboxes
  const categories = [
    "bánh thưởng/snack", // sp1: thức ăn vặt
    "thức ăn khô", // sp2: thức ăn khô
    "nước hầm xương", // sp3: nước hầm xương
    "thức ăn khô", // sp4: thức ăn khô
    "bánh thưởng/snack", // sp5: thức ăn vặt
    "bánh thưởng/snack", // sp6: thức ăn vặt
  ];
  originalProducts.forEach((product, index) => {
    if (index < categories.length) {
      product.dataset.category = categories[index];
    }
  });

  // Add data-original-index
  allCols.forEach((col, index) => {
    col.dataset.originalIndex = index;
  });

  // Add unique data-product-id (thay vì dataset.id; dùng ID thật từ DB nếu có)
  const productContainers = document.querySelectorAll(".product-card");
  productContainers.forEach((container, index) => {
    if (!container.dataset.productId)
      container.dataset.productId = `prod-${index + 1}`;
  });

  // Set filters/sort from URL
  setFiltersFromURL();

  // Apply initial filters/sort
  applyFiltersAndSort();

  // Event listeners for filters/sort
  document
    .querySelector(".search-group input")
    .addEventListener("keyup", applyFiltersAndSort);
  document.getElementById("customRange").addEventListener("input", (e) => {
    updatePriceDisplay(e.target.value);
    applyFiltersAndSort();
  });
  document.querySelectorAll(".form-check-input").forEach((checkbox) => {
    checkbox.addEventListener("change", applyFiltersAndSort);
  });
  document
    .querySelector(".form-select")
    .addEventListener("change", applyFiltersAndSort);

  // Favorite: Update initial icons
  updateAllFavoriteIcons();

  // Add listeners to favorite buttons
  document.querySelectorAll(".love-btn").forEach((button) => {
    button.addEventListener("click", toggleFavorite);
  });

  // Cart: Add listeners to add-cart buttons
  document.querySelectorAll(".btn-add-cart").forEach((button) => {
    button.addEventListener("click", addToCart);
  });

  // Initial badge update
  updateCartBadge();

  // Listener cho thay đổi localStorage từ tab khác (real-time sync favorites)
  window.addEventListener("storage", updateAllFavoriteIcons);
});
