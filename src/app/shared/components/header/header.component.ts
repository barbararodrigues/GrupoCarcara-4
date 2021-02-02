import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {

  logado:boolean | undefined;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(){
    this.logado = this.authService.estaLogado();
  }

  ngOnChanges(){
    this.logado = this.authService.estaLogado();
  }

  logout(){
    this.authService.logOutsuario()
    this.router.navigate(['login']);
  }

}
