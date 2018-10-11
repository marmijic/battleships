export interface GamePlayer {
    autopilot: boolean;
    board: Array<string>;
    player_id: string;
    remaining_ships: number;
}