using API.DTOs;
using API.Services;
using Application.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class AccountController : ControllerBase
  {
    private readonly UserManager<AppUser> userManager;
    private readonly TokenService tokenService;

    public AccountController(UserManager<AppUser> userManager, TokenService tokenService) {
      this.userManager = userManager;
      this.tokenService = tokenService;
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto login)
    {
      var user = await userManager.FindByEmailAsync(login.Email);

      if (user == null)
      {
        return Unauthorized();
      }

      var passwordIsCorrect = await userManager.CheckPasswordAsync(user, login.Password);

      if (passwordIsCorrect)
      {
        return CreateUserObjectFromAppUser(user);
      }

      return Unauthorized();
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
      var existingUser = await userManager.Users.AnyAsync(u => u.UserName == registerDto.Username);

      if (existingUser)
      {
        return BadRequest("Username is already taken");
      }

      var user = new AppUser
      {
        DisplayName = registerDto.DisplayName,
        Email = registerDto.Email,
        UserName = registerDto.Username,
      };

      var result = await userManager.CreateAsync(user, registerDto.Password);
      if (result.Succeeded)
      {
        return CreateUserObjectFromAppUser(user);
      }

      return BadRequest(result.Errors);
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<UserDto>> GetCurrentUser()
    {
      var emailFromClaim = User.FindFirstValue(ClaimTypes.Email);
      var user = await userManager.FindByEmailAsync(emailFromClaim);

      return CreateUserObjectFromAppUser(user);
    }

    private UserDto CreateUserObjectFromAppUser(AppUser user)
    {
      return new UserDto
      {
        DisplayName = user.DisplayName,
        Image = null,
        Token = tokenService.CreateToken(user),
        Username = user.UserName,
      };
    }
  }
}
