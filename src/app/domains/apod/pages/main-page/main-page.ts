import { Component, inject, signal } from '@angular/core';
import { Header } from '../../../../shared/components/header/header';
import { ApodService } from '../../../../shared/services/apod-service';
import { ApodResponse } from '../../models/ApodResponse';
import { ApodItem } from '../../components/apod-item/apod-item';
import { rxResource } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-main-page',
  imports: [Header, ApodItem],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage {
  private apodService = inject(ApodService);

  entries = signal<ApodResponse[]>([]);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  //con rxResorce nos ahorramos las variables de estado porque las integrala propia clase. sería así (#17 del curso avanzado):
  // loadEntriesRx = rxResource({
  //  stream: () => this.apodService.getLastSixImages()
  //});

  ngOnInit(): void {
    this.loadEntries()
  }

  /**
   * Carga los apod llamando al service y las añade al array de entries
   */
  loadEntries(){
    //variables de estado para informar al usuario
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.apodService.getLastSixImages().subscribe({
      next: (response) => {
        console.log('recibiendo datos')
        this.entries.set(response)
        this.isLoading.set(false);
      },
      
      error: (err) => {
        console.log('Error en la llamada a la API', err)
        this.errorMessage.set('No se pudieron cargar las imágenes. Por favor, inténtalo de nuevo. ');
        this.isLoading.set(false);
      }
    });
  }

}

