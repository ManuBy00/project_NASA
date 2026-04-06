import { ApodResponse } from "../domains/apod/models/ApodResponse";


export interface apodState {
  items: ApodResponse[];
  
 
  loading: boolean;
  
  
  error: string | null;

}

export const initialState: apodState = {
  items: [],
  loading: false,
  error: null,
};