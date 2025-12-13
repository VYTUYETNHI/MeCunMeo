
//VY 
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MeCunMeo.Models;
using MeCunMeo.ViewModels;

namespace MeCunMeo.Controllers
{
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AccountController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        // --- ĐĂNG KÝ ---
        [HttpGet]
        public IActionResult Register()
        {
            return View(); // Trả về view khớp với file dangky.html
        }

        [HttpPost]
        public async Task<IActionResult> Register(RegisterVM model)
        {
            if (ModelState.IsValid)
            {
                // Tạo đối tượng ApplicationUser từ dữ liệu nhập
                var user = new ApplicationUser
                {
                    UserName = model.Username,
                    Email = model.Email,
                    // Các trường custom khác nếu có:
                    // FullName = model.FullName 
                };

                // Gọi hàm tạo user của Identity (nó tự mã hóa mật khẩu)
                var result = await _userManager.CreateAsync(user, model.Password);

                if (result.Succeeded)
                {
                    // Đăng nhập luôn sau khi tạo thành công
                    await _signInManager.SignInAsync(user, isPersistent: false);
                    return RedirectToAction("Index", "Home");
                }

                // Nếu lỗi (ví dụ: User đã tồn tại)
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError("", error.Description);
                }
            }
            return View(model);
        }

        // --- ĐĂNG NHẬP ---
        [HttpGet]
        public IActionResult Login(string returnUrl = null)
        {
            return View(); // Trả về view khớp với file dangnhap.html
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginVM model)
        {
            if (ModelState.IsValid)
            {
                var result = await _signInManager.PasswordSignInAsync(model.Username, model.Password, isPersistent: false, lockoutOnFailure: false);

                if (result.Succeeded)
                {
                    return RedirectToAction("Index", "Home");
                }

                ModelState.AddModelError("", "Tên đăng nhập hoặc mật khẩu không đúng.");
            }
            return View(model);
        }

        // --- ĐĂNG XUẤT ---
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return RedirectToAction("Index", "Home");
        }

        // --- PROFILE ---
        // --- QUẢN LÝ THÔNG TIN CÁ NHÂN (PROFILE) ---

        // 1. Hiển thị trang Profile
        [HttpGet]
        public async Task<IActionResult> Profile()
        {
            // Lấy thông tin user đang đăng nhập
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return RedirectToAction("Login"); // Chưa đăng nhập thì đá về trang Login
            }

            // Map dữ liệu từ User (DB) sang ViewModel (View)
            var model = new ProfileVM
            {
                Username = user.UserName,
                Email = user.Email,
                FullName = user.FullName, // Đảm bảo trong model ApplicationUser đã có field này
                PhoneNumber = user.PhoneNumber,
                Address = user.Address    // Đảm bảo trong model ApplicationUser đã có field này
            };

            return View(model);
        }

        // 2. Xử lý cập nhật thông tin
        [HttpPost]
        public async Task<IActionResult> Profile(ProfileVM model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var user = await _userManager.GetUserAsync(User);
            if (user == null) return RedirectToAction("Login");

            // Cập nhật dữ liệu mới
            user.FullName = model.FullName;
            user.PhoneNumber = model.PhoneNumber;
            user.Address = model.Address;
            // user.Email = model.Email; // Thường email sẽ chặn không cho sửa lung tung

            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                TempData["Message"] = "Cập nhật thông tin thành công!";
                return RedirectToAction("Profile");
            }

            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error.Description);
            }

            return View(model);
        }
    }
}