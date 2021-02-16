import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { environment } from '../../../environments/environment';
import { DashboardResponse } from './interfaces/dashboard.interfaces';
import { LancamentoBody } from './interfaces/lancamento-body.interfaces';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private HttpClient: HttpClient, private authService: AuthService) { }

  getDashboard(inicio: string, fim: string): Observable<DashboardResponse> {
    return this.HttpClient.get<DashboardResponse>(environment.baseURL + '/dashboard', {
      // headers: {
      //   'Authorization': this.authService.getToken()!,
      // },
      params: {
        // login: this.authService.getUsuario()!.login,
        login: 'barbara',
        inicio,
        fim
      }
    });
  };

  realizarLancamento(body: LancamentoBody) : Observable<any> {
    return this.HttpClient.post(environment.baseURL + "/lancamentos", body, {
      // headers: {
      //   'Authorization': this.authService.getToken()!,
      // }
    })            
  };

}

