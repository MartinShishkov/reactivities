using Application.Images;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
  public interface IImageAccessor
  {
    Task<ImageUploadResult> AddPhoto(IFormFile file);
    Task<string> DeletePhoto(string publicId);
  }
}
