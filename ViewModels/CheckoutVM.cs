
//NHI 
using System.ComponentModel.DataAnnotations;

namespace MeCunMeo.ViewModels
{
    public class CheckoutVM
    {
        // --- Phần 1: Thông tin người mua cần nhập (Form) ---
        public bool GiongThongTinTaiKhoan { get; set; } // Checkbox: "Giống thông tin tài khoản"

        [Required(ErrorMessage = "Vui lòng nhập họ tên")]
        public string FullName { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập địa chỉ nhận hàng")]
        // Địa chỉ cụ thể (Số nhà, đường...)
        public string Address { get; set; }

        // 3 trường này để nhận Tên tỉnh/huyện/xã từ form gửi lên
        public string TinhThanh { get; set; }
        public string QuanHuyen { get; set; }
        public string PhuongXa { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập số điện thoại")]
        [Phone(ErrorMessage = "Số điện thoại không hợp lệ")]
        public string PhoneNumber { get; set; }

        public string? Email { get; set; } // Có thể null nếu không bắt buộc

        public string? Note { get; set; } // Note cho shipper

        // --- Phần 2: Dữ liệu để hiển thị (Chỉ đọc - Lấy từ Cart) ---
        // Bạn cần hiển thị lại xem khách đang mua cái gì ở trang thanh toán
        public List<CartItemVM> CartItems { get; set; } = new List<CartItemVM>();

        public decimal TotalAmount { get; set; }
    }
}