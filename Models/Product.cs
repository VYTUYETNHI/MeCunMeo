using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MeCunMeo.Models
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }
        
        // Alias để dùng product.Id thay vì product.ProductId
        public int Id => ProductId;

        [Required, StringLength(200)]
        public string Title { get; set; }
        
        // Alias để dùng product.Name thay vì product.Title
        public string Name => Title;

        [Range(0, double.MaxValue)]
        public decimal Price { get; set; }

        public bool Status { get; set; } = true; // True: Còn bán, False: Ngừng bán

        public string? Brand { get; set; } // Thương hiệu

        // Hai cột này chuyển từ bảng ProductDetail sang
        public string? Description { get; set; } 
        public int StockQuantity { get; set; } = 0;
        
        // Số lượng đã bán
        public int SoldQuantity { get; set; } = 0;
        
        // Ảnh sản phẩm chính
        public string? Image { get; set; }

        // Khóa ngoại Category
        public int CategoryId { get; set; }
        [ForeignKey("CategoryId")]
        public virtual Category Category { get; set; }

        // Relationship
        public virtual ICollection<ProductImage> ProductImages { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }
    }
}