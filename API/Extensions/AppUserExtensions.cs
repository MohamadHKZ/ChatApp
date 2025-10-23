using API.DTOs;
using API.Entities;

public static class AppUserExtensions
{
    public static UserDTO ToUserDTO(this AppUser user, string token)
    {
        return new UserDTO
        {
            Id = user.Id,
            Email = user.Email,
            DisplayName = user.DisplayName,
            Token = token,
        };
    }
}