import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { VideoGame } from "../models/video-game.model";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class VideoGameService {
  private apiUrl = `${environment.apiUrl}/videogame`;

  constructor(private http: HttpClient) { }

  getGames(pageNumber: number = 1, pageSize: number = 10): Observable<VideoGame[]> {
    return this.http.get<VideoGame[]>(`${this.apiUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  getGame(id: number): Observable<VideoGame> {
    return this.http.get<VideoGame>(`${this.apiUrl}/${id}`);
  }

  createGame(game: VideoGame): Observable<VideoGame> {
    return this.http.post<VideoGame>(this.apiUrl, game);
  }

  updateGame(game: VideoGame): Observable<VideoGame> {
    return this.http.put<VideoGame>(`${this.apiUrl}/${game.id}`, game);
  }

  deleteGame(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
