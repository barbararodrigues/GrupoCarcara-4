import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { CadastroResponse } from './cadastro.interfaces';
import { CadastroService } from './cadastro.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  @ViewChild('cpfInput') cpfInput: ElementRef | undefined
  @ViewChild('loginInput') usuarioInput: ElementRef | undefined
  @ViewChild('nomeInput') nomeInput: ElementRef | undefined
  @ViewChild('senhaInput') senhaInput: ElementRef | undefined
  @ViewChild('resenhaInput') resenhaInput: ElementRef | undefined

  constructor(private CadastroService: CadastroService, private route: Router) { }

  cpf = ''
  login = ''
  nome = ''
  senha = ''
  resenha = ''


  estaCarregando: boolean = false;
  erorNoCadastro: boolean = false;

  ngOnInit(): void {

    
  }

  onSubmit(form: NgForm) {
    try {
      this.erorNoCadastro = false;
      if (!form.valid) {
        form.controls.login.markAsTouched();
        form.controls.senha.markAsTouched();
        return;
      }
      this.cadastrar();
    }
    catch (error) {
      console.log(`Erro no método: OnSubmit.Cadastro: ${error}`);
    }
  }



  cadastrar() {
    try {
      this.estaCarregando = true;
      const credenciais = {
        cpf: this.cpf,
        login: this.login,
        nome: this.nome,
        senha: this.senha
      };
      this.CadastroService.cadastrar(credenciais)
        .subscribe(
          response => this.onSuccessCadastro(response),
          error => this.onErrorCadastro(error)
        );
    }
    catch (error) {
      console.log(`Erro no método: Cadastrar.Cadastro: ${error}`);
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
      console.log(`Erro no método: exibeErro.Cadastro: ${error}`);
    }
    return false;
  }

  verificaResenha(): boolean {
    try {
      if (this.senha != this.resenha) {
        return true;
      }
    } catch (error) {
      console.log(`Erro no método: verificaResenha.Cadastro: ${error}`);
    }
    return false;
  }

  verificaForm(form: NgForm): boolean {
    try {
      if (!form.invalid) {
        return true;
      }
    } catch (error) {
      console.log(`Erro no método: verificaResenha.Cadastro: ${error}`);
    }
    return false;
  }

  
  onSuccessCadastro(response: CadastroResponse) {
    try {
      this.route.navigate(['dashboard']);
    }
    catch (error) {
      console.log(`Erro no método: onSuccessCadastro.Cadastro: ${error}`);
    }
  }
  onErrorCadastro(error: any) {
    try {
      console.log("Erro", error)
      this.erorNoCadastro = true;
      this.estaCarregando = false;
    }
    catch (error) {
      console.log(`Erro no método: onErrorCadastro.Cadastro: ${error}`);
    }
  }


}
