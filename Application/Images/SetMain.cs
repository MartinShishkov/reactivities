using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Images
{
  public class SetMain
  {
    public class Command : IRequest<Result<Unit>>
    {
      public string ImageId { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
      private readonly DataContext context;
      private readonly IUserAccessor userAccessor;

      public Handler(DataContext context, IUserAccessor userAccessor)
      {
        this.context = context;
        this.userAccessor = userAccessor;
      }

      public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
      {
        var username = userAccessor.GetUsername();
        var user = await context.Users
          .Include(p => p.Images)
          .FirstOrDefaultAsync(x => x.UserName == username);

        if (user == null)
        {
          return null;
        }

        var image = user.Images.FirstOrDefault(i => i.Id == request.ImageId);
        

        if (image == null)
        {
          return null;
        }


        image.IsMain = true;

        var mainImage = user.Images.FirstOrDefault(i => i.IsMain);
        if (mainImage != null && mainImage.Id != image.Id)
        {
          mainImage.IsMain = false;
        }

        var result = await context.SaveChangesAsync();

        if (result > 0)
        {
          return Result<Unit>.Success(Unit.Value);
        }

        return Result<Unit>.Failure("Could not update main photo");
      }
    }
  }
}
