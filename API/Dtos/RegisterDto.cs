using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class RegisterDto
    {
        public string DisplayName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        public string Password { get; set; }
    }
}