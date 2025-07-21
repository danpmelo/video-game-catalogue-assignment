import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideoGame } from '../../models/video-game.model';
import { VideoGameService } from '../../services/video-game.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
  imports: [CommonModule]
})
export class GameListComponent implements OnInit {
  games: VideoGame[] = [];
  isLoading = true;
  error: string | null = null;

  // Pagination properties
  pageNumber = 1;
  pageSize = 10;

  constructor(
    private gameService: VideoGameService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadGames();
  }

  loadGames(): void {
    this.isLoading = true;
    this.error = null;

    this.gameService.getGames(this.pageNumber, this.pageSize).subscribe({
      next: (games) => {
        this.games = games;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load games. Please try again.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  deleteGame(id: number): void {
    this.gameService.deleteGame(id).subscribe({
      next: () => {
        this.loadGames();
      },
      error: (err) => {
        this.error = 'Failed to delete game. Please try again.';
        console.error(err);
      }
    });
  }

  viewGame(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  createNewGame(): void {
    this.router.navigate(['/edit/new']);
  }

  formatReleaseDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString(); // e.g. "12/31/2023"
  }

  // Pagination methods
  previousPage(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.loadGames();
    }
  }

  nextPage(): void {
    // Only increment if the current page is full (could be improved on next iteration with a total count endpoint call)
    if (this.games.length === this.pageSize) {
      this.pageNumber++;
      this.loadGames();
    }
  }
}
