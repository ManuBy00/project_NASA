import { Component, inject, signal } from '@angular/core';
import { Header } from '../../../../shared/components/header/header';
import { ApodService } from '../../../../shared/services/apod-service';
import { ApodResponse } from '../../models/ApodResponse';
import { ApodItem } from '../../components/apod-item/apod-item';


@Component({
  selector: 'app-main-page',
  imports: [Header, ApodItem],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage {
  private apodService = inject(ApodService);
  entries = signal<ApodResponse[]>([]);

  ngOnInit(): void {
    this.loadEntries()
  }

  /**
   * Carga las películas llamando al service y las añade al array de entries
   */
  loadEntries(){
    this.apodService.getLastSixImages().subscribe({
      next: (response) => {
        console.log('recibiendo datos')
        this.entries.update(currentMovies => [...currentMovies, ...response] )
      },
      error: (error) => {
        console.log('Error en la llamada a la API')
      }
    });
  }
}
