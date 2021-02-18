import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-area-logada',
  templateUrl: './area-logada.component.html',
  styleUrls: ['./area-logada.component.scss']
})
export class AreaLogadaComponent{

  constructor(private router: Router) { }

  mostrarDireitoAutoral: boolean = false;

  changeOfRoutes(){
    this.verificarDireitoAutoral();
  }

  verificarDireitoAutoral(){    
    if(this.router.url == "/signedIn/home"){
      this.mostrarDireitoAutoral = true;
    }
    else{
      this.mostrarDireitoAutoral = false;
    }
  }

}
