import { conta, contaCredito } from '../../shared/interfaces/conta.interfaces';
import { usuario } from '../../shared/interfaces/usuario.interfaces';

export interface LoginCredenciais {
  usuario: string;
  senha: string;
}

export interface LoginResponse {
  conta: conta
  contaCredito: contaCredito;
  dataFim: Date;
  dataInicio: Date;
  token: string;
  usuario: usuario
}
