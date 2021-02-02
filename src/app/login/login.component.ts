import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginResponse } from './login.interfaces';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @ViewChild('usuarioInput') usuarioInput: ElementRef | undefined
  @ViewChild('senhaInput') senhaInput: ElementRef | undefined

  usuario = ''
  senha = ''

  estaCarregando: boolean = false;
  erorNoLogin: boolean = false;

  constructor(private LoginService: LoginService, private route: Router) { }
  onSubmit(form: NgForm) {
    this.erorNoLogin = false;
    if (!form.valid) {
      form.controls.usuario.markAsTouched();
      form.controls.senha.markAsTouched();

      if (form.controls.usuario.invalid) {
        this.usuarioInput?.nativeElement.focus();
      }

      if (form.controls.senha.invalid) {
        this.senhaInput?.nativeElement.focus();
      }

      return;
    }

    this.login();
  }

  exibeErro(nomeControle: string,form: NgForm) {
    if(!form.controls[nomeControle]){
      return false;
    }
    return form.controls[nomeControle].invalid && form.controls[nomeControle].touched;
  }

  login() {
    this.estaCarregando = true;
    const credenciais = {
      usuario: this.usuario,
      senha: this.senha
    };
    this.LoginService.logar(credenciais)
      .subscribe(
        response => this.onSuccessLogin(response),
        error => this.onErrorLogin(error)
      );
  }

  onSuccessLogin(response: LoginResponse) {

    this.route.navigate(['dashboard'])
  }
  onErrorLogin(error: any){
     console.log("Erro", error)
     this.erorNoLogin = true;
     this.estaCarregando = false;
  }

}
