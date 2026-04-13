import { TestBed } from '@angular/core/testing';

import { ApodService } from './apod-service';
import { HttpTestingController, provideHttpClientTesting, TestRequest } from '@angular/common/http/testing';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { ApodResponse } from '../../domains/apod/models/ApodResponse';


describe('ApodService', () => {
  let service: ApodService;
  let httpMock: HttpTestingController;

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

      const mockApod2: ApodResponse = {
        date: '2026-04-06',
        explanation: 'Marte',
        title: 'Marte',
        url: 'https://apod.nasa.gov/apod/image/mock_url.jpg',
        media_type: 'image',
        hdurl: 'https://apod.nasa.gov/apod/image/mock_hdurl.jpg',
        copyright: 'Observatorio de Prueba',
        service_version: 'v1'
      };

      const mockApodArray: ApodResponse[] = [mockApod, mockApod2];



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
    //ARRANGE
      let result: ApodResponse | undefined;
      let date = "2026-04-09"

      //ACT
      service.getOneApod(date).subscribe(data => result = data);

      //atrapamos la llamada
      const req: TestRequest = httpMock.expectOne(request => 
      request.url.includes("planetary/apod") && request.params.has("date")
      );

      //comprobamos que la petición es GET
      expect(req.request.method).toBe("GET");

      // Verificamos los parametros
      expect(req.request.params.get("date")).toBe(date);
      expect(req.request.params.get("api_key")).toBe('zdUP8ElJv1cehFM0rsZVSQN7uBVxlDnu4diHlLSb');
      expect(req.request.params.get("thumbs")).toBe("true");
      expect(req.request.params.get("concept_tags")).toBe("true");

      //Le pasamos el resultado
      req.flush(mockApod);

      //ASSERT
      //comprobamos que la salida es la esperada
      expect(result).toEqual(mockApod);
      expect(result?.title).toBe('Marte');
    })

  it('errores de red (404)', () => {
  // ARRANGE
  const status = 404;
  const statusText = 'Not Found';
  const errorMessage = 'No encontrado';
  

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

  // capturamos la petición
  const req: TestRequest = httpMock.expectOne(request => 
    request.url.includes('planetary/apod')
  );

  // Simulamos la respuesta
  req.flush(errorMessage, { status, statusText });

  //  ASSERT 
  expect(actualError?.status).toBe(status);
  expect(actualError?.error).toBe(errorMessage);
});



it('getLastSixImages() debería calcular el rango de 6 días y devolver el array de APODs', () => {
  // ARRANGE
  let result: ApodResponse[] | undefined;

  // Calculamos las fechas 
  const hoy = new Date();
  const expectedEndDate = hoy.toISOString().split('T')[0];
  
  const seisDiasAtras = new Date(hoy);
  seisDiasAtras.setDate(hoy.getDate() - 5);
  const expectedStartDate = seisDiasAtras.toISOString().split('T')[0];

  // ACT
  service.getLastSixImages().subscribe(data => {
    result = data;
  });

  // capturamos la llamada
  const req: TestRequest = httpMock.expectOne(request => 
    request.url.includes('planetary/apod')
  );
  // Respondemos con el array
  req.flush(mockApodArray);

  // ASSERT
  // comprobamos que los datos son los correcots
  expect(result).toEqual(mockApodArray);
  expect(result?.length).toBe(2);

  // comprobamos que la petición es correcta
  expect(req.request.method).toBe('GET');
  
  //comprobamos los parámetros
  expect(req.request.params.get('api_key')).toBe('zdUP8ElJv1cehFM0rsZVSQN7uBVxlDnu4diHlLSb');
  expect(req.request.params.get('start_date')).toBe(expectedStartDate);
  expect(req.request.params.get('end_date')).toBe(expectedEndDate);
  expect(req.request.params.get('thumbs')).toBe('true');
});
});
