using Domain;

namespace Application.Profiles
{
  public class ProfileDto
  {
    public string Username { get; set; }

    public string DisplayName { get; set; }

    public string Bio { get; set; }

    public string Image { get; set; }

    public ICollection<Image> Images { get; set; }

    public bool Following { get; set; }

    public int FollowersCount { get; set; }

    public int FollowingCount { get; set; }
  }
}
