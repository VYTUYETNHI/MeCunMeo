using MeCunMeo.Models; // Namespace chứa các Entity của bạn

namespace MeCunMeo.ViewModels
{
    public class HeaderViewModel
    {
        public List<Category> CategoriesDog { get; set; } // Danh mục cho Cún
        public List<Category> CategoriesCat { get; set; } // Danh mục cho Mèo
        public List<Product> TopSellingProducts { get; set; } // Cho phần Search Overlay
        public int CartItemCount { get; set; } // Số lượng trong giỏ
        public bool IsLoggedIn { get; set; } // Trạng thái đăng nhập
        public string UserName { get; set; } // Tên hiển thị
        public string AvatarUrl { get; set; } // Avatar nếu có
    }
}