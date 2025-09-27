using API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors();
var app = builder.Build();

app.UseCors((policyConfig) =>
{
    policyConfig.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200").AllowCredentials();
});

app.MapControllers();

app.Run();
