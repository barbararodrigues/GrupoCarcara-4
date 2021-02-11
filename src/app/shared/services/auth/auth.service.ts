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

  setUsuario(usuario: usuario) {
    try {
      this.usuario = usuario;
      localStorage.setItem('usuario', JSON.stringify(usuario));
    }
    catch (error) {
      console.log(`Erro no método: setUsuario.Auth: ${error}`);
    }
  }

  setToken(token: string) {
    try {
      this.token = token;
      localStorage.setItem('token', token);
    }
    catch (error) {
      console.log(`Erro no método: setToken.Auth: ${error}`);
    }
  }

  setFimToken(fimToken: string) {
    try {
      this.fimToken = new Date(fimToken);
      localStorage.setItem('tokenTime', fimToken);
    }
    catch (error) {
      console.log(`Erro no método: setFimToken.Auth: ${error}`);
    }
  }

  getUsuario() {
    try {
      if (this.usuario) {
        return this.usuario;
      }
      const usuarioLocalStorage = localStorage.getItem('usuario');
      if (usuarioLocalStorage) {
        this.usuario = JSON.parse(usuarioLocalStorage);
        return this.usuario;
      }
    }
    catch (error) {
      console.log(`Erro no método: getUsuario.Auth: ${error}`);
    }
    return undefined;
  }

  getToken() {
    try {
      if (this.token) {
        return this.token;
      }
      const tokenLocalStorage = localStorage.getItem('token');
      if (tokenLocalStorage) {
        this.token = tokenLocalStorage;
        return this.token;
      }
    }
    catch (error) {
      console.log(`Erro no método: getToken.Auth: ${error}`);
    }
    return undefined;
  }

  getFimToken() {
    try {
      if (this.fimToken) {
        return this.fimToken;
      }
      const tokenTimeLocalStorage = localStorage.getItem('usuario');
      if (tokenTimeLocalStorage) {
        this.fimToken = new Date(tokenTimeLocalStorage);
        return this.fimToken;
      }
    }
    catch (error) {
      console.log(`Erro no método: getFimToken.Auth: ${error}`);
    }
    return undefined;
  }

  logOutsuario() {
    try {
      localStorage.clear();
      delete this.token;
      delete this.usuario;
      delete this.fimToken;
    }
    catch (error) {
      console.log(`Erro no método: logOutsuario.Auth: ${error}`);
    }
  }

  estaLogado() {
    try {
      if (this.getUsuario() && this.getToken()) {
        return true;
      }
    }
    catch (error) {
      console.log(`Erro no método: estaLogado.Auth: ${error}`);
    }
    return false;
  }

}
