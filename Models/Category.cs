using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MeCunMeo.Models
{
    public class Category
    {
        [Key]
        public int CategoryId { get; set; }
        
        // Alias để dùng cat.Id thay vì cat.CategoryId
        public int Id => CategoryId;

        [Required, StringLength(100)]
        public string Name { get; set; }

        // Type: "Dog" hoặc "Cat"
        [StringLength(50)]
        public string? Type { get; set; }

        // Tự liên kết để làm danh mục cha/con
        public int? ParentId { get; set; }
        
        [ForeignKey("ParentId")]
        public virtual Category? ParentCategory { get; set; }

        public bool IsActive { get; set; } = true;

        public virtual ICollection<Product> Products { get; set; }
    }
}