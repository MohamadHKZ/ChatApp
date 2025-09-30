using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.DTOs;
using API.Entities;
using ChatApp.API.Interfaces;
using Humanizer;
using Microsoft.IdentityModel.Tokens;

namespace ChatApp.API.Services
{
    public class JwtTokenService : IJwtTokenService
    {
        public string GenerateToken(AppUser user)
        {
            var token = new JwtSecurityToken(
                expires: DateTime.Now.AddDays(7),
                claims:
                [
                    new Claim(JwtRegisteredClaimNames.NameId, user.Id.ToString()),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email)
                ],
                signingCredentials: new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes("super secret key super secret key")),
                    SecurityAlgorithms.HmacSha256Signature
                ));
            var jwtHandler = new JwtSecurityTokenHandler();
            var tokenString = jwtHandler.WriteToken(token);
            return tokenString;
        }
    }
}