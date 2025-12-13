using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MeCunMeo.Data; // DB Context của bạn
using MeCunMeo.ViewModels;
using System.Security.Claims;

namespace MeCunMeo.ViewComponents
{
    public class HeaderViewComponent : ViewComponent
    {
        private readonly ApplicationDbContext _context;

        public HeaderViewComponent(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            var model = new HeaderViewModel();

            // 1. Lấy danh mục từ DB (Ví dụ Type = 1 là Chó, 2 là Mèo)
            var allCategories = await _context.Categories.Where(c => c.IsActive).ToListAsync();
            model.CategoriesDog = allCategories.Where(c => c.Type == "Dog").ToList();
            model.CategoriesCat = allCategories.Where(c => c.Type == "Cat").ToList();

            // 2. Lấy Top sản phẩm bán chạy cho Search Overlay
            model.TopSellingProducts = await _context.Products
                .OrderByDescending(p => p.SoldQuantity)
                .Take(3)
                .ToListAsync();

            // 3. Xử lý User và Giỏ hàng
            if (User.Identity.IsAuthenticated)
            {
                model.IsLoggedIn = true;
                model.UserName = User.Identity.Name;
                
                // Lấy User ID
                var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

                // Đếm số lượng trong giỏ hàng từ DB
                model.CartItemCount = await _context.CartItems
                    .Where(c => c.UserId == userId)
                    .SumAsync(c => c.Quantity);
            }
            else
            {
                model.IsLoggedIn = false;
                model.CartItemCount = 0;
            }

            return View(model); // Trả về Default.cshtml
        }
    }
}