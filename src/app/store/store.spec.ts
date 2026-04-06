import { TestBed } from '@angular/core/testing';

import { Store } from './store';
import { inject } from 'vitest';

import { apodActions } from './apodActions';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Action } from 'rxjs/internal/scheduler/Action';
import { initialState } from './apodState';



describe('Store', () => {
  let service: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Store, provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('reducer', ()=>{
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({

    });
    store = TestBed.inject(Store);
  });

  it('recibe acción load, devuelve state con loading true', ()=> {
    //arrange
  
  let actionRequest:apodActions = {type: '[APOD] Load Request'};
  //let actionSuccess:apodActions = {type: '[APOD] Load Success'};
  //let actionError:apodActions = {type: '[APOD] Load Failure'};
  //let actionClear:apodActions = {type: '[APOD] Clear List'};

  //act
  const espia = vi.spyOn(store as any, 'loadFromApi');
  store.dispatch(actionRequest)

  //assert
  expect(store.isLoading()).toBeTruthy()
  expect(espia).toHaveBeenCalled();
  });

  it('recibe acción load request, devuelve loading false y payload.', ()=> {
    //arrange
 
    let actionSuccess: apodActions = { 
    type: '[APOD] Load Success', 
    payload: [] 
  };
  
  
  store.dispatch(actionSuccess)


  //assert
  expect(store.isLoading()).toBeFalsy();
 
  })

  it('debería guardar el mensaje de error y apagar loading al fallar la API', () => {
  // ARRANGE
  const errorMessage = 'Error 403: Forbidden';
  const actionError: apodActions = { 
    type: '[APOD] Load Failure', 
    error: errorMessage 
  }

  // ACT
  store.dispatch(actionError)

  // ASSERT
  expect(store.isLoading()).toBe(false);
  expect(store.getErrorMessage()).toBe(errorMessage);
});
  


})
