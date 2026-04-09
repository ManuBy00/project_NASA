import { TestBed } from '@angular/core/testing';

import { ApodService } from './apod-service';
import { HttpTestingController, provideHttpClientTesting, TestRequest } from '@angular/common/http/testing';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { ApodResponse } from '../../domains/apod/models/ApodResponse';

describe('ApodService', () => {
  let service: ApodService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApodService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(ApodService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("getOneApod: debería obtener los datos correctamente", () => {
      const mockApod: ApodResponse = {
        date: '2026-04-06',
        explanation: 'Marte',
        title: 'Marte',
        url: 'https://apod.nasa.gov/apod/image/mock_url.jpg',
        media_type: 'image',
        hdurl: 'https://apod.nasa.gov/apod/image/mock_hdurl.jpg',
        copyright: 'Observatorio de Prueba',
        service_version: 'v1'
      };

      let result: ApodResponse | undefined;;

      service.getOneApod("2026-04-09").subscribe(data => result = data);

      //  atrapamos la llamada
      const req: TestRequest = httpMock.expectOne(request => 
      request.url.includes("planetary/apod") && request.params.has("date")
      );

      expect(req.request.method).toBe("GET");
      req.flush(mockApod);

      expect(result).toEqual(mockApod);
      expect(result?.title).toBe('Marte');
    })

  it('errores de red (404)', () => {
  // ARRANGE
  const status = 404;
  const statusText = 'Not Found';
  const errorMessage = 'No encontrado';
  
  // Variable para capturar el error (usamos el tipo oficial de Angular)
  let actualError: HttpErrorResponse | undefined;

  //  ACT
  service.getOneApod('fecha-falsa').subscribe({
    next: () => {
      // Si entra aquí, el test debería fallar 
      fail('Debería haber fallado con un 404');
    },
    error: (error: HttpErrorResponse) => {
      actualError = error; // Capturamos el error
    }
  });

  // Interceptamos la petición
  const req: TestRequest = httpMock.expectOne(request => 
    request.url.includes('planetary/apod')
  );

  // Simulamos la respuesta de error del servidor
  req.flush(errorMessage, { status, statusText });

  //  ASSERT 
  expect(actualError?.status).toBe(status);
  expect(actualError?.error).toBe(errorMessage);
});
});
