//NHI

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MeCunMeo.Models
{
    public class OrderDetail
    {
        [Key]
        public int OrderDetailId { get; set; }

        public int Quantity { get; set; }

        // Lưu lại tên và giá lúc mua (snapshot)
        public string ProductName { get; set; }
        public decimal ProductPrice { get; set; }

        // Khóa ngoại
        public int OrderId { get; set; }
        [ForeignKey("OrderId")]
        public virtual Order Order { get; set; }

        public int ProductId { get; set; }
        [ForeignKey("ProductId")]
        public virtual Product Product { get; set; }
    }
}