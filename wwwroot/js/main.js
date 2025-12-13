(function ($) {
    "use strict";

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 40) {
            $('.navbar').addClass('sticky-top');
        } else {
            $('.navbar').removeClass('sticky-top');
        }
    });
    
    // Dropdown on mouse hover - dùng CSS hover thay vì click
    $(document).ready(function () {
        function toggleNavbarMethod() {
            // Always ensure Bootstrap dropdown behavior is enabled (click will toggle .show)
            $('.navbar .dropdown-toggle').attr('data-bs-toggle', 'dropdown');
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Product carousel
    $(".product-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 45,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            },
            1200:{
                items:4
            }
        }
    });


    // Team carousel
    $(".team-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 45,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            },
            1200:{
                items:4
            }
        }
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
    });


})(jQuery);

//search overlay

    // 1. Mở tìm kiếm
    function openSearch() {
        const overlay = document.getElementById('full-search-overlay');
        overlay.classList.add('open');
        setTimeout(() => {
            document.getElementById('main-search-input').focus();
        }, 300);
    }

    // 2. Đóng tìm kiếm
    function closeSearch() {
        document.getElementById('full-search-overlay').classList.remove('open');
    }

    // 2. Hàm xử lý khi bấm phím ENTER 
    function searchOnEnter(event) {
        if (event.keyCode === 13 || event.key === 'Enter') {
            var keyword = document.getElementById('main-search-input').value;
            if (keyword.trim() !== "") {
                // Chuyển sang trang timkiem.html kèm từ khóa
                window.location.href = "timkiem.html?keyword=" + encodeURIComponent(keyword);
            } else {
                // Nếu chưa nhập thì chỉ chuyển trang thôi
                window.location.href = "timkiem.html";
            }
        }
    }
