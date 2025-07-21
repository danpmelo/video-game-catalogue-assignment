/// <summary>
/// Represents a video game in the catalogue.
/// </summary>
public class VideoGame
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required string Developer { get; set; }
    public required string Publisher { get; set; }
    public DateTime ReleaseDate { get; set; }
    public string? Genre { get; set; }
    public string? Description { get; set; }
    public string? ImageUrl { get; set; }
}