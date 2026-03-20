import { Component, inject, signal } from '@angular/core';
import { ApodService } from '../../../../../shared/services/apod-service';
import { ApodResponse } from '../../../models/ApodResponse';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { getSafePropertyAccessString } from '@angular/compiler';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-details-page',
  imports: [RouterLink],
  templateUrl: './details-page.html',
  styleUrl: './details-page.css',
})
export class DetailsPage {
  movieService = inject(ApodService);

  apod = signal<ApodResponse| null>(null);

  constructor(private route: ActivatedRoute){

  }

  ngOnInit(){
    this.route.params.subscribe(params => {
      const date = params['date']
      if (date){
        this.getApod(date);
      }
    })
  }

  getApod(date:string){
    this.movieService.getOneApod(date).subscribe
    (newApod => {
      this.apod.set(newApod)
    })
    
  }
  
}
