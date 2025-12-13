function parseCurrency(str) {
    return parseInt(str.replace(/[^\d]/g, '')) || 0;
}

function formatCurrency(num) {
    return num.toLocaleString('vi-VN') + 'đ';
}

// Hàm cập nhật giỏ hàng
window.updateCart = function() {
    let totalCart = 0;
    let hasItem = false;
    
    const rows = document.querySelectorAll('.cart-item');
    
    // Nếu xóa hết thì hiện giỏ hàng trống
    if (rows.length === 0) {
        showEmptyCart();
        return;
    }

    rows.forEach(row => {
        const checkbox = row.querySelector('.item-checkbox');
        const priceElement = row.querySelector('.price');
        const qtyInput = row.querySelector('.quantity-input');
        const subtotalElement = row.querySelector('.subtotal');

        const price = parseCurrency(priceElement.innerText);
        const quantity = parseInt(qtyInput.value) || 1;
        
        // Tính thành tiền từng dòng
        const lineTotal = price * quantity;
        subtotalElement.innerText = formatCurrency(lineTotal);

        // Chỉ cộng tổng nếu được tích chọn
        if (checkbox && checkbox.checked) {
            totalCart += lineTotal;
            hasItem = true;
        }
    });

    // Cập nhật hiển thị
    const subTotalEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total');
    
    if(subTotalEl) subTotalEl.innerText = formatCurrency(totalCart);
    if(totalEl) totalEl.innerText = formatCurrency(totalCart);
    
    checkSelectAllStatus();
};

// Hàm xử lý khi bấm nút Áp dụng mã giảm giá
window.applyCoupon = function() {
    const codeInput = document.getElementById('coupon-code');
    const msg = document.getElementById('coupon-message');
    const discountSpan = document.getElementById('discount-amount');
    const subtotalSpan = document.getElementById('cart-subtotal');
    const totalSpan = document.getElementById('cart-total');

    if (!codeInput || !subtotalSpan) return;

    const code = codeInput.value.trim().toUpperCase();
    const subtotal = parseCurrency(subtotalSpan.innerText);

    // Giả lập mã đúng: MECUNMEO
    if (code === 'MECUNMEO') {
        const discount = 20000;
        msg.innerText = "Áp dụng thành công! Giảm 20.000đ";
        msg.style.color = "#768862";
        msg.style.display = "block";
        
        discountSpan.innerText = '-' + formatCurrency(discount);
        totalSpan.innerText = formatCurrency(subtotal - discount);
    } 
    else if (code === '') {
        msg.innerText = "Vui lòng nhập mã giảm giá";
        msg.style.color = "red";
    }
    else {
        msg.innerText = "Mã giảm giá không hợp lệ";
        msg.style.color = "red";
        discountSpan.innerText = '-0đ';
        totalSpan.innerText = formatCurrency(subtotal);
    }
};


function checkSelectAllStatus() {
    const selectAllBtn = document.getElementById('selectAll');
    const allCheckboxes = document.querySelectorAll('.item-checkbox');
    const checkedCount = document.querySelectorAll('.item-checkbox:checked').length;
    
    if(selectAllBtn) {
        selectAllBtn.checked = (allCheckboxes.length > 0 && allCheckboxes.length === checkedCount);
    }
}

function showEmptyCart() {
    const cartBox = document.querySelector('.cart-box');
    
    if(cartBox) {
        cartBox.innerHTML = `
            <div class="text-center py-5">
                <img src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" width="100" class="mb-3 opacity-50">
                <h4 style="color: #563333; font-family: 'Alata', sans-serif;">Giỏ hàng của bạn đang trống!</h4>
                <a href="chocun.html" class="btn btn-success rounded-pill px-4 py-2 mt-2" style="background: #768862; border:none;">
                    Mua sắm ngay
                </a>
            </div>
        `;
    }

    const checkoutBtn = document.querySelector('.col-lg-4 .btn-dark');
    if(checkoutBtn) {
        checkoutBtn.classList.add('disabled');
        checkoutBtn.innerHTML = 'Giỏ hàng trống';
    }
    
    document.getElementById('cart-subtotal').innerText = '0đ';
    document.getElementById('cart-total').innerText = '0đ';
}

document.addEventListener('DOMContentLoaded', function() {
    
    // Gán sự kiện cho nút Chọn tất cả 
    const selectAllBtn = document.getElementById('selectAll');
    if(selectAllBtn) {
        selectAllBtn.addEventListener('change', function() {
            const isChecked = this.checked;
            document.querySelectorAll('.item-checkbox').forEach(checkbox => {
                checkbox.checked = isChecked;
            });
            updateCart();
        });
    }

    // Gán sự kiện cho từng dòng sản phẩm: xóa, đổi số lượng 
    const cartRows = document.querySelectorAll('.cart-item');
    cartRows.forEach(row => {
        const qtyInput = row.querySelector('.quantity-input');
        const deleteBtn = row.querySelector('.fa-trash');
        
        // Thay đổi số lượng
        if(qtyInput) {
            qtyInput.addEventListener('change', function() {
                if (this.value < 1) this.value = 1;
                updateCart();
            });
        }
        
        // Xóa sản phẩm
        if(deleteBtn) {
            deleteBtn.addEventListener('click', function() {
                if(confirm('Bạn có chắc muốn xóa sản phẩm này không?')) {
                    row.remove();
                    updateCart();
                }
            });
        }
    });

    updateCart();
});