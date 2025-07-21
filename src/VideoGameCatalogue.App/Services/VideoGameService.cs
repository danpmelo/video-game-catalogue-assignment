using VideoGameCatalogue.API.Interfaces;
using VideoGameCatalogue.App.Interfaces;
using VideoGameCatalogue.Model;

namespace VideoGameCatalogue.App.Services
{
    public class VideoGameService : IVideoGameService
    {
        private readonly IVideoGameRepository _repository;

        public VideoGameService(IVideoGameRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<VideoGame>> GetAllGamesAsync(int pageNumber, int pageSize)
        {
            return await _repository.GetAllAsync((pageNumber - 1) * pageSize, pageSize);
        }

        public async Task<VideoGame?> GetGameByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<VideoGame> CreateGameAsync(VideoGame game)
        {
            await _repository.AddAsync(game);
            return game;
        }

        public async Task UpdateGameAsync(VideoGame game)
        {
            await _repository.UpdateAsync(game);
        }

        public async Task DeleteGameAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }
    }
}
