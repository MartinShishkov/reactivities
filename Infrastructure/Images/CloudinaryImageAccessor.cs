using Application.Interfaces;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infrastructure.Images
{
  public class CloudinaryImageAccessor : IImageAccessor
  {
    private readonly Cloudinary cloudinary;

    public CloudinaryImageAccessor(IOptions<CloudinarySettings> config)
    {
      var account = new Account(
        config.Value.CloudName,
        config.Value.ApiKey,
        config.Value.ApiSecret
      );

      this.cloudinary = new Cloudinary(account);
    }

    public async Task<Application.Images.ImageUploadResult> AddPhoto(IFormFile file)
    {
      if (file.Length > 0)
      {
        await using var stream = file.OpenReadStream();
        var uploadParams = new ImageUploadParams
        {
          File = new FileDescription(file.FileName, stream),
          Transformation = new Transformation()
            .Height(500)
            .Width(500)
            .Crop("fill")
        };

        var uploadResult = await this.cloudinary.UploadAsync(uploadParams);
        if (uploadResult.Error != null)
        {
          throw new Exception(uploadResult.Error.Message);
        }

        return new Application.Images.ImageUploadResult
        {
          PublicId = uploadResult.PublicId,
          Url = uploadResult.SecureUrl.ToString(),
        };
      }

      return null;
    }

    public async Task<string> DeletePhoto(string publicId)
    {
      var deleteParams = new DeletionParams(publicId);
      var result = await this.cloudinary.DestroyAsync(deleteParams);

      return result.Result == "ok" ? result.Result : null;
    }
  }
}
