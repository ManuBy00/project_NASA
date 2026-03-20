import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { ApodResponse } from '../../domains/apod/models/ApodResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApodService {
  private http = inject(HttpClient)
  private readonly baseUrl = 'https://api.nasa.gov/planetary/apod';
  private readonly apikey = 'zdUP8ElJv1cehFM0rsZVSQN7uBVxlDnu4diHlLSb';

  private endDate = signal<Date>(new Date); //hoy
  
  private sixDaysAgo = computed(()=> {
    const hoy = new Date(this.endDate());
    hoy.setDate(hoy.getDate() - 5);
    return hoy.toISOString().split('T')[0];
  }
  )


//ejemplo: https://api.nasa.gov/planetary/apod?api_key=zdUP8ElJv1cehFM0rsZVSQN7uBVxlDnu4diHlLSb&start_date=2023-12-25&end_date=2023-12-31&thumbs=True
  
  getLastSixImages():Observable<ApodResponse[]>{
    return this.http.get<ApodResponse[]>(`${this.baseUrl}`, {
      params: {
        api_key: this.apikey,
        start_date: this.sixDaysAgo(),
        end_date: this.endDate().toISOString().split('T')[0],
        thumbs: true
      }
    });
  }

}
