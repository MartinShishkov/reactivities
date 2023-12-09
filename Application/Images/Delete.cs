using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Images
{
  public class Delete
  {
    public class Command : IRequest<Result<Unit>> {
      public string ImageId { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
      private readonly DataContext context;
      private readonly IImageAccessor imageAccessor;
      private readonly IUserAccessor userAccessor;

      public Handler(DataContext context, IImageAccessor imageAccessor, IUserAccessor userAccessor)
      {
        this.context = context;
        this.imageAccessor = imageAccessor;
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

        if (image == null) {
          return null;
        }

        if (image.IsMain)
        {
          return Result<Unit>.Failure("You cannot delete your main photo");
        }

        var deleteResult = await imageAccessor.DeletePhoto(image.Id);
        if (deleteResult == null) {
          return Result<Unit>.Failure("Could not delete image");
        }

        user.Images.Remove(image);
        var result = await context.SaveChangesAsync();

        if (result > 0)
        {
          return Result<Unit>.Success(Unit.Value);
        }

        return Result<Unit>.Failure("Something happened");
      }
    }
  }
}
