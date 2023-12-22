using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Persistence;

namespace Application.Activities
{
  public class List
  {
    public class Query : IRequest<Result<PagedList<ActivityDto>>>
    {
      public ActivityFilterParams Params { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<PagedList<ActivityDto>>>
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

      public async Task<Result<PagedList<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
      {
        var currentUsername = userAccessor.GetUsername();

        var query = this.context.Activities
          .Where(d => d.Date >= request.Params.StartDate)
          .OrderBy(d => d.Date)
          .ProjectTo<ActivityDto>(
            mapper.ConfigurationProvider,
            new { currentUsername = this.userAccessor.GetUsername() }
          ).AsQueryable();

        if (request.Params.IsGoing && request.Params.IsHost) {
          query = query.Where(x => x.Attendees.Any(a => a.Username == currentUsername));
        }

        if (request.Params.IsHost && !request.Params.IsGoing) {
          query = query.Where(x => x.HostUsername == currentUsername);
        }

        var result = await PagedList<ActivityDto>.CreateAsync(
          query,
          request.Params.PageNumber,
          request.Params.PageSize
        );

        return Result<PagedList<ActivityDto>>.Success(result);
      }
    }
  }
}
