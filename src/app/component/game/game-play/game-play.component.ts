import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../service';
import { Grid } from '../../../models/grid';
import { GamePlayer } from '../../../models/game-player';
import { Salvo } from 'src/app/models/salvo';

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.css']
})
export class GamePlayComponent implements OnDestroy {
  private subscriptions: Subscription[] = [];
  playerId: string;
  responseMessage: string;
  gameId: string;
  opponent: Array<GamePlayer>;
  self: Array<GamePlayer>;
  opponentGrid: Array<Array<Grid>> = [];
  selfGrid: Array<Array<Grid>> = [];
  rows: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  columns: Array<string> = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService) {
    this.subscriptions.push(this.route.params.subscribe(params => {
      this.playerId = params.playerId;
      this.gameId = params.gameId;
      this.getData();
    }))
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription =>
      subscription.unsubscribe()
    )
  }

  getData(): void {
    this.dataService.gameStatus(this.playerId, this.gameId).subscribe(
      response => {
        console.log(response)
        const playerTurnId = response.body.game.player_turn;
        const checkWin: string = response.body.game.won;
        if (this.playerId === playerTurnId) {
          this.opponent = response.body.opponent;
          this.self = response.body.self;
          this.opponentGrid = this.setGrid(response.body.opponent.board);
          console.log(this.opponentGrid)
          this.selfGrid = this.setGrid(response.body.self.board);
          console.log(this.selfGrid)
        }
        else if (this.playerId !== playerTurnId && !checkWin) {
          this.responseMessage = "It's not your turn, the player " + playerTurnId + " now play!";
        }
        else if (checkWin) {
          this.responseMessage = "Player " + checkWin + " has won!";
        }
      },
      error => {
        console.warn(error)
      }
    )
  }

  shot(number: string, letter: string) {
    // this.salvo.salvo.push(number + 'x' + letter)
    let salvo: Salvo = {
      salvo: []
    };
    salvo.salvo.push(number + 'x' + letter);
    this.dataService.gameShot(this.playerId, this.gameId, salvo).subscribe(
      response => {
        console.log(response);
        if (response.status === 200) {
          // const playerTurnId: string = response.body.game.player_turn;
          // this.router.navigateByUrl('game-play/' + playerTurnId + '/' + this.gameId)
        }
      },
      error => {
        console.warn(error);
      }
    )
  }

  setGrid(arr: Array<string>): Array<Array<Grid>> {
    let grid: Array<Array<Grid>> = [];
    console.log(arr)
    for (let i = 0; i < arr.length; i++) {
      let row: Array<Grid> = [];
      let arrRow: Array<string> = Array.from(arr[i]);
      for (let j = 0; j < arrRow.length; j++) {
        row.push({
          value: arrRow[j],
          number: this.rows[i],
          letter: this.columns[j]
        })
      }
      grid.push(row);
    }
    return grid;
  }
}
