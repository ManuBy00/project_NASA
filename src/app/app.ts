import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('NASA');
  private translate = inject(TranslateService);

 constructor() {
    // El idioma de rescate (Si falta un texto búscalo en inglés)
    this.translate.setFallbackLang('en');
    
    // El idioma que el usuario está viendo ahora mismo en pantalla
    this.translate.use('en'); 
  }
  
}
