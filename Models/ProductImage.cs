using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MeCunMeo.Models
{
    public class ProductImage
    {
        [Key]
        public int ProductImageId { get; set; }

        public string Url { get; set; } // Link ảnh

        public bool IsPrimary { get; set; } // Ảnh chính hay phụ

        public string? AltText { get; set; } // SEO

        public int ProductId { get; set; }
        [ForeignKey("ProductId")]
        public virtual Product Product { get; set; }
    }
}