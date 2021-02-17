export interface PlanoConta {
    id: number;
    descricao: String;
    login: String;
    tipoLancamento: string;
    ativo: boolean;

}

export interface PlanoContaResponse {
    id: number;
    descricao: String;
    login: String;
    tipoLancamento: string;
    ativo: boolean;

}