// Data/AppDbContext.cs
using Microsoft.EntityFrameworkCore;
using VideoGameCatalogue.Model;

namespace VideoGameCatalogue.Repository
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<VideoGame> VideoGames { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Seed initial data
            modelBuilder.Entity<VideoGame>().HasData(
                new VideoGame { Id = 1, Title = "The Witcher 3", Developer = "CD Projekt Red", Publisher = "CD Projekt", ReleaseDate = new DateTime(2015, 5, 19), Genre = "RPG", Description = "Open world RPG" },
                new VideoGame { Id = 2, Title = "Cyberpunk 2077", Developer = "CD Projekt Red", Publisher = "CD Projekt", ReleaseDate = new DateTime(2020, 12, 10), Genre = "RPG", Description = "Futuristic open world RPG" }
            );
        }
    }
}