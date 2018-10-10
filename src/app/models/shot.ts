export class Shot {
    playerTurn: string;
    gameId: string;
    salvo: Array<SalvoResult> 
}

export class SalvoResult{
    field: string;
    result: String;
}

export class Salvo {
    salvo: Array<string>;
}