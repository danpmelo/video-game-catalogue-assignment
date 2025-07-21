// src/app/games/game-edit/game-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VideoGameService } from '../../services/video-game.service';
import { VideoGame } from '../../models/video-game.model';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.scss'],
  imports: [ReactiveFormsModule]
})
export class GameEditComponent implements OnInit {
  gameForm: FormGroup;
  isNewGame = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private gameService: VideoGameService
  ) {
    this.gameForm = this.fb.group({
      id: [0],
      title: ['', Validators.required],
      developer: ['', Validators.required],
      publisher: ['', Validators.required],
      releaseDate: [new Date().toISOString().split('T')[0], Validators.required],
      genre: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.isNewGame = id === 'new';

    if (!this.isNewGame && id) {
      this.loadGame(+id);
    }
  }

  loadGame(id: number): void {
    this.gameService.getGame(id).subscribe(game => {
      this.gameForm.patchValue({
        ...game,
        releaseDate: game.releaseDate.split('T')[0]
      });
    });
  }

  save(): void {
    if (this.gameForm.invalid) {
      this.gameForm.markAllAsTouched();
      alert('Required fields are missing.');
      return;
    }

    const game: VideoGame = this.gameForm.value;
    const operation = this.isNewGame
      ? this.gameService.createGame(game)
      : this.gameService.updateGame(game);

    operation.subscribe(() => {
      alert('Game saved successfully!');
      this.router.navigate(['/']);
    });
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
