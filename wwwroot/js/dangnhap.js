document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.register-form');
    const username = document.getElementById('username');
    const password = document.getElementById('password');
//hàm hiển thị lỗi nhập liệu
    function showError(input, message) {
        const inputGroup = input.parentElement;
        let errorDisplay = inputGroup.querySelector('.form-message');

        if (!errorDisplay) {
            errorDisplay = document.createElement('small');
            errorDisplay.className = 'form-message';
            inputGroup.appendChild(errorDisplay);
        }

        errorDisplay.innerText = message;
        input.classList.add('error');
        input.classList.remove('success');
    }

    // --- HÀM XỬ LÝ KHI THÀNH CÔNG ---
    function showSuccess(input) {
        const inputGroup = input.parentElement;
        const errorDisplay = inputGroup.querySelector('.form-message');

        // Xóa thông báo lỗi nếu có
        if (errorDisplay) {
            errorDisplay.innerText = '';
        }
        input.classList.remove('error');
        input.classList.add('success');
    }

    // --- KIỂM TRA TÀI KHOẢN ---
    function checkUsername() {
        const value = username.value.trim();
        if (value === '') {
            showError(username, 'Vui lòng nhập tên tài khoản.');
            return false;
        } else {
            showSuccess(username);
            return true;
        }
    }

    // --- KIỂM TRA MẬT KHẨU ---
    function checkPassword() {
        const value = password.value.trim();
        if (value === '') {
            showError(password, 'Vui lòng nhập mật khẩu.');
            return false;
        } else {
            showSuccess(password);
            return true;
        }
    }

    // --- SỰ KIỆN KHI BẤM NÚT ĐĂNG NHẬP ---
    form.addEventListener('submit', function (e) {
        e.preventDefault(); 

        const isUsernameValid = checkUsername();
        const isPasswordValid = checkPassword();

        if (isUsernameValid && isPasswordValid) {
            
            if(username.value === 'admin' && password.value === '123456') {
                alert('Đăng nhập thành công! Xin chào Admin.');
                window.location.href = 'index.html'; 
            } else {
                alert('Đăng nhập thành công (Demo)! Đang chuyển hướng...');
                window.location.href = 'index.html';
            }
        }
    });

    username.addEventListener('input', function() {
        if(username.value.trim() !== '') showSuccess(username);
    });
    
    password.addEventListener('input', function() {
        if(password.value.trim() !== '') showSuccess(password);
    });
});

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