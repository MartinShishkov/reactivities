using Application.Core;
using Application.Interfaces;
using Application.Profiles;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Followers
{
  public class List
  {
    public class Query : IRequest<Result<List<ProfileDto>>> {
      public string Predicate { get; set; }

      public string Username { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<List<ProfileDto>>>
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

      public async Task<Result<List<ProfileDto>>> Handle(Query request, CancellationToken cancellationToken)
      {
        var profiles = new List<ProfileDto>();

        switch(request.Predicate)
        {
          case "followers":
            profiles = await context
              .UserFollowings
              .Where(u => u.Target.UserName == request.Username)
              .Select(u => u.Observer)
              .ProjectTo<ProfileDto>(
                mapper.ConfigurationProvider,
                new { currentUsername = this.userAccessor.GetUsername() }
              )
              .ToListAsync();
            break;
          case "following":
            profiles = await context
              .UserFollowings
              .Where(u => u.Observer.UserName == request.Username)
              .Select(u => u.Target)
              .ProjectTo<ProfileDto>(
                mapper.ConfigurationProvider,
                new { currentUsername = this.userAccessor.GetUsername() }
              )
              .ToListAsync();
            break;
        }

        return Result<List<ProfileDto>>.Success(profiles);
      }
    }
  }
}
