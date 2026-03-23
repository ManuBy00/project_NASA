import { effect, Injectable, signal } from '@angular/core';
import { ApodResponse } from '../../domains/apod/models/ApodResponse';

@Injectable({
  providedIn: 'root',
})
export class FavService {
  private storageKey = 'nasa_favs';
  favorites = signal<ApodResponse[]>(this.loadFromStorage());

  /**
   * si detecta cambio en el signal, actualiza el localstorage con la lista de favoritos
   */
  constructor(){
    effect(() => {
      localStorage.setItem(this.storageKey, JSON.stringify(this.favorites()))
  })
  }
  
  /**
   * carga la list de apods de local storage
   * @returns 
   */
  loadFromStorage(): ApodResponse[] {
    
    const data = localStorage.getItem(this.storageKey);

    // Si es null o undefined, devolvemos array vacío
    if (!data || data === 'undefined') {
      return [];
    }

    // devolvemos la info formateada a json
    return JSON.parse(data);
    
  }

  /**
   *  añade el apod recibido a la lista de favoritos
   * @param apod 
   */
  addFav(apod:ApodResponse){
    const date = apod.date;
    const current = this.favorites();
    //si no se encuentra un apod con la misma fecha, se añade a al lista
    if(!this.isFavourite(apod)){
      this.favorites.set([...current, apod]);
      console.log("añadido a la lista")
    } else {
      // SI YA EXISTE: Filtramos la lista para quedarnos con todos MENOS con este
      this.favorites.set(current.filter( f => f.date !== date ));
    }
  }

  isFavourite(apod: ApodResponse): boolean{
    const date = apod.date;
    if(this.favorites().some(f => f.date === date)){
        return true;
    }else{
      return false;
    }

  }
}
