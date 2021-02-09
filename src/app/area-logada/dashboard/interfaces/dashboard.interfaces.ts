import { Lancamento } from 'src/app/shared/interfaces/lancamento.interfaces';

export interface DashboardResponse {
  contaBanco: ContaBanco;
  contaCredito: ContaBanco;
  lancamentosExibidos: Lancamento[];
}

export interface ContaBanco {
  id: number;
  lancamentos: Lancamento[];
  saldo: number;  
}
