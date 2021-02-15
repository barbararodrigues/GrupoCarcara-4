import { HttpClient} from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { environment } from "src/environments/environment";
import { PlanoConta, PlanoContaResponse } from "./interfaces/plano-conta.interfaces";

@Injectable({
  providedIn: 'root'
})
export class PlanoContaService {

  constructor(private HttpClient: HttpClient, private authService: AuthService) { }

  getPlanoConta(): Observable<PlanoContaResponse> {
    return this.HttpClient.get<PlanoContaResponse>(environment.baseURL + '/plano-contas', {
      headers: {
        'Authorization': this.authService.getToken()!,
      },
      params: {
        login: this.authService.getUsuario()!.login,
      }
    });
  };

  save(body: PlanoConta) : Observable<any> {
    return this.HttpClient.post(environment.baseURL + "/plano-conta", body, {
      headers: {
        'Authorization': this.authService.getToken()!,
      }
    })            
  };


  delete(id: number){

  }

}

