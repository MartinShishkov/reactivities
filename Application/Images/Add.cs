using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Images
{
  public class Add
  {
    public class Command : IRequest<Result<Image>> {
      public IFormFile File { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Image>>
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

      public async Task<Result<Image>> Handle(Command request, CancellationToken cancellationToken)
      {
        var username = userAccessor.GetUsername();
        var user = await context.Users
          .Include(p => p.Images)
          .FirstOrDefaultAsync(x => x.UserName == username);

        if (user == null)
        {
          return null;
        }

        var imageUploadResult = await imageAccessor.AddPhoto(request.File);

        var image = new Image
        {
          Url = imageUploadResult.Url,
          Id = imageUploadResult.PublicId
        };

        if (!user.Images.Any(x => x.IsMain))
        {
          image.IsMain = true;
        }

        user.Images.Add(image);
        var result = await context.SaveChangesAsync();

        if (result > 0)
        {
          return Result<Image>.Success(image);
        }

        return Result<Image>.Failure("Problem adding image");
      }
    }
  }
}
