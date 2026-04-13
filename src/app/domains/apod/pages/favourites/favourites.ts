import { Component, computed, ElementRef, inject, signal, ViewChild } from '@angular/core';
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

  //LISTA FAVORITOS SIN FILTROS
  favourites = this.favService.favorites;

  //SEARCH INPUT PARA FILTRAR POR NOMBRE
  @ViewChild('searchInput') searcher!: ElementRef<HTMLInputElement>;
  //PALABRA QUE FILTRA
  searchTerm = signal('');

  //LISTA FILTRADA POR NOMBRE. SI NO TIENE NINGÚN INPUT, DEVUELVE LA LISTA SIN FILTRAR
  filteredFav = computed(() => {
    const wordToSearch = this.searchTerm().toLocaleLowerCase();
    const list = this.favourites();

    if(!wordToSearch) return list;

    return list.filter(apod => 
      apod.title.toLowerCase().includes(wordToSearch)
    )
  })

  
  
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

  //cambia la palabra de búsqueda obteniendo el valor del input search
  searchByWord(){
    this.searchTerm.set(this.searcher.nativeElement.value.trim())
  }

}
