import { Component, computed, inject, Sanitizer, signal } from '@angular/core';
import { ApodService } from '../../../../shared/services/apod-service';
import { ApodResponse } from '../../models/ApodResponse';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { getSafePropertyAccessString } from '@angular/compiler';
import { DatePipe } from '@angular/common';
import { FavService } from '../../../../shared/services/fav-service';
import { DomSanitizer } from '@angular/platform-browser';
import { Header } from '../../../../shared/components/header/header';
import { HeaderService } from '../../../../shared/services/header-service';

@Component({
  selector: 'app-details-page',
  imports: [RouterLink, Header],
  templateUrl: './details-page.html',
  styleUrl: './details-page.css',
})
export class DetailsPage {
  movieService = inject(ApodService);
  fav = inject(FavService);
  headerService = inject(HeaderService)

  //apod del que se piden los detalles
  apod = signal<ApodResponse| null>(null);
  //variables de estado
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null >(null);

  //Computed que comprueba si el apod está en favoritos. Devuelve un boolean.
  isFavourite = computed(() => {
    const apod = this.apod()
    if (!apod){
      return false;
    }else{
      return this.fav.isFavourite(apod);
    }
  })


  constructor(private route: ActivatedRoute){

  }

  /**
   * recoge el parámetro date de la url y llama al método para cargar el apod
   */
  ngOnInit(){
    this.route.params.subscribe(params => {
      const date = params['date']
      if (date){
        this.getApod(date);
      }
    })

    this.headerService.setHeaderInputs("","")
  }

  /**
   * obtiene el apod seleccionado usando la fecha como id y lo carga en pantalla
   * @param date apod seleccionado
   */
  getApod(date:string){
    this.isLoading.set(true);
    this.movieService.getOneApod(date).subscribe({
      next: (newApod) => {
        this.apod.set(newApod);
        this.isLoading.set(false);
      },

      error: (err) => {
        console.error('Hubo un error trayendo la imagen', err);
        this.isLoading.set(false);
      }
    })
  };  

/**
 * añade un apod a favoritos a través del favService
 */
  addToFavourites(){
    const apodToAdd = this.apod();
    if (apodToAdd) this.fav.addFav(apodToAdd);
  }
  
}
