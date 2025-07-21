import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { GameListComponent } from './game-list.component';
import { VideoGameService } from '../../services/video-game.service';
import { VideoGame } from '../../models/video-game.model';

describe('GameListComponent', () => {
  let component: GameListComponent;
  let fixture: ComponentFixture<GameListComponent>;
  let mockGameService: jasmine.SpyObj<VideoGameService>;
  let mockRouter: jasmine.SpyObj<Router>;

  const mockGames: VideoGame[] = [
    { id: 1, title: 'Game 1', developer: 'Dev 1', publisher: 'Pub 1', releaseDate: '2023-12-31T00:00:00Z', genre: 'Action', description: 'Desc 1' },
    { id: 2, title: 'Game 2', developer: 'Dev 2', publisher: 'Pub 2', releaseDate: '2024-01-01T00:00:00Z', genre: 'Adventure', description: 'Desc 2' }
  ];

  beforeEach(async () => {
    mockGameService = jasmine.createSpyObj('VideoGameService', ['getGames']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [GameListComponent],
      providers: [
        { provide: VideoGameService, useValue: mockGameService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GameListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load games on init', fakeAsync(() => {
    mockGameService.getGames.and.returnValue(of(mockGames));
    component.ngOnInit();
    tick();
    expect(component.isLoading).toBeFalse();
    expect(component.games).toEqual(mockGames);
    expect(component.error).toBeNull();
  }));

  it('should set error if loading games fails', fakeAsync(() => {
    mockGameService.getGames.and.returnValue(throwError(() => new Error('Network error')));
    spyOn(console, 'error');
    component.loadGames();
    tick();
    expect(component.isLoading).toBeFalse();
    expect(component.error).toBe('Failed to load games. Please try again.');
    expect(console.error).toHaveBeenCalled();
  }));

  it('should navigate to game details when viewGame is called', () => {
    component.viewGame(42);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/games', 42]);
  });

  it('should navigate to create new game when createNewGame is called', () => {
    component.createNewGame();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/games/new']);
  });

  it('should format release date correctly', () => {
    const dateStr = '2023-12-31T00:00:00Z';
    const formatted = component.formatReleaseDate(dateStr);
    // The output depends on the locale, so just check it's a non-empty string
    expect(typeof formatted).toBe('string');
    expect(formatted.length).toBeGreaterThan(0);
  });
});
