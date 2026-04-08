import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPage } from './main-page';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Store } from '../../../../store/store';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { signal } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { HeaderService } from '../../../../shared/services/header-service';
import { ApodResponse } from '../../models/ApodResponse';

describe('MainPage', () => {
  let component: MainPage;
  let fixture: ComponentFixture<MainPage>;
  const mockStore = {
    dispatch: vi.fn(),
    getApodList: signal<ApodResponse[]>([]),
    isLoading: signal(false),
    getErrorMessage: signal(null)
  };
  const mockHeaderService = { setHeaderInputs: vi.fn() };
  const mockTranslateService = {
    stream: vi.fn().mockReturnValue(of({})),
    instant: vi.fn((key) => key)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainPage,
        TranslateModule.forRoot()
      ],
      providers: [
        {provide: Store,
          useValue: mockStore}, 
        {provide: HeaderService,
          useValue: mockHeaderService
        },
        {
          provide: TranslateService,
          useValue: mockTranslateService
        },  
        provideRouter([]), provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(MainPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("NgOnInit. El componente se incicializa correctamente llamando al store y el headerservice", () => {
    
    //arrange

    
    //act
    fixture.detectChanges();
    
    //assert
    expect(component.entries().length).toBe(0)
    expect(mockHeaderService.setHeaderInputs).toHaveBeenCalledWith("HEADER.POST_TITTLE_MAIN", "HEADER.POST_SUBTITLE_MAIN");
    expect(mockStore.dispatch).toHaveBeenCalledWith({ type: '[APOD] Load Request' });
    
    
  });
});
