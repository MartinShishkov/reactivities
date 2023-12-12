using Application.Activities;
using Application.Comments;
using Application.Domain;
using Application.Profiles;
using AutoMapper;
using Domain;

namespace Application.Core
{
  public class MappingProfiles : Profile
  {
    public MappingProfiles()
    {
      CreateMap<Activity, Activity>();
      CreateMap<Activity, ActivityDto>()
        .ForMember(d => d.HostUsername, o => o.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsHost).AppUser.UserName));

      CreateMap<ActivityAttendee, AttendeeDto>()
        .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
        .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
        .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Images.FirstOrDefault(x => x.IsMain).Url))
        .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio));

      CreateMap<AppUser, ProfileDto>()
        .ForMember(d => d.Image, o => o.MapFrom(s => s.Images.FirstOrDefault(x => x.IsMain).Url));

      CreateMap<Comment, CommentDto>()
        .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Author.DisplayName))
        .ForMember(d => d.Username, o => o.MapFrom(s => s.Author.UserName))
        .ForMember(d => d.Image, o => o.MapFrom(s => s.Author.Images.FirstOrDefault(x => x.IsMain).Url));
    }
  }
}
