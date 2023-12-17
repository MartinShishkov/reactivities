using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
  public class Details
  {
    public class Query : IRequest<Result<ProfileDto>> {
      public string Username { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<ProfileDto>>
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

      public async Task<Result<ProfileDto>> Handle(Query request, CancellationToken cancellationToken)
      {
        var profile = await context.Users
          .ProjectTo<ProfileDto>(
            mapper.ConfigurationProvider,
            new { currentUsername = this.userAccessor.GetUsername() }
          )
          .SingleOrDefaultAsync(x => x.Username == request.Username);

        if (profile == null)
        {
          return null;
        }

        return Result<ProfileDto>.Success(profile);
      }
    }
  }
}
