namespace MeCunMeo.Helpers
{
    public enum OrderStatus
    {
        HuyDon = 0,     // Canceled
        MoiDat = 1,     // Pending (Mặc định)
        DangGiao = 2,   // Shipping
        DaGiao = 3      // Completed
    }
    // 2. Trạng thái Thanh toán (Mới thêm)
    public enum PaymentStatus
    {
        ChuaThanhToan = 0, // Unpaid
        DaThanhToan = 1,   // Paid (Thường dùng cho VNPAY/Momo)
        HoanTien = 2       // Refunded
    }

    // 3. Trạng thái Vận chuyển (Mới thêm)
    public enum ShippingStatus
    {
        ChoLayHang = 0,    // Waiting
        DangGiao = 1,      // Delivering
        DaGiao = 2,        // Delivered
        TraHang = 3        // Returned
    }
}
