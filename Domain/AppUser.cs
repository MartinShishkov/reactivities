using Domain;
using Microsoft.AspNetCore.Identity;

namespace Application.Domain
{
  public class AppUser : IdentityUser
  {
    public string DisplayName { get; set; }

    public string Bio { get; set; }

    public ICollection<ActivityAttendee> Activities { get; set; }

    public ICollection<Image> Images { get; set; }
  }
}
