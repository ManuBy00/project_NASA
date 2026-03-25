import { Component, inject, signal } from '@angular/core';
import { Header } from '../../../../shared/components/header/header';
import { ApodItem } from '../../components/apod-item/apod-item';
import { ApodResponse } from '../../models/ApodResponse';
import { FavService } from '../../../../shared/services/fav-service';
import { HeaderService } from '../../../../shared/services/header-service';

@Component({
  selector: 'app-favourites',
  imports: [Header, ApodItem],
  templateUrl: './favourites.html',
  styleUrl: './favourites.css',
})
export class Favourites {

  favService = inject(FavService);
  headerService = inject(HeaderService)
  favourites = this.favService.favorites;

  ngOnInit(){
    this.headerService.setHeaderInputs("Check your favourites images!","You can add an apod to favourites an image so you don't lose it after 6 days")
  }

}
