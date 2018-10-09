import { Component } from '@angular/core';
import { DataService } from '../../../service';
import { Player } from '../../../models/player';

@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.css']
})
export class GameCreateComponent {
  players: Array<Player>;
  challengers: Array<Player>;
  challengerIdValue: string = null;
  opponents: Array<Player>;
  opponentIdValue: string = null;

  constructor(private dataService: DataService) {
    this.getData();
  }

  getData() {
    this.dataService.playersList().subscribe(
      response => {
        this.players = response.body.players;
        this.setPlayers();
      },
      error => {
        console.warn(error)
      }
    )
  }

  setPlayers(): void {
    this.challengers = this.players;
    this.challengerIdValue = null;
    this.opponents = this.players;
    this.opponentIdValue = null;
  }

  onChallengerChange(): void {
    this.opponents = this.players.filter(value => value.id !== this.challengerIdValue);
  }

  onOpponentChange(): void {
    this.challengers = this.players.filter(value => value.id !== this.opponentIdValue);
  }

  createGame(): void {
    let body: any = {
      player_id: this.challengerIdValue,
    };
    this.dataService.createGame(this.opponentIdValue, body).subscribe(
      response => {
        console.log(response)
      },
      error => {
        console.warn(error);
      }
    );
  }

}
