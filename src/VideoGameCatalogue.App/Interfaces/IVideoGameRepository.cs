using VideoGameCatalogue.Model;

namespace VideoGameCatalogue.App.Interfaces
{
    // Repositories/IVideoGameRepository.cs
    public interface IVideoGameRepository
    {
        Task<IEnumerable<VideoGame>> GetAllAsync(int skip, int take);
        Task<VideoGame?> GetByIdAsync(int id);
        Task AddAsync(VideoGame game);
        Task UpdateAsync(VideoGame game);
        Task DeleteAsync(int id);
    }
}
