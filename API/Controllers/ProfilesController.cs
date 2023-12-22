using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class ProfilesController : BaseApiController
  {
    [HttpGet("{username}")]
    public async Task<IActionResult> GetProfile(string username)
    {
      return HandleResult(await Mediator.Send(new Application.Profiles.Details.Query() { Username = username }));
    }

    [HttpGet("{username}/activities")]
    public async Task<IActionResult> GetActivities(string username, string predicate)
    {
      var result = await this.Mediator.Send(new Application.Profiles.Activities.Query() { Username = username, Predicate = predicate });
      return HandleResult(result);
    }
  }
}
