import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../service';
import { Grid } from '../../../models/grid';
import { GamePlayer } from '../../../models/game-player';

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
  columns: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  rows: Array<string> = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  salvo: Array<string> = [];

  constructor(private route: ActivatedRoute, private dataService: DataService) {
    this.subscriptions.push(this.route.params.subscribe(params => {
      this.playerId = params.playerId;
      this.gameId = params.gameId;
      this.dataService.gameStatus(this.playerId, this.gameId).subscribe(
        response => {
          const playerTurnId = response.body.game.player_turn
          if (this.playerId === playerTurnId) {
            this.opponent = response.body.opponent;
            this.self = response.body.self;
            this.opponentGrid = this.setGrid(response.body.opponent.board);
            this.selfGrid = this.setGrid(response.body.self.board);
          }
          else {
            this.responseMessage = "<h3>It's not your turn, the player " + playerTurnId + " now play!</h3>";
          }
        },
        error => {
          console.warn(error)
        }
      )
    }))
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription =>
      subscription.unsubscribe()
    )
  }

  shot(number: string, letter: string) {
    this.salvo.push(number + '×' + letter)
    this.dataService.gameShot(this.playerId, this.gameId, {
      "salvo": ["1×C", "2×C", "3×C", "4×C", "5×C"]
    }).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.warn(error);
      }
    )
  }

  setGrid(arr: Array<string>): Array<Array<Grid>> {
    let grid: Array<Array<Grid>> = [];
    for (let i = 0; i < arr.length; i++) {
      let row: Array<Grid> = [];
      let arrRow: Array<string> = Array.from(arr[i]);
      for (let j = 0; j < arrRow.length; j++) {
        row.push({
          value: arrRow[j],
          number: this.columns[j],
          letter: this.rows[i]
        })
      }
      grid.push(row);
    }
    return grid;
  }
}
