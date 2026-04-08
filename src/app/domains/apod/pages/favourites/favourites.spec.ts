import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Favourites } from './favourites';
import { FavService } from '../../../../shared/services/fav-service';
import { HeaderService } from '../../../../shared/services/header-service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { signal, ElementRef } from '@angular/core';
import { of } from 'rxjs';
import { ApodResponse } from '../../models/ApodResponse';
import { Mock } from 'vitest';
import { ActivatedRoute } from '@angular/router';

describe('Favourites Component', () => {
  let component: Favourites;
  let fixture: ComponentFixture<Favourites>;
  
  // Usamos Partial<T> para indicar que son mocks con solo algunos métodos
  let mockFavService: Partial<FavService>;
  let mockHeaderService: Partial<HeaderService>;
  let mockTranslateService: Partial<TranslateService>;

  const mockList: ApodResponse[] = [
    { 
      title: 'Mars Photo', date: '2026-01-01', explanation: '', 
      url: '', hdurl: '', media_type: 'image', copyright: '', 
      service_version: '', thumbnail_url: '' 
    },
    { 
      title: 'Moon Photo', date: '2026-01-02', explanation: '', 
      url: '', hdurl: '', media_type: 'image', copyright: '', 
      service_version: '', thumbnail_url: '' 
    }
  ];

  beforeEach(async () => {
    // 2. Definimos los mocks respetando los tipos originales
    mockFavService = {
      favorites: signal<ApodResponse[]>(mockList)
    };

    mockHeaderService = {
      setHeaderInputs: vi.fn()
    };

    mockTranslateService = {
      stream: vi.fn().mockReturnValue(of({})),
      instant: vi.fn().mockImplementation((key: string) => key)
    };

    await TestBed.configureTestingModule({
      imports: [Favourites, TranslateModule.forRoot()],
      providers: [
        { provide: FavService, useValue: mockFavService },
        { provide: HeaderService, useValue: mockHeaderService },
        { provide: TranslateService, useValue: mockTranslateService },
        {
          provide: ActivatedRoute,
          useValue: { params: of({ date: '2026-04-06' }) }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Favourites);
    component = fixture.componentInstance;
    
    // 3. Mock de ElementRef
    // Creamos un elemento input real del navegador
    const inputElement = document.createElement('input');
    inputElement.value = 'Mars';
    component.searcher = new ElementRef(inputElement);
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('filteredFav: debería filtrar la lista por el título', () => {
    component.searchTerm.set('moon'); 
    const result = component.filteredFav();
    expect(result.length).toBe(1);
    expect(result[0].title).toBe('Moon Photo');
  });

  it('searchByWord(): debería actualizar el signal searchTerm con el valor del input', () => {
    // Al ser un elemento real, el .value funciona perfectamente
    const inputDebugElement = fixture.nativeElement.querySelector('input');
    inputDebugElement.value = 'a';
    component.searchByWord();
    expect(component.searchTerm()).toBe('a');
  });

});