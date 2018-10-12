export interface GameDetail {
    game_id: string;
    opponent_id: string;
    status: string;
    opponentName?: string;
    opponentEmail?: string;
}

export interface GamePlayer {
    autopilot: boolean;
    board: Array<string>;
    player_id: string;
    remaining_ships: number;
}