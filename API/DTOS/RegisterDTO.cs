using System.ComponentModel.DataAnnotations;

namespace API.DTOS
{
    public class RegisterDTO
    {
        [Required]
        public string DisplayName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$", ErrorMessage = "Password must be complex")]
        public string Password { get; set; }
        [Required]
        public string Username { get; set; }
    }
}