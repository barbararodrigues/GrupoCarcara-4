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

  constructor(private CadastroService: CadastroService, private route: Router) { }

  cpf = ''
  login = ''
  nome = ''
  senha = ''


  estaCarregando: boolean = false;
  erorNoCadastro: boolean = false;

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.erorNoCadastro = false;
    if (!form.valid) {
      form.controls.login.markAsTouched();
      form.controls.senha.markAsTouched();
      return;
    }

    this.cadastrar();
  }
  cadastrar() {
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

  exibeErro(nomeControle: string,form: NgForm) {
    if(!form.controls[nomeControle]){
      return false;
    }
    return form.controls[nomeControle].invalid && form.controls[nomeControle].touched;
  }

  onSuccessCadastro(response: CadastroResponse) {

    this.route.navigate(['dashboard'])
  }
  onErrorCadastro(error: any){
     console.log("Erro", error)
     this.erorNoCadastro = true;
     this.estaCarregando = false;
  }


}
