import { Lancamento } from 'src/app/shared/interfaces/lancamento.interfaces';

export interface dashboardResponse {
  contaBanco: ContaBanco;
  contaCredito: ContaBanco;
}

export interface ContaBanco {
  id: number;
  lancamentos: Lancamento[];
  saldo: number;
}
