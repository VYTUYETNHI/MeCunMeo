//VY

using System.ComponentModel.DataAnnotations;

namespace MeCunMeo.ViewModels
{
    public class ProfileVM
    {
        public string Username { get; set; } // Tên đăng nhập (thường không cho sửa)

        public string Email { get; set; } // Email (thường chỉ hiển thị)

        [Required(ErrorMessage = "Vui lòng nhập họ tên")]
        public string FullName { get; set; }

        public string? PhoneNumber { get; set; }

        public string? Address { get; set; }
    }
}
