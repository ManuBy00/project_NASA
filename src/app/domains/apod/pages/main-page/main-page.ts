import { Component, inject, signal } from '@angular/core';
import { Header } from '../../../../shared/components/header/header';
import { ApodService } from '../../../../shared/services/apod-service';
import { ApodResponse } from '../../models/ApodResponse';
import { ApodItem } from '../../components/apod-item/apod-item';
import { HeaderService } from '../../../../shared/services/header-service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Store } from '../../../../store/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-page',
  imports: [ApodItem],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage {
  private store = inject(Store)
  private headerService = inject(HeaderService)
  private translateService = inject(TranslateService)

  entries = this.store.getApodList;
  isLoading = this.store.isLoading;
  errorMessage = this.store.getErrorMessage;

  private translateSub?: Subscription;


  //con rxResorce nos ahorramos las variables de estado porque las integrala propia clase. sería así (#17 del curso avanzado):
  // loadEntriesRx = rxResource({
  //  stream: () => this.apodService.getLastSixImages()
  //});

  /**
   * Inicializa el componente configurando el header y gestionando los datos desde el Store.
   * Es necesario abrir un stream porque el componente se inicializa antes que las traducciones.
   * * @returns {void}
   */
  ngOnInit(): void {
    this.translateSub = this.translateService.stream([
      'HEADER.POST_TITTLE_MAIN',
      'HEADER.POST_SUBTITLE_MAIN'
    ]).subscribe(() => {
       this.headerService.setHeaderInputs(this.translateService.instant('HEADER.POST_TITTLE_MAIN'), this.translateService.instant('HEADER.POST_SUBTITLE_MAIN'))
    })

    if (this.entries().length === 0) {
      this.store.dispatch({ type: '[APOD] Load Request' });
    }
  }

  /**
   * Al desturir el componente, cierra la suscripción
   */
  ngOnDestroy(): void {
    this.translateSub?.unsubscribe();
    console.log('Suscripción cerrada');
  }
}

