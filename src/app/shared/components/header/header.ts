import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  standalone: true,
  selector: 'app-header',
  imports: [RouterLink, TranslateModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  public translate = inject(TranslateService);

  phTittle = input<string>("")
  phSubtittle = input<string>("")

  toggleLanguage() {
    // comprobamos idioma actual. Si no hay, ponemos ingles
    const idiomaActual = this.translate.currentLang || 'en';
    
    //se cambia al idioma contrario
    const nuevoIdioma = idiomaActual === 'es' ? 'en' : 'es';
    
    // se ejecuta el cambio
    this.translate.use(nuevoIdioma);
  }


}
