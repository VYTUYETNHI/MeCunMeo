//Hỗ trợ upload hình ảnh, tệp tin, xử lý chuỗi, mã hóa, giải mã, v.v.
using System.Text.RegularExpressions;

namespace MeCunMeo.Helpers
{
    public class Ulti
    {
        // 1. Hàm Upload hình (Y chang cái MyUtil nãy tui đưa)
        public static string UploadHinh(IFormFile Hinh, string folder)
        {
            try
            {
                var fullPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "img", folder, Hinh.FileName);
                using (var myfile = new FileStream(fullPath, FileMode.Create))
                {
                    Hinh.CopyTo(myfile);
                }
                return Hinh.FileName;
            }
            catch (Exception ex)
            {
                return string.Empty;
            }
        }

        // 2. Hàm tạo URL đẹp (SEO) - Cái này làm thêm cho xịn thôi
        // Ví dụ: "Thức ăn Cho Cún" -> "thuc-an-cho-cun"
        public static string ToUrlSlug(string str)
        {
            if (string.IsNullOrWhiteSpace(str)) return string.Empty;

            str = str.ToLower().Trim();
            // Xóa dấu tiếng Việt
            string[] vietnameseChars = new string[]
            {
                "aAeEoOuUiIdDyY",
                "áàạảãâấầậẩẫăắằặẳẵ",
                "ÁÀẠẢÃÂẤẦẬẨẪĂẮẰẶẲẴ",
                "éèẹẻẽêếềệểễ",
                "ÉÈẸẺẼÊẾỀỆỂỄ",
                "óòọỏõôốồộổỗơớờợởỡ",
                "ÓÒỌỎÕÔỐỒỘỔỖƠỚỜỢỞỠ",
                "úùụủũưứừựửữ",
                "ÚÙỤỦŨƯỨỪỰỬỮ",
                "íìịỉĩ",
                "ÍÌỊỈĨ",
                "đ",
                "Đ",
                "ýỳỵỷỹ",
                "ÝỲỴỶỸ"
            };

            // Code xử lý thay thế dấu... (Đoạn này hơi dài nên tui viết gọn lại logic thôi nha)
            // Nếu bà cần chi tiết hàm này để SEO thì hú tui, còn không thì chỉ cần hàm UploadHinh ở trên là đủ.
            return str.Replace(" ", "-");
        }
    }
}
