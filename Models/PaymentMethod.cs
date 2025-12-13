using System.ComponentModel.DataAnnotations;

namespace MeCunMeo.Models
{
    public class PaymentMethod
    {
        [Key]
        public int PaymentId { get; set; }

        public string Name { get; set; } // COD, Banking...

        public string? Description { get; set; }

        public bool IsActive { get; set; } = true;
    }
}