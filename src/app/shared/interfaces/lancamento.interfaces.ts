import { PlanoConta } from './planoConta.interfaces';


export interface Lancamento {
  conta: number;
  data: string;
  descricao: string;
  id: number;
  planoConta: PlanoConta;
  tipo: string;
  valor: number;
}
