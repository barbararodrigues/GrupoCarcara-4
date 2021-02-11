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
    try {
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
    catch (error) {
      console.log(`Erro no método: onSubmit.Login: ${error}`);
    }
  }

  onNewRegister() {
    try {
      this.route.navigate(['signUp'])
    }
    catch (error) {
      console.log(`Erro no método: onNewRegister.Login: ${error}`);
    }
  }

  exibeErro(nomeControle: string, form: NgForm) {
    try {
      if (!form.controls[nomeControle]) {
        return false;
      }
      return form.controls[nomeControle].invalid && form.controls[nomeControle].touched;
    }
    catch (error) {
      console.log(`Erro no método: exibeErro.Login: ${error}`);
    }
    return;
  }

  login() {
    try {
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
    catch (error) {
      console.log(`Erro no método: login.Login: ${error}`);
    }
  }

  onSuccessLogin(response: LoginResponse) {
    try {
      this.route.navigate(['signedIn/dashboard'])
    }
    catch (error) {
      console.log(`Erro no método: onSuccessLogin.Login: ${error}`);
    }
  }
  onErrorLogin(error: any) {
    try {
      console.log("Erro", error)
      this.erorNoLogin = true;
      this.estaCarregando = false;
    }
    catch (error) {
      console.log(`Erro no método: onErrorLogin.Login: ${error}`);
    }
  }

}
