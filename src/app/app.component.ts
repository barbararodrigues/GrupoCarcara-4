import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'minha-aplicacao';

  recebeNumero(resposta: Event): void {
    console.log('Componente pai recebeu: ' + resposta);
  }
}
