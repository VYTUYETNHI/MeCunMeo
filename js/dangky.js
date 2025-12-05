document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.register-form');
    const username = document.getElementById('username');
    const email = document.getElementById('username'); 
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const terms = document.getElementById('terms');

    // --- HÀM HIỂN THỊ LỖI ---
    function showError(input, message) {
        const inputGroup = input.parentElement;
        let errorDisplay = inputGroup.querySelector('.form-message');

        // Nếu chưa có thẻ thông báo lỗi thì tạo mới
        if (!errorDisplay) {
            errorDisplay = document.createElement('small');
            errorDisplay.className = 'form-message';
            inputGroup.appendChild(errorDisplay);
        }

        errorDisplay.innerText = message;
        input.className = 'error'; // Thêm class error để CSS đổi màu viền
    }

    // --- HÀM XỬ LÝ KHI THÀNH CÔNG ---
    function showSuccess(input) {
        const inputGroup = input.parentElement;
        const errorDisplay = inputGroup.querySelector('.form-message');

        // Xóa thông báo lỗi nếu có
        if (errorDisplay) {
            errorDisplay.innerText = '';
        }
        input.className = 'success'; // Thêm class success (viền xanh)
    }

    // --- CÁC HÀM KIỂM TRA CHI TIẾT ---

    // 1. Kiểm tra Tài khoản
    function checkUsername() {
        const value = username.value.trim();
        if (value === '') {
            showError(username, 'Vui lòng nhập tên tài khoản.');
            return false;
        } else if (value.length < 3) {
            showError(username, 'Tên tài khoản phải có ít nhất 3 ký tự.');
            return false;
        } else {
            showSuccess(username);
            return true;
        }
    }

    // 2. Kiểm tra Mật khẩu (Yêu cầu: 8 ký tự, có chữ hoa, có số)
    function checkPassword() {
        const value = password.value.trim();
        // Regex: Ít nhất 8 ký tự, 1 chữ hoa, 1 số
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (value === '') {
            showError(password, 'Vui lòng nhập mật khẩu.');
            return false;
        } else if (!passwordRegex.test(value)) {
            showError(password, 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa và số.');
            return false;
        } else {
            showSuccess(password);
            return true;
        }
    }

    // 3. Kiểm tra Xác nhận mật khẩu
    function checkConfirmPassword() {
        const value = confirmPassword.value.trim();
        const passwordValue = password.value.trim();

        if (value === '') {
            showError(confirmPassword, 'Vui lòng xác nhận lại mật khẩu.');
            return false;
        } else if (value !== passwordValue) {
            showError(confirmPassword, 'Mật khẩu nhập lại không khớp.');
            return false;
        } else {
            showSuccess(confirmPassword);
            return true;
        }
    }

    // 4. Kiểm tra Điều khoản
    function checkTerms() {
        if (!terms.checked) {
            const termsGroup = terms.parentElement;
            let errorDisplay = termsGroup.querySelector('.form-message');
            if (!errorDisplay) {
                errorDisplay = document.createElement('small');
                errorDisplay.className = 'form-message';
                termsGroup.appendChild(errorDisplay);
            }
            errorDisplay.innerText = 'Bạn phải đồng ý với điều khoản sử dụng.';
            return false;
        } else {
            const termsGroup = terms.parentElement;
            const errorDisplay = termsGroup.querySelector('.form-message');
            if (errorDisplay) errorDisplay.innerText = '';
            return true;
        }
    }

    // --- SỰ KIỆN KHI SUBMIT FORM ---
    form.addEventListener('submit', function (e) {
        e.preventDefault(); 

        // Chạy tất cả các hàm kiểm tra
        const isUsernameValid = checkUsername();
        const isPasswordValid = checkPassword();
        const isConfirmValid = checkConfirmPassword();
        const isTermsValid = checkTerms();

        // Nếu tất cả đều đúng
        if (isUsernameValid && isPasswordValid && isConfirmValid && isTermsValid) {
            alert('Đăng ký thành công! Đang chuyển hướng...');
            window.location.href = 'taikhoan.html';
        }
    });

    username.addEventListener('input', checkUsername);
    password.addEventListener('input', checkPassword);
    confirmPassword.addEventListener('input', checkConfirmPassword);
    terms.addEventListener('change', checkTerms);
});

// Hàm bật tắt hiển thị mật khẩu
function togglePassword(inputId, iconSpan) {
    const input = document.getElementById(inputId);
    const icon = iconSpan.querySelector('i');

    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash'); 
    } else {
        input.type = "password";
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}