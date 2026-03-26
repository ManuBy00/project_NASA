import { Component, inject } from '@angular/core';
import { HeaderService } from '../../../../shared/services/header-service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  imports: [TranslateModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {

  headerService = inject(HeaderService)
   private translate = inject(TranslateService);

  ngOnInit(){
    this.translate.stream([
      'HEADER.POST_TITTLE_ABOUT',
      'HEADER.POST_SUBTITLE_ABOUT'

    ]).subscribe(() => {
      this.headerService.setHeaderInputs(this.translate.instant('HEADER.POST_TITTLE_ABOUT'), this.translate.instant('HEADER.POST_SUBTITLE_ABOUT'))
    })
  }

  }
