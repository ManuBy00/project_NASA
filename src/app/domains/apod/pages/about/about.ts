import { Component, inject } from '@angular/core';
import { Header } from '../../../../shared/components/header/header';
import { HeaderService } from '../../../../shared/services/header-service';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {

  headerService = inject(HeaderService).setHeaderInputs("","")




  }
