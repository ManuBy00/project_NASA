import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsPage } from './details-page';
import { TranslateModule } from '@ngx-translate/core';
import { ApodService } from '../../../../shared/services/apod-service';
import { HeaderService } from '../../../../shared/services/header-service';
import { FavService } from '../../../../shared/services/fav-service';
import { provideRouter } from '@angular/router';
import { ApodResponse } from '../../models/ApodResponse';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { signal } from '@angular/core';

describe('DetailsPage', () => {
  let component: DetailsPage;
  let fixture: ComponentFixture<DetailsPage>;
  
  
  const mockApodService = {
    getOneApod: vi.fn()
  };

  const mockHeaderService = {
    setHeaderInputs: vi.fn()
  };

  const mockFavService = {
    favorites: signal<ApodResponse[]>([]), 
    isFavourite: vi.fn().mockReturnValue(false)
  };

  beforeEach(async () => {
    mockApodService.getOneApod.mockReset();
    mockHeaderService.setHeaderInputs.mockReset();

    await TestBed.configureTestingModule({
      imports: [
        DetailsPage, 
        TranslateModule.forRoot() 
      ],
      providers: [
        { provide: ApodService, useValue: mockApodService },
        { provide: HeaderService, useValue: mockHeaderService },
        { provide: FavService, useValue: mockFavService },
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ date: '2026-04-06' }) 
          }
        },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("getApod() obtiene el apod con la fecha indicada y actualiza el estado", () => {
    // ARRANGE
    const date = "2026-04-06";
    const mockApod = { date: date, title: 'L' } as ApodResponse;
    
    // Configuramos lo que debe devolver el mock en este test específico
    mockApodService.getOneApod.mockReturnValue(of(mockApod));

    // ACT
    component.getApod(date);
    fixture.detectChanges(); 

    // ASSERT
    expect(component.apod()?.date).toBe(date);
    expect(component.isLoading()).toBe(false);
    expect(mockApodService.getOneApod).toHaveBeenCalledWith(date);
  });

  it("Al inicializar (ngOnInit) se llama a getApod con la fecha del route y limpia el header", () => {
    // ARRANGE
    const date = '2026-04-06';
    // Espiamos el método del componente 
    const getApodSpy = vi.spyOn(component, 'getApod');
    mockApodService.getOneApod.mockReturnValue(of({})); 

    // ACT
    fixture.detectChanges(); // Esto dispara el ngOnInit

    // ASSERT
    expect(getApodSpy).toHaveBeenCalledWith(date);
    expect(mockHeaderService.setHeaderInputs).toHaveBeenCalledWith("", "");
  });
});