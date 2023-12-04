using Application.Domain;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace API.Services
{
  public class TokenService
  {
    private readonly IConfiguration config;

    public TokenService(IConfiguration config)
    {
      this.config = config;
    }

    public string CreateToken(AppUser user)
    {
      var claims = new List<Claim>()
      {
        new Claim(ClaimTypes.Name, user.UserName),
        new Claim(ClaimTypes.NameIdentifier, user.Id),
        new Claim(ClaimTypes.Email, user.Email),
      };

      // TokenSigningKey coming from appsettings.Development.json
      var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenSigningKey"]));
      var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

      var claimsIdentity = new ClaimsIdentity(claims);

      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = claimsIdentity,
        Expires = DateTime.UtcNow.AddDays(7),
        SigningCredentials = credentials
      };

      var tokenHandler = new JwtSecurityTokenHandler();
      var token = tokenHandler.CreateToken(tokenDescriptor);

      return tokenHandler.WriteToken(token);
    }
  }
}
