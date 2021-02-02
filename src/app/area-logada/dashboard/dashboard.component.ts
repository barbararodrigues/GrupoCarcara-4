import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { usuario } from 'src/app/shared/interfaces/usuario.interfaces';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

import { dashboardResponse } from './dashboard.interfaces';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  usuario: usuario | undefined;
  dashboard: dashboardResponse | undefined;

  estaCarregando: boolean = false;
  erro = false;

  constructor(private authService: AuthService, private dashboardService: DashboardService) { }

  ngOnInit() {

    this.usuario = this.authService.getUsuario();
    this.getDashboard();
  }

  inicio = '2021-01-01';
  fim = '2021-02-02';

  getDashboard() {
    this.estaCarregando = true;
    this.erro = false;

    this.dashboardService.getDashboard(this.inicio, this.fim)
    .pipe(
      finalize(() => this.estaCarregando = false)
    )
    .subscribe(
      response => this.onSuccess(response),
      error => this.onError
    )
  }

  onSuccess(response: any) {
    this.dashboard = response;
    console.log("Sucesso")
  }
  onError(error: any){
     console.log("Erro", error)
     this.erro = true;
  }

  getBordaCardCSS(saldo: number){
    return {
      'border-success': saldo > 0,
       'border-danger': saldo < 0
    }
  }
  getTextSaldoCSS(saldo : number) {
    return {
      'text-success': saldo > 0,
      'text-danger': saldo < 0
    }
  }
}
