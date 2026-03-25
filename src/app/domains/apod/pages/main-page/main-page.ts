import { Component, inject, signal } from '@angular/core';
import { Header } from '../../../../shared/components/header/header';
import { ApodService } from '../../../../shared/services/apod-service';
import { ApodResponse } from '../../models/ApodResponse';
import { ApodItem } from '../../components/apod-item/apod-item';
import { HeaderService } from '../../../../shared/services/header-service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';




@Component({
  selector: 'app-main-page',
  imports: [ApodItem],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage {
  private apodService = inject(ApodService);
  private headerService = inject(HeaderService)
  private translateService = inject(TranslateService)

  entries = signal<ApodResponse[]>([]);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  //con rxResorce nos ahorramos las variables de estado porque las integrala propia clase. sería así (#17 del curso avanzado):
  // loadEntriesRx = rxResource({
  //  stream: () => this.apodService.getLastSixImages()
  //});

  //configura los inputs del header
  ngOnInit(): void {
    this.translateService.stream([
      'HEADER.POST_TITTLE_MAIN',
      'HEADER.POST_SUBTITLE_MAIN'
    ]).subscribe(() => {
       this.headerService.setHeaderInputs(this.translateService.instant('HEADER.POST_TITTLE_MAIN'), this.translateService.instant('HEADER.POST_SUBTITLE_MAIN'))
    })

    this.loadEntries()
  }

  /**
   * Carga los apod llamando al service y las añade al array de entries
   */
  loadEntries(){
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.apodService.getLastSixImages().subscribe({
      next: (response) => {
        console.log('recibiendo datos')
        this.entries.set(this.orderByDate(response))
        this.isLoading.set(false);
      },
      
      error: (err) => {
        console.log('Error en la llamada a la API', err)
        this.errorMessage.set('No se pudieron cargar las imágenes. Por favor, inténtalo de nuevo. ');
        this.isLoading.set(false);
      }
    });
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

