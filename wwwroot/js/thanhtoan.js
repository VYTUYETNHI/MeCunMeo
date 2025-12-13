document.addEventListener('DOMContentLoaded', function() {
    
    // --- giả lập địa chỉ ---
    const addressData = {
        "hcm": {
            name: "TP. Hồ Chí Minh",
            districts: {
                "Quận 1": ["Phường Bến Nghé", "Phường Bến Thành", "Phường Đa Kao"],
                "Quận 3": ["Phường Võ Thị Sáu", "Phường 5", "Phường 6"],
                "TP. Thủ Đức": ["Phường Linh Trung", "Phường Linh Chiểu"]
            }
        },
        "hn": {
            name: "Hà Nội",
            districts: {
                "Hà Tây": ["Phường Hàng Bài", "Phường Tràng Tiền"],
                "Ba Đình": ["Phường Dịch Vọng", "Phường Yên Hòa"]
            }
        }
    };

    const citySel = document.getElementById('city');
    const distSel = document.getElementById('district');
    const wardSel = document.getElementById('ward');

    // Load Quận/Huyện khi chọn Tỉnh
    citySel.addEventListener('change', function() {
        distSel.innerHTML = '<option value="">Chọn Quận/Huyện</option>';
        wardSel.innerHTML = '<option value="">Chọn Phường/Xã</option>';
        
        const cityCode = this.value;
        if(cityCode && addressData[cityCode]) {
            const districts = addressData[cityCode].districts;
            for (let key in districts) {
                // Tạo option quận (ở đây mình lấy key làm tên quận cho nhanh demo)
                let name = (key === 'q1') ? "Quận 1" : (key === 'q3' ? "Quận 3" : key); 
                distSel.innerHTML += `<option value="${key}">${name}</option>`;
            }
        }
    });

    // Load Phường/Xã khi chọn Quận
    distSel.addEventListener('change', function() {
        wardSel.innerHTML = '<option value="">Chọn Phường/Xã</option>';
        const cityCode = citySel.value;
        const distCode = this.value;
        
        if(cityCode && distCode) {
            const wards = addressData[cityCode].districts[distCode];
            wards.forEach(ward => {
                wardSel.innerHTML += `<option value="${ward}">${ward}</option>`;
            });
        }
    });


    // --- tính tiền ---
    
    // Giả lập tổng tiền hàng 300k 
    let subTotal = 300000; 
    const shippingRadios = document.querySelectorAll('input[name="shipping"]');
    const shippingDisplay = document.getElementById('shipping-fee');
    const finalTotalDisplay = document.getElementById('final-total');

    function calculateTotal() {
        // Lấy giá ship đang chọn
        const selectedShip = document.querySelector('input[name="shipping"]:checked');
        const shipPrice = parseInt(selectedShip.value);
        
        // Cập nhật hiển thị
        shippingDisplay.innerText = shipPrice.toLocaleString('vi-VN') + 'đ';
        finalTotalDisplay.innerText = (subTotal + shipPrice).toLocaleString('vi-VN') + 'đ';
    }

    // đổi phương thức vận chuyển 
    shippingRadios.forEach(radio => {
        radio.addEventListener('change', calculateTotal);
    });

    // Chạy lần đầu
    calculateTotal();


    // --- xử lý đặt hàng ---
    
    const btnOrder = document.querySelector('.btn-checkout-effect'); // Nút Đặt hàng ngay
    
    btnOrder.addEventListener('click', function(e) {
        e.preventDefault(); // Chặn load lại trang

        // kiểm tra nhập liệu thông tin giao hàng 
        const name = document.getElementById('fullName').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const address = document.getElementById('address').value.trim();
        const city = citySel.value;

        if(!name || !phone || !address || !city) {
            alert("Vui lòng điền đầy đủ thông tin giao hàng!");
            return;
        }

        // kiểm tra phương thức thanh toán 
        const paymentMethod = document.querySelector('input[name="payment"]:checked').id;
        
        if (paymentMethod === 'paymentCOD') {
            // cod 
            showSuccessModal();
        } 
        else if (paymentMethod === 'paymentMomo') {
            // momo 
            showSuccessModal();
        } 
        else if (paymentMethod === 'paymentBank') {
            // chuyển khoản hiện QR code 
            var myModal = new bootstrap.Modal(document.getElementById('qrModal'));
            myModal.show();
        }
    });

});

// hiển thị modal thành công 
function showSuccessModal() {
    var myModal = new bootstrap.Modal(document.getElementById('successModal'));
    myModal.show();
    
}

// bấm chuyển khoản xong 
function finishOrder() {
    // Tắt modal QR
    const qrModalEl = document.getElementById('qrModal');
    const modal = bootstrap.Modal.getInstance(qrModalEl);
    modal.hide();

    // Hiện modal thành công
    setTimeout(() => {
        showSuccessModal();
    }, 500);
}