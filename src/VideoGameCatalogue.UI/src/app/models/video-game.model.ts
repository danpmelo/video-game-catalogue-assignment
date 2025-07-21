export interface VideoGame {
  id: number;
  title: string;
  developer: string;
  publisher: string;
  releaseDate: string;  // Handle ISO Date string
  genre: string;
  description?: string;        // Optional field
}
