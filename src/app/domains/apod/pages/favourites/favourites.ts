import { Component, inject, signal } from '@angular/core';
import { Header } from '../../../../shared/components/header/header';
import { ApodItem } from '../../components/apod-item/apod-item';
import { ApodResponse } from '../../models/ApodResponse';
import { FavService } from '../../../../shared/services/fav-service';
import { HeaderService } from '../../../../shared/services/header-service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-favourites',
  imports: [ ApodItem, TranslateModule],
  templateUrl: './favourites.html',
  styleUrl: './favourites.css',
})
export class Favourites {

  favService = inject(FavService);
  headerService = inject(HeaderService)
  private translate = inject(TranslateService);

  favourites = this.favService.favorites;
  
  /**
   * configura los inputs del header. Como ngOnInit se ejecuta antes de que carguen los diccionarios de translate, hay que usar el método asíncrono .get y una vez recibidos
   * ejecutar el método del headerService
   */
  ngOnInit(){
    this.translate.stream([
      'HEADER.POST_TITTLE_FAVOURITES',
      'HEADER.POST_SUBTITLE_FAVOURITES'

    ]).subscribe(() => {
      this.headerService.setHeaderInputs(this.translate.instant('HEADER.POST_TITTLE_FAVOURITES'), this.translate.instant('HEADER.POST_SUBTITLE_FAVOURITES'))
    })

  }

}
