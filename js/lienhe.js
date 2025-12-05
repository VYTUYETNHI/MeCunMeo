//YÊU CẦU LIÊN HỆ
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const successMsg = document.getElementById('successMessage');
    const errorMsg = document.getElementById('errorMessage');

    // Hàm hiển thị lỗi
    function showError(input, message) {
        const formControl = input.parentElement;
        input.classList.add('is-invalid');
        const feedback = formControl.querySelector('.invalid-feedback');
        if (feedback) feedback.textContent = message;
    }

    // Hàm xóa lỗi
    function showSuccess(input) {
        input.classList.remove('is-invalid');
    }

    // Kiểm tra email hợp lệ
    function isValidEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Xử lý submit form
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let isValid = true;

        // Reset lỗi cũ
        document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
        successMsg.classList.add('d-none');
        errorMsg.classList.add('d-none');

        // 1. Họ và tên
        const fullName = document.getElementById('fullName');
        if (fullName.value.trim().length < 2) {
            showError(fullName, 'Vui lòng nhập họ và tên (tối thiểu 2 ký tự).');
            isValid = false;
        } else {
            showSuccess(fullName);
        }

        // 2. Email
        const email = document.getElementById('email');
        if (email.value.trim() === '') {
            showError(email, 'Vui lòng nhập email.');
            isValid = false;
        } else if (!isValidEmail(email.value.trim())) {
            showError(email, 'Email không đúng định dạng.');
            isValid = false;
        } else {
            showSuccess(email);
        }

        // 3. Lý do liên hệ
        const subject = document.getElementById('subject');
        if (subject.value.trim().length < 5) {
            showError(subject, 'Lý do liên hệ phải từ 5 ký tự trở lên.');
            isValid = false;
        } else {
            showSuccess(subject);
        }

        // 4. Nội dung tin nhắn
        const message = document.getElementById('message');
        const msgLength = message.value.trim().length;
        if (msgLength < 20) {
            showError(message, 'Nội dung phải từ 20 ký tự trở lên để chúng tôi hỗ trợ tốt nhất.');
            isValid = false;
        } else if (msgLength > 1000) {
            showError(message, 'Nội dung không được quá 1000 ký tự.');
            isValid = false;
        } else {
            showSuccess(message);
        }

        // Nếu hợp lệ → hiển thị thông báo thành công
        if (isValid) {
            successMsg.classList.remove('d-none');
            form.reset();

            // Tự động ẩn thông báo sau 7 giây
            setTimeout(() => successMsg.classList.add('d-none'), 7000);

        } else {
            errorMsg.classList.remove('d-none');
        }
    });

    // Xóa lỗi khi người dùng bắt đầu nhập lại
    ['fullName', 'email', 'subject', 'message'].forEach(id => {
        const field = document.getElementById(id);
        if (field) {
            field.addEventListener('input', function () {
                if (this.classList.contains('is-invalid')) {
                    showSuccess(this);
                }
            });
        }
    });
});
// NHẬN TIN & ƯU ĐÃI 
document.addEventListener('DOMContentLoaded', function () {
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterEmail = document.getElementById('newsletterEmail');
    const newsletterSuccess = document.getElementById('newsletterSuccess');

    if (!newsletterForm || !newsletterEmail) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function showError() {
        newsletterEmail.classList.add('is-invalid');
    }

    function clearError() {
        newsletterEmail.classList.remove('is-invalid');
    }

    // 1. Real-time validation khi gõ
    newsletterEmail.addEventListener('input', function () {
        if (this.value.trim() === '') {
            clearError();
        } else if (emailRegex.test(this.value.trim())) {
            clearError();
        } else {
            showError();
        }
    });

    // 2. CHẶN HOÀN TOÀN HTML5 VALIDATION 
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();       // Lớp 1
        e.stopPropagation();      // Lớp 2
        if (e.target.checkValidity) e.target.checkValidity(); // Lớp 3 (không cho browser check)

        const emailValue = newsletterEmail.value.trim();

        if (!emailValue || !emailRegex.test(emailValue)) {
            showError();
            newsletterEmail.focus();
            return false;
        }

        clearError();
        newsletterSuccess.classList.remove('d-none');
        newsletterEmail.value = '';
        setTimeout(() => newsletterSuccess.classList.add('d-none'), 8000);

        return false; 
    });

    // 3. Chặn cả khi người dùng nhấn Enter trong input
    newsletterEmail.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            newsletterForm.dispatchEvent(new Event('submit'));
        }
    });
});