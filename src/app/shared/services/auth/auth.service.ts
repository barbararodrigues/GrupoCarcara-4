import { Injectable } from '@angular/core';

import { usuario } from '../../interfaces/usuario.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario: usuario | undefined
  token: string | undefined

  constructor() { }

  setUsuario(usuario: usuario){
    this.usuario = usuario;
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  setToken(token: string){
    this.token = token;
    localStorage.setItem('token', token);
  }

  getUsuario() {
    if(this.usuario){
      return this.usuario;
    }
    const usuarioLocalStorage = localStorage.getItem('usuario');
    if(usuarioLocalStorage) {
      this.usuario = JSON.parse(usuarioLocalStorage);
      return this.usuario;
    }
    return undefined;
  }
  getToken() {
    if(this.token){
      return this.token;
    }
    const tokenLocalStorage = localStorage.getItem('token');
    if(tokenLocalStorage) {
      this.token = tokenLocalStorage;
      return this.token;
    }
    return undefined;
  }

  logoutsuario(){
    localStorage.clear();
    delete this.token;
    delete this.usuario;
  }

  estaLogado(){
    if(this.getUsuario() && this.getToken()){
      return true
    }
    return false;
  }

  naoEstaLogado(){
    if(!this.getUsuario() || !this.getToken()){
      return true
    }
    return false;
  }
}
