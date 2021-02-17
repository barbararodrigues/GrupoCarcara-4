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

   getPlanoConta(): Observable<PlanoContaResponse[]> {
    return this.HttpClient.get<PlanoContaResponse[]>(environment.baseURL + '/planoconta', {
      // headers: {
      //   'Authorization': this.authService.getToken()!,
      // },
      params: {
        // login: this.authService.getUsuario()!.login,
        login :'barbara'
      }
    });
  };

  getPlanoContaTipoLancamento(tipoLancamento: string): Observable<PlanoContaResponse[]> {
    return this.HttpClient.get<PlanoContaResponse[]>(environment.baseURL + '/planoconta/param', {
      // headers: {
      //   'Authorization': this.authService.getToken()!,
      // },
      params: {
        // login: this.authService.getUsuario()!.login,
        login :'barbara',
        tipoLancamento

      }
    });
  };


  save(body: any) : Observable<any> {
    return this.HttpClient.post(environment.baseURL + "/planoconta", body, {
      // headers: {
      //   'Authorization': this.authService.getToken()!,
      // }
    })            
  };


  put(body:any, id: number){
    return this.HttpClient.put(environment.baseURL + "/planoconta/"+id, body, {
      // headers: {
      //   'Authorization': this.authService.getToken()!,
      // }
    })   
  }


  delete(id: number){

  }

}

