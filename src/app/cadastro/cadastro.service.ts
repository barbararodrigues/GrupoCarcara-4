import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mergeMap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { LoginService } from '../login/login.service';
import { AuthService } from '../shared/services/auth/auth.service';
import { CadastroCredenciais, CadastroResponse } from './cadastro.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor(private HttpClient: HttpClient, private authService: AuthService, private LoginService: LoginService) { }

  cadastrar(credenciais: CadastroCredenciais) {
    return this.HttpClient.post<CadastroResponse>(environment.baseURL + '/usuarios', credenciais)
    .pipe(
      mergeMap(() => {
        return this.LoginService.logar({
          usuario: credenciais.login,
          senha: credenciais.senha
      })
      })
    )
  }
}
