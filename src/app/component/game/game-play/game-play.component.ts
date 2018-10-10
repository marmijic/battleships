import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../service';
import { Grid } from '../../../models/grid';
import { GamePlayer } from '../../../models/game-player';
import { Salvo, Shot, SalvoResult } from 'src/app/models/shot';

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.css']
})
export class GamePlayComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  playerId: string;
  responseMessage: string;
  gameId: string;
  opponent: GamePlayer;
  self: GamePlayer;
  opponentRemainingShips: number = 10;
  selfRemainingShips: number = 10;
  opponentGrid: Array<Array<Grid>> = [];
  selfGrid: Array<Array<Grid>> = [];
  rows: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  columns: Array<string> = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  showDialog: boolean = false;
  shots: Salvo = {
    salvo: []
  };
  shotCounter: number = 0;
  shotResult: Shot;

  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }


  ngOnInit() {
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
        const playerTurnId = response.body.game.player_turn;
        const checkWin: string = response.body.game.won;
        if (this.playerId === playerTurnId) {
          this.opponent = response.body.opponent;
          this.self = response.body.self;
          this.opponentRemainingShips = this.opponent.remaining_ships;
          this.selfRemainingShips = this.self.remaining_ships;
          this.opponentGrid = this.setGrid(this.opponent.board);
          this.selfGrid = this.setGrid(this.self.board);
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

  shot(number: string, letter: string): void {
    this.shots.salvo.push(number + 'x' + letter);
    this.shotCounter++;
    if (this.selfRemainingShips === this.shotCounter) {
      this.dataService.gameShot(this.playerId, this.gameId, this.shots).subscribe(
        response => {
          if (response.status === 200) {
            this.showDialog = true;
            let result: Array<SalvoResult> = [];
            Object.keys(response.body.salvo).forEach(value => {
              result.push({
                field: value,
                result: response.body.salvo[value]
              })
            })
            this.shotResult = {
              playerTurn: response.body.game.player_turn,
              gameId: this.gameId,
              salvo: result
            };
          }
        },
        error => {
          console.warn(error);
        }
      )
    }
  }
  
  private setGrid(arr: Array<string>): Array<Array<Grid>> {
    let grid: Array<Array<Grid>> = [];
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
