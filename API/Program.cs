using System.Text;
using API.Data;
using ChatApp.API.Interfaces;
using ChatApp.API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();
builder.Services.AddCors();
builder.Services.AddAuthentication((options) =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer((options) =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidateIssuer = false,
        ValidateAudience = false,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("super secret key super secret key"))
    };
});
var app = builder.Build();

app.UseCors((policyConfig) =>
{
    policyConfig.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200").AllowCredentials();
});
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
