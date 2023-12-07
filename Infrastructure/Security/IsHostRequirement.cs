using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Security.Claims;

namespace Infrastructure.Security
{
  public class IsHostRequirement : IAuthorizationRequirement
  {
  }

  public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
  {
    private readonly DataContext dbContext;
    private readonly IHttpContextAccessor httpContextAccessor;

    public IsHostRequirementHandler(DataContext dbContext, IHttpContextAccessor httpContextAccessor)
    {
      this.dbContext = dbContext;
      this.httpContextAccessor = httpContextAccessor;
    }

    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
    {
      var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

      if (userId == null)
      {
        return Task.CompletedTask;
      }

      var routeParameter = httpContextAccessor.HttpContext?.Request.RouteValues.SingleOrDefault(x => x.Key == "id").Value?.ToString();
      var activityId = Guid.Parse(routeParameter);

      // This line introduces a bug because EF is keeping the object in memory
      // var attendee = dbContext.ActivityAttendees.FindAsync(userId, activityId).Result;

      var attendee = dbContext.ActivityAttendees
        .AsNoTracking() // This tells EF to not keep the object in memory
        .SingleOrDefaultAsync(a => a.ActivityId == activityId && a.AppUserId == userId).Result;

      if (attendee == null)
      {
        return Task.CompletedTask;
      }

      if (attendee.IsHost)
      {
        context.Succeed(requirement);
      }

      return Task.CompletedTask;
    }
  }
}
