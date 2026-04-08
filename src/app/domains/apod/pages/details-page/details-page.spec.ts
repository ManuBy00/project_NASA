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

describe('DetailsPage', () => {
  let component: DetailsPage;
  let fixture: ComponentFixture<DetailsPage>;
  let service: ApodService; // El motor de Vitest lo llenará en el beforeEach
  let headerService: HeaderService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DetailsPage, 
        TranslateModule.forRoot() 
      ],
      providers: [
        ApodService, 
        HeaderService, 
        FavService, 
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
    
    // Extraemos el servicio del inyector de TestBed
    service = TestBed.inject(ApodService);
    headerService = TestBed.inject(HeaderService)
    
    fixture.detectChanges(); // Primera detección de cambios
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("getApod() obtiene el apod con la fecha indicada", () => {
    // ARRANGE
    const date = "2026-04-06";
    const mockApod: ApodResponse = {
      date: date,
      title: 'L',
      explanation: 'Een.',
      url: 'h.jpg',
      hdurl: 'dd.jpg',
      media_type: 'image',
      copyright: 'NASA',
      service_version: 'v1',
      thumbnail_url: 'hd'
    };

    // Espiamos el servicio antes de ejecutar la acción
    const spy = vi.spyOn(service, 'getOneApod').mockReturnValue(of(mockApod));

    // ACT
    component.getApod(date);
    fixture.detectChanges(); 

    // ASSERT
    expect(component.apod()?.date).toBe(date);
    expect(component.isLoading()).toBe(false);
    expect(spy).toHaveBeenCalledWith(date);
  });

  it("Al inicializar se llama a la api para obtener el apod y se llama al headerService con parametros vacíos", ()=>{
    //arrange
    const date = '2026-04-06';
    const spy = vi.spyOn(component, "getApod");
    const headerSpy = vi.spyOn(headerService, 'setHeaderInputs');

    //act
    component.ngOnInit();

    //assert
    expect(spy).toHaveBeenCalledWith(date);
    expect(headerSpy).toHaveBeenCalledWith("", "");
  })
});