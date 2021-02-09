import { Injectable } from '@angular/core';

import { usuario } from '../../interfaces/usuario.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario: usuario | undefined;
  token: string | undefined;
  fimToken: Date | undefined;

  constructor() { }

  setUsuario(usuario: usuario){
    this.usuario = usuario;
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  setToken(token: string){
    this.token = token;
    localStorage.setItem('token', token);
  }

  setFimToken(fimToken: string){
    this.fimToken = new Date(fimToken);    
    localStorage.setItem('tokenTime', fimToken);
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

  getFimToken() {
    if(this.fimToken){
      return this.fimToken;
    }
    const tokenTimeLocalStorage = localStorage.getItem('usuario');
    if(tokenTimeLocalStorage) {
      this.fimToken = new Date(tokenTimeLocalStorage);
      return this.fimToken;
    }
    return undefined;
  }

  logOutsuario(){
    localStorage.clear();
    delete this.token;
    delete this.usuario;
    delete this.fimToken;
  }

  estaLogado(){
    if(this.getUsuario() && this.getToken()){      
      return true;
      /*let horaAtual = new Date();      
      if(horaAtual < (this.getFimToken() as Date)){
        return true
      } */           
    }
    return false;
  }
  
}
