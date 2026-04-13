import { computed, inject, Injectable, signal } from '@angular/core';
import { apodActions } from './apodActions';
import { apodState, initialState } from './apodState';
import { ApodService } from '../shared/services/apod-service';
import { ApodResponse } from '../domains/apod/models/ApodResponse';

@Injectable({
  providedIn: 'root',
})
export class Store {
  private _state = signal<apodState>(initialState)
  private apodService = inject(ApodService);

  //SELECTORES
  public getApodList = computed(() => this._state().items)

  public isLoading = computed(() => this._state().loading)

  public getErrorMessage = computed(()=> this._state().error)


  /**
   * recibe una acción del componente, se la manda al reducer y guarda el nuevo estado del apod. 
   * Si la acción es un loadRequest, la ejecuta a través del effect.
   * @param action acción a ejecutar
   */
  public dispatch(action: apodActions){
    const newState = this.reducer(this._state(), action)
    this._state.set(newState)

    if (action.type === '[APOD] Load Request') {
      this.loadFromApi()
    }
  }

  /**
   * Effect. Hace la petición a la api, y lanza la acción load success al terminar
   */
  loadFromApi(){ //EFFECT
    this.apodService.getLastSixImages().subscribe({
      next: (data) => {
        const filteredList = this.orderByDate(data)
        this.dispatch({type: '[APOD] Load Success', payload: filteredList});
      },
      error: (err) => {
        this.dispatch({ type: '[APOD] Load Failure', error: 'Error de conexión'})
      }
    });
  }

  /**
   * Coordina las diferentes acciones y devuelve un apodState resultante
   * @param state 
   * @param action 
   * @returns 
   */
  private reducer(state: apodState, action: apodActions): apodState {
    switch(action.type){
      case '[APOD] Load Request' :
        return {
          ...state,
          loading: true,
          error: null
        };

    case '[APOD] Load Success':
      return {
        ...state,
        items: action.payload,
        loading: false
      };

    case '[APOD] Load Failure':
      return{
        ...state,
        error: action.error,
        loading: false
      };
      
    case '[APOD] Clear List':
      return {...initialState};

    default:
      return state;  
    }
  }

  /**
     * ordena la lista de apod por fecha
     * @param apodList lista a ordenar
     * @returns lista ordenada por fecha
     */
    orderByDate(apodList:ApodResponse[]){
      return apodList.sort((a, b) => {
        const timeA = new Date(a.date).getTime();
        const timeB = new Date(b.date).getTime();
  
        return timeB - timeA;
      });
    }
}
