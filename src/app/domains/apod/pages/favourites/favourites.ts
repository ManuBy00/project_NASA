import { Component, inject, signal } from '@angular/core';
import { Header } from '../../../../shared/components/header/header';
import { ApodItem } from '../../components/apod-item/apod-item';
import { ApodResponse } from '../../models/ApodResponse';
import { FavService } from '../../../../shared/services/fav-service';

@Component({
  selector: 'app-favourites',
  imports: [Header, ApodItem],
  templateUrl: './favourites.html',
  styleUrl: './favourites.css',
})
export class Favourites {

  favService = inject(FavService);
  favourites = this.favService.favorites;

}
