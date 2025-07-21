using Microsoft.EntityFrameworkCore;
using VideoGameCatalogue.App.Interfaces;
using VideoGameCatalogue.Model;

namespace VideoGameCatalogue.Repository.Repositories
{
    // Repositories/VideoGameRepository.cs
    public class VideoGameRepository : IVideoGameRepository
    {
        private readonly AppDbContext _context;

        public VideoGameRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<VideoGame>> GetAllAsync(int skip, int take)
        {
            return await _context.VideoGames
                .AsNoTracking()
                .Skip(skip)
                .Take(take)
                .ToListAsync();
        }

        public async Task<VideoGame?> GetByIdAsync(int id)
        {
            return await _context.VideoGames
                .FirstOrDefaultAsync(g => g.Id == id);
        }

        public async Task AddAsync(VideoGame game)
        {
            await _context.VideoGames.AddAsync(game);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(VideoGame game)
        {
            _context.Entry(game).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var game = await _context.VideoGames.FindAsync(id);
            if (game != null)
            {
                _context.VideoGames.Remove(game);
                await _context.SaveChangesAsync();
            }
        }
    }
}
