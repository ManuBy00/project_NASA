import { TestBed } from '@angular/core/testing';
import { ApodResponse } from '../../domains/apod/models/ApodResponse';
import { FavService } from './fav-service';


describe('FavService', () => {
  let service: FavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavService);
  });

  it('el apod se añade a favoritos', () => {
    //apod de ejemplo
    const mockApod: ApodResponse = {
  date: '2026-04-06',
  explanation: 'ejemplo. .',
  title: 'ejemplo',
  url: 'https://apod.nasa.gov/apod/image/mock_url.jpg',
  media_type: 'image',
  hdurl: 'https://apod.nasa.gov/apod/image/mock_hdurl.jpg',
  copyright: 'Observatorio de Prueba',
  service_version: 'v1'
};
  //lo añadimos a favoritos
  service.addFav(mockApod);

  //comprobamos que se haya añadido
  expect(service.isFavourite(mockApod)).toBeTruthy();
  expect(service.isFavourite(mockApod)).toBeTruthy();
  });
});
