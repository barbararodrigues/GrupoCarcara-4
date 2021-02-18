export interface PlanoConta {
    id: number;
    descricao: String;
    login: String;
    tipoLancamento: string;
    ativo: boolean;
    padrao: boolean;
}

export interface PlanoContaResponse {
    id: number;
    descricao: String;
    login: String;
    tipoLancamento: string;
    ativo: boolean;
    padrao: boolean;
}