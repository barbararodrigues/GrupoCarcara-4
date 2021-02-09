import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NaoEstaLogadoGuard implements CanActivate {

  constructor(private AuthService: AuthService, private route: Router){}


  canActivate(): boolean{
    const naoEstaLogado = !this.AuthService.estaLogado();

    if(naoEstaLogado){
      return true
    }
    this.route.navigate(['signedIn/dashboard']);

    return true;
  }

}
