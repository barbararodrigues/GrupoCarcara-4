export interface PlanoConta {
    id: number;
    descricao: String;
    login: String;
    tipo_Lancamento: string;
    ativo: boolean;

}

export interface PlanoContaResponse {
    id: number;
    descricao: String;
    login: String;
    tipo_Lancamento: string;
    ativo: boolean;

}