using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
  public class Activities
  {
    public class Query : IRequest<Result<List<UserActivityDto>>>
    {
      public string Username { get; set; }

      public string Predicate { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<List<UserActivityDto>>>
    {
      private readonly DataContext context;
      private readonly IMapper mapper;
      private readonly IUserAccessor userAccessor;

      public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
      {
        this.context = context;
        this.mapper = mapper;
        this.userAccessor = userAccessor;
      }

      public async Task<Result<List<UserActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
      {
        var currentUsername = request.Username;

        var query = this.context.Activities
          .Where(a => a.Attendees.Any(u => u.AppUser.UserName == currentUsername))
          .ProjectTo<UserActivityDto>(mapper.ConfigurationProvider)
          .AsQueryable();

        if (request.Predicate == "future")
        {
          query = query.Where(x => x.Date > DateTime.UtcNow && x.HostUsername != currentUsername);
        }

        if (request.Predicate == "past")
        {
          query = query.Where(x => x.Date < DateTime.UtcNow && x.HostUsername != currentUsername);
        }

        if (request.Predicate == "hosting")
        {
          query = query.Where(x => x.HostUsername == currentUsername);
        }

        var result = await query.ToListAsync();

        return Result<List<UserActivityDto>>.Success(result);
      }
    }
  }
}
