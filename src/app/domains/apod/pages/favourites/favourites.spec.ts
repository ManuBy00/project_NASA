import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Favourites } from './favourites';
import { FavService } from '../../../../shared/services/fav-service';
import { HeaderService } from '../../../../shared/services/header-service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { signal, ElementRef } from '@angular/core';
import { of } from 'rxjs';
import { ApodResponse } from '../../models/ApodResponse';
import { ActivatedRoute } from '@angular/router';

describe('Favourites Component', () => {
  let component: Favourites;
  let fixture: ComponentFixture<Favourites>;

  
  const mockList: ApodResponse[] = [
    { title: 'Mars Photo', date: '2026-01-01' } as ApodResponse,
    { title: 'Moon Photo', date: '2026-01-02' } as ApodResponse
  ];

  const mockFavService = {
    favorites: signal<ApodResponse[]>(mockList),
  };

  const mockHeaderService = {
    setHeaderInputs: vi.fn()
  };

  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Favourites, TranslateModule.forRoot()],
      providers: [
        { provide: FavService, useValue: mockFavService },
        { provide: HeaderService, useValue: mockHeaderService },
        
        {
          provide: ActivatedRoute,
          useValue: { params: of({ date: '2026-04-06' }) }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Favourites);
    component = fixture.componentInstance;

    // Mock de ElementRef
    const inputElement = document.createElement('input');
    component.searcher = new ElementRef(inputElement);

    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit: debería configurar el header correctamente', () => {
    // Verificamos el espía que definimos arriba
    expect(mockHeaderService.setHeaderInputs).toHaveBeenCalled();
  });

  it('filteredFav: debería filtrar la lista por título', () => {
    component.searchTerm.set('moon'); 
    const result = component.filteredFav();
    
    expect(result.length).toBe(1);
    expect(result[0].title).toBe('Moon Photo');
  });

  it('searchByWord(): debería actualizar el signal searchTerm con el valor del input', () => {
    // Simulamos que el usuario escribe en el input
    component.searcher.nativeElement.value = 'a';
    
    component.searchByWord();
    
    expect(component.searchTerm()).toBe('a');
  });
});