import { Component } from '@angular/core';
import { DataService, MessageService } from '../../../service';
import { Player } from '../../../models/player';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styles: [``]
})
export class GameCreateComponent {
  players: Array<Player>;
  challengers: Array<Player>;
  challengerIdValue: string = null;
  opponents: Array<Player>;
  opponentIdValue: string = null;

  constructor(private router: Router, private dataService: DataService, private messageService: MessageService) {
    this.getData();
  }

  getData() {
    this.dataService.playersList().subscribe(
      response => {
        this.players = response.body.players;
        this.setPlayers();
      }
    );
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
    const body: any = {
      player_id: this.challengerIdValue,
    };
    this.dataService.createGame(this.opponentIdValue, body).subscribe(
      response => {
        if (response.status === 201) {
          const gameId = response.body.game_id;
          const startingId = response.body.starting;
          this.router.navigateByUrl('game-play/' + startingId + '/' + gameId);
          this.messageService.add({ name: 'Game was created', show: true, warning: false });
        }
      }
    );
  }

}
