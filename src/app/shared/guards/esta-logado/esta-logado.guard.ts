import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EstaLogadoGuard implements CanActivate {
constructor(private AuthService: AuthService, private route: Router){}

  canActivate(): boolean{
    const estaLogado = this.AuthService.estaLogado();

    if(estaLogado){
      return true
    }
    this.route.navigate(['']);

    return true;
  }

}
