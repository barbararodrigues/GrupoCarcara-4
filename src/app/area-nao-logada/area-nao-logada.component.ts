import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-area-nao-logada',
  templateUrl: './area-nao-logada.component.html',
  styleUrls: ['./area-nao-logada.component.scss']
})
export class AreaNaoLogadaComponent implements OnInit {

  constructor(private router: Router) { }

  mostrarDireitoAutoral: boolean = false;

  ngOnInit(): void {
  }

  changeOfRoutes(){
    this.verificarDireitoAutoral();
  }

  verificarDireitoAutoral(){
    debugger
    if(this.router.url == "/home"){
      this.mostrarDireitoAutoral = true;
    }
    else{
      this.mostrarDireitoAutoral = false;
    }
  }
}
