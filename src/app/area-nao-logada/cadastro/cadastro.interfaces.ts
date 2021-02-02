import { conta, contaCredito } from '../../shared/interfaces/conta.interfaces';
import { usuario } from '../../shared/interfaces/usuario.interfaces';

export interface CadastroCredenciais {
  cpf: string,
  nome: string,
  login: string;
  senha: string;
}

export interface CadastroResponse {
  conta: conta
  contaCredito: contaCredito;
  dataFim: Date;
  dataInicio: Date;
  token: string;
  usuario: usuario
}
