using Microsoft.AspNetCore.Mvc;
using VideoGameCatalogue.API.Interfaces;
using VideoGameCatalogue.Model;

namespace VideoGameCatalogue.API.Controllers
{
    /// <summary>
    /// Controls video game operations such as retrieving, creating, updating, and deleting video games.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class VideoGameController : ControllerBase
    {
        private readonly IVideoGameService _gameService;
        private readonly ILogger<VideoGameController> _logger;

        public VideoGameController(IVideoGameService gameService, ILogger<VideoGameController> logger)
        {
            _gameService = gameService;
            _logger = logger;
        }

        /// <summary>
        /// Retrieves all video games.
        /// </summary>
        /// <param name="pageNumber">The page number for pagination.</param>
        /// <param name="pageSize">The number of items per page for pagination.</param>
        /// <returns>A list of all video games.</returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VideoGame>>> GetAll([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            try
            {
                var games = await _gameService.GetAllGamesAsync(pageNumber, pageSize);
                return Ok(games);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching all games");
                return StatusCode(500, "Internal server error");
            }
        }

        /// <summary>
        /// Retrieves a video game by its unique ID.
        /// </summary>
        /// <param name="id">The ID of the video game to retrieve.</param>
        /// <returns>The video game with the specified ID.</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<VideoGame>> GetById(int id)
        {
            try
            {
                var game = await _gameService.GetGameByIdAsync(id);
                return game != null ? Ok(game) : NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error fetching game with ID {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        /// <summary>
        /// Creates a new video game.
        /// </summary>
        /// <param name="game">The video game to create.</param>
        /// <returns>The created video game.</returns>
        [HttpPost]
        public async Task<ActionResult<VideoGame>> Create([FromBody] VideoGame game)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var createdGame = await _gameService.CreateGameAsync(game);
                return CreatedAtAction(nameof(GetById), new { id = createdGame.Id }, createdGame);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating game");
                return StatusCode(500, "Internal server error");
            }
        }

        /// <summary>
        /// Updates an existing video game.
        /// </summary>
        /// <param name="id">The ID of the video game to update.</param>
        /// <param name="game">The updated video game object.</param>
        /// <returns>No content if the update is successful.</returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] VideoGame game)
        {
            try
            {
                if (id != game.Id)
                    return BadRequest("ID mismatch");

                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                await _gameService.UpdateGameAsync(game);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating game with ID {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        /// <summary>
        /// Deletes a video game by its unique ID.
        /// </summary>
        /// <param name="id">The ID of the video game to delete.</param>
        /// <returns>No content if the deletion is successful.</returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _gameService.DeleteGameAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting game with ID {id}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
