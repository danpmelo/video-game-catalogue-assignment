using VideoGameCatalogue.Model;

namespace VideoGameCatalogue.API.Interfaces
{
    public interface IVideoGameService
    {
        Task<IEnumerable<VideoGame>> GetAllGamesAsync(int pageNumber, int pageSize);
        Task<VideoGame?> GetGameByIdAsync(int id);
        Task<VideoGame> CreateGameAsync(VideoGame game);
        Task UpdateGameAsync(VideoGame game);
        Task DeleteGameAsync(int id);
    }
}
