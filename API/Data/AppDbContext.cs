using System.Text.Json;
using API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace API.Data;

public class AppDbContext : DbContext
{
    public DbSet<AppUser> AppUsers { get; set; }
    public AppDbContext(DbContextOptions options) : base(options)
    {

    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<AppUser>((entity) =>
        {
            entity.HasKey(e => e.Id);
            entity.HasData(JsonSerializer.Deserialize<IEnumerable<AppUser>>(File.ReadAllText("Data/UsersSeed.json")) ?? new List<AppUser>());
        });
    }
}
