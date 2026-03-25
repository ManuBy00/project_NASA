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
    // 1. Miramos qué idioma está puesto ahora mismo (si no hay, asumimos 'es')
    const idiomaActual = this.translate.currentLang || 'es';
    
    // 2. Si es 'es', lo cambiamos a 'en'. Si no, lo cambiamos a 'es'.
    const nuevoIdioma = idiomaActual === 'es' ? 'en' : 'es';
    
    // 3. Ejecutamos el cambio
    this.translate.use(nuevoIdioma);
  }


}
