//NHI 

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MeCunMeo.Models
{
    public class Order
    {
        [Key]
        public int OrderId { get; set; }

        public string? TrackingNumber { get; set; } // Mã vận đơn

        public int OrderStatus { get; set; } = (int)Helpers.OrderStatus.MoiDat;  // Trạng thái đơn

        public DateTime OrderDate { get; set; } = DateTime.Now;

        public decimal TotalAmount { get; set; } // Tổng tiền
        
        public string? Note { get; set; }

        public string ShippingAddress { get; set; } // Địa chỉ nhận hàng

        // --- CÁC KHÓA NGOẠI ---

        // Người mua (UserId)
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual ApplicationUser User { get; set; }

        // Thanh toán
        public int PaymentId { get; set; }
        public int PaymentStatus { get; set; } = (int)Helpers.PaymentStatus.ChuaThanhToan;

        [ForeignKey("PaymentId")]
        public virtual PaymentMethod PaymentMethod { get; set; }

        // Vận chuyển
        public int ShippingId { get; set; }
        public decimal ShippingFee { get; set; } // Phí ship
        public int ShippingStatus { get; set; } = (int)Helpers.ShippingStatus.ChoLayHang;

        [ForeignKey("ShippingId")]
        public virtual ShippingMethod ShippingMethod { get; set; }

        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
    }
}