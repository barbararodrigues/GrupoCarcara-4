import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

import { environment } from '../../../environments/environment';
import { dashboardResponse } from './dashboard.interfaces';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private HttpClient: HttpClient, private authService: AuthService) { }

  getDashboard(inicio: string, fim: string): Observable<dashboardResponse> {
    return this.HttpClient.get<dashboardResponse>(environment.baseURL + '/dashboard', {
      headers: {
        'Authorization': this.authService.getToken()!,
      },
      params: {
        login: this.authService.getUsuario()!.login,
        inicio,
        fim
      }
    });
  }
}

