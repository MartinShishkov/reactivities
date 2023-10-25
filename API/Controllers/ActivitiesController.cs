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
    private readonly IMediator mediator;

    public ActivitiesController(IMediator mediator)
    {
      this.mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
      return await this.mediator.Send(new List.Query());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetById(Guid id)
    {
      return Ok();
    }
  }
}
