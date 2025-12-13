using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace MeCunMeo.Models
{
    public class ApplicationUser : IdentityUser
    {
        // UserId, Email, Password, PhoneNumber đã có sẵn trong IdentityUser
        
        [Display(Name = "Họ và tên")]
        public string? FullName { get; set; }

        [Display(Name = "Địa chỉ")]
        public string? Address { get; set; }

        [Display(Name = "Vai trò")]
        public string? Role { get; set; } // Lưu tên Role (Admin/Customer)
    }
}