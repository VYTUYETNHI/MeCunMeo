
//CHÂU 

using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; // Nhớ dòng này
using MeCunMeo.Models;
using MeCunMeo.Data;

namespace MeCunMeo.Controllers
{
public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly ApplicationDbContext _context; // Thêm biến context

    public HomeController(ILogger<HomeController> logger, ApplicationDbContext context)
    {
        _logger = logger;
        _context = context; // Gán context
    }

    public async Task<IActionResult> Index()
    {
        // Lấy 8 sản phẩm bán chạy nhất hoặc mới nhất để hiện ở trang chủ
        var products = await _context.Products
                                     .OrderByDescending(p => p.SoldQuantity)
                                     .Take(8)
                                     .ToListAsync();
        
        return View(products); // Truyền list sản phẩm sang View
    }
}
    // ... các action khác giữ nguyên
}