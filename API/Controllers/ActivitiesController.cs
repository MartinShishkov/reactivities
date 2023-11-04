using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
  [ApiController]
  public class ActivitiesController : BaseApiController
  {
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
      return await this.Mediator.Send(new List.Query());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetById(Guid id)
    {
      return await Mediator.Send(new Details.Query() { Id = id });
    }

    [HttpPost]
    public async Task<IActionResult> CreateActivity([FromBody] Activity activity)
    {
      await Mediator.Send(new Create.Command() { Activity = activity });

      return Ok();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> EditActivity(Guid id, [FromBody] Activity activity)
    {
      activity.Id = id;

      await Mediator.Send(new Edit.Command() { Activity = activity });

      return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteActivity(Guid id)
    {
      await Mediator.Send(new Delete.Command() { Id = id });

      return Ok();
    }
  }
}
