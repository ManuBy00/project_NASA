import { Component, inject } from '@angular/core';
import { Header } from '../../../../shared/components/header/header';
import { HeaderService } from '../../../../shared/services/header-service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  imports: [TranslateModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {

  headerService = inject(HeaderService).setHeaderInputs("","")




  }
