export interface Shot {
    playerTurn: string;
    gameId: string;
    salvo: Array<SalvoResult>;
}

export interface SalvoResult {
    field: string;
    result?: String;
}

export interface Salvo {
    salvo: Array<string>;
}
