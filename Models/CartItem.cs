using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MeCunMeo.Models
{
    public class CartItem
    {
        [Key]
        public int CartItemId { get; set; }

        public int Quantity { get; set; }

        // Khóa ngoại User
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual ApplicationUser User { get; set; }

        // Khóa ngoại Product
        public int ProductId { get; set; }
        [ForeignKey("ProductId")]
        public virtual Product Product { get; set; }
    }
}