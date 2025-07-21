import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameEditComponent } from './game-edit.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { VideoGameService } from '../../services/video-game.service';
import { VideoGame } from '../../models/video-game.model';
import { ReactiveFormsModule } from '@angular/forms';

describe('GameEditComponent', () => {
  let component: GameEditComponent;
  let fixture: ComponentFixture<GameEditComponent>;
  let mockGameService: jasmine.SpyObj<VideoGameService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: any;

  const testGame: VideoGame = {
    id: 1,
    title: 'Test Game',
    developer: 'Test Dev',
    publisher: 'Test Pub',
    releaseDate: '2023-01-01T00:00:00Z',
    genre: 'Action',
    description: 'Test Description'
  };

  beforeEach(async () => {
    mockGameService = jasmine.createSpyObj('VideoGameService', ['getGame', 'createGame', 'updateGame']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy()
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [GameEditComponent],
      providers: [
        { provide: VideoGameService, useValue: mockGameService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GameEditComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set isNewGame to true if id is "new"', () => {
      mockActivatedRoute.snapshot.paramMap.get.and.returnValue('new');
      component.ngOnInit();
      expect(component.isNewGame).toBeTrue();
    });

    it('should load game if id is not "new"', () => {
      spyOn(component, 'loadGame');
      mockActivatedRoute.snapshot.paramMap.get.and.returnValue('1');
      component.ngOnInit();
      expect(component.isNewGame).toBeFalse();
      expect(component.loadGame).toHaveBeenCalledWith(1);
    });
  });

  describe('loadGame', () => {
    it('should load and format game data', () => {
      mockGameService.getGame.and.returnValue(of(testGame));
      component.loadGame(1);
      expect(mockGameService.getGame).toHaveBeenCalledWith(1);
      expect(component.gameForm.value.title).toBe('Test Game');
      expect(component.gameForm.value.releaseDate).toBe('2023-01-01');
    });
  });

  describe('save', () => {
    beforeEach(() => {
      spyOn(window, 'alert');
      component.gameForm.setValue({
        id: 0,
        title: 'Title',
        developer: 'Dev',
        publisher: 'Pub',
        releaseDate: '2023-01-01',
        genre: 'Genre',
        description: ''
      });
    });

    it('should alert if required fields are missing', () => {
      component.gameForm.get('title')?.setValue('');
      component.save();
      expect(window.alert).toHaveBeenCalledWith('Required fields are missing.');
    });

    it('should call createGame for new game', () => {
      component.isNewGame = true;
      mockGameService.createGame.and.returnValue(of(component.gameForm.value));
      component.save();
      expect(mockGameService.createGame).toHaveBeenCalledWith(component.gameForm.value);
      expect(window.alert).toHaveBeenCalledWith('Game saved successfully!');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    });

    it('should call updateGame for existing game', () => {
      component.isNewGame = false;
      mockGameService.updateGame.and.returnValue(of(component.gameForm.value));
      component.save();
      expect(mockGameService.updateGame).toHaveBeenCalledWith(component.gameForm.value);
      expect(window.alert).toHaveBeenCalledWith('Game saved successfully!');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    });
  });

  describe('cancel', () => {
    it('should navigate to /', () => {
      component.cancel();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    });
  });
});
