import { effect, Injectable, signal } from '@angular/core';
import { ApodResponse } from '../../domains/apod/models/ApodResponse';

@Injectable({
  providedIn: 'root',
})
export class FavService {
  private storageKey = 'nasa_favs';
  favorites = signal<ApodResponse[]>(this.loadFromStorage());

  constructor(){
    effect(() => {
      localStorage.setItem(this.storageKey, JSON.stringify(this.favorites()))
  })
  }
  
    loadFromStorage(): ApodResponse[] {
    try {
    const data = localStorage.getItem(this.storageKey);

    // 1. Si no hay nada (null) o es la palabra "undefined", devolvemos array vacío
    if (!data || data === 'undefined') {
      return [];
    }

    // 2. Intentamos parsear
    return JSON.parse(data);
    
  } catch (e) {
    // 3. Si el JSON está mal formado, limpiamos y devolvemos vacío
    console.error("Error al parsear favoritos, reseteando...", e);
    return [];
  }
  }

  addFav(apod:ApodResponse){
    const date = apod.date;
    if(!this.favorites().some(f => f.date === date)){
      const current = this.favorites();
      this.favorites.set([...current, apod]);
      console.log("añadido a la lista")
    } 
  }

}
