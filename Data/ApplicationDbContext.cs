using Microsoft.AspNetCore.Identity.EntityFrameworkCore; // Nhớ using cái này
using Microsoft.EntityFrameworkCore;
using MeCunMeo.Models;

namespace MeCunMeo.Data
{
    // Đổi DbContext thường thành IdentityDbContext<ApplicationUser>
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductImage> ProductImages { get; set; }
        
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        
        public DbSet<CartItem> CartItems { get; set; }
        
        public DbSet<ShippingMethod> ShippingMethods { get; set; }
        public DbSet<PaymentMethod> PaymentMethods { get; set; }
        
        public DbSet<Review> Reviews { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder); // Bắt buộc phải có dòng này cho Identity

            // --- Cấu hình kiểu dữ liệu Decimal (Tiền tệ) ---
            // Nếu không có đoạn này, khi chạy Migration sẽ bị cảnh báo hoặc lỗi

            // Ví dụ: Cấu hình giá sản phẩm
            builder.Entity<Product>()
                .Property(p => p.Price)
                .HasColumnType("decimal(18,2)");

            // Cấu hình tổng tiền đơn hàng
            builder.Entity<Order>()
                .Property(o => o.TotalAmount)
                .HasColumnType("decimal(18,2)");

            builder.Entity<OrderDetail>()
               .Property(od => od.ProductPrice)
               .HasColumnType("decimal(18,2)");

            // Nếu ShippingMethod có giá
            builder.Entity<ShippingMethod>()
               .Property(s => s.Price)
               .HasColumnType("decimal(18,2)");
        }

    }
}