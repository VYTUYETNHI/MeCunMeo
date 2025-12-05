document.addEventListener("DOMContentLoaded", function () {
    const itemsPerPage = 8; // số bài trên mỗi trang
    const pages = document.querySelectorAll(".row > .col"); // tất cả bài
    const pageLinks = document.querySelectorAll(".page-num"); // các nút số trang
    const btnNext = document.querySelector(".btn-next");

    let currentPage = 1;
    const totalPages = pageLinks.length;

    // Hàm hiển thị trang
    function showPage(page) {
        currentPage = page;

        pages.forEach((item, index) => {
            if (page === 1) {
                // trang 1: bài 1-8
                if (index < 8) item.classList.remove("d-none");
                else item.classList.add("d-none");
            } else if (page === 2) {
                // trang 2: bài 9-12
                if (index >= 8 && index < 12) item.classList.remove("d-none");
                else item.classList.add("d-none");
            }
        });

        // cập nhật active cho nút số trang
        pageLinks.forEach(link => link.classList.remove("active"));
        pageLinks[page - 1].classList.add("active");
    }

    // Click số trang
    pageLinks.forEach((link, idx) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            showPage(idx + 1);
        });
    });

    // Click TIẾP THEO
    btnNext.addEventListener("click", function (e) {
        e.preventDefault();
        let nextPage = currentPage + 1;
        if (nextPage > totalPages) nextPage = 1; // quay lại trang 1
        showPage(nextPage);
    });

    // hiển thị trang đầu tiên khi load
    showPage(1);
});
