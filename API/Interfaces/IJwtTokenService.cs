using API.DTOs;
using API.Entities;

namespace ChatApp.API.Interfaces
{
    public interface IJwtTokenService
    {
        string GenerateToken(AppUser user);
    }
}