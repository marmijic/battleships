import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, MessageService } from '../../../service';
import { Grid, GridState } from '../../../models/grid';
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
  gameId: string;
  playerTurnId: string;
  responseMessage: string = null;
  opponent: GamePlayer;
  self: GamePlayer;
  opponentRemainingShips: number = 10;
  selfRemainingShips: number = 10;
  opponentGrid: Array<Array<Grid>> = [];
  selfGrid: Array<Array<Grid>> = [];
  rows: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  columns: Array<string> = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  showShotDialog: boolean = false;
  shots: Salvo = {
    salvo: []
  };
  shotCounter: number = 0;
  shotResult: Shot;
  emptyFields: number = 0;
  gridStates: Array<GridState> = [
    {
      name: 'An empty or unknown quadrant.',
      state: 'empty-field'
    },
    {
      name: 'A quadrant taken by part of a ship which has not been hit yet.',
      state: 'ship-field'
    },
    {
      name: 'A quadrant that contains a missed shot.',
      state: 'missed-field'
    },
    {
      name: 'A quadrant taken by part of a ship which was hit by a shot.',
      state: 'shot-field'
    },
    {
      name: 'A shot that has jut been sent',
      state: 'user-shot'
    },
    {
      name: 'Hover on empty or unknown quadrant.',
      state: 'empty-field-hover'
    }
  ]

  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService, private messageService: MessageService) {
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
        if (response.body.game.player_turn) {
          this.playerTurnId = response.body.game.player_turn;
          const checkWin: string = response.body.game.won;
          if (this.playerId === this.playerTurnId) {
            this.opponent = response.body.opponent;
            this.self = response.body.self;
            this.opponentRemainingShips = this.opponent.remaining_ships;
            this.selfRemainingShips = this.self.remaining_ships;
            this.opponentGrid = this.setGrid(this.opponent.board, true);
            this.selfGrid = this.setGrid(this.self.board, false);
          }
          else if (this.playerId !== this.playerTurnId && !checkWin) {
            this.responseMessage = `It's not your turn, the player ${this.playerTurnId} now play!`;
          }
        }
        else if (response.body.game.won) {
          this.responseMessage = `Player ${response.body.game.won} has won!`;
        }
      }
    )
  }

  shot(number: string, letter: string): void {
    this.shots.salvo.push(`${number}x${letter}`);
    this.shotCounter++;
    if (this.selfRemainingShips === this.shotCounter || this.emptyFields === this.shotCounter) {
      this.dataService.gameShot(this.playerId, this.gameId, this.shots).subscribe(
        response => {
          if (response.status === 200) {
            this.showShotDialog = true;
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
        }
      )
    }
  }

  autopilot() {
    this.dataService.turnAutopilot(this.playerId, this.gameId).subscribe(
      response => {
        if (response.status === 204) {
          this.messageService.add({ name: 'Auto pilot status: ON', show: true, warning: false });
        }
      }
    )
  }

  private setGrid(arr: Array<string>, flag: boolean): Array<Array<Grid>> {
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
        if (arrRow[j] === '.' && flag)
          this.emptyFields++;
      }
      grid.push(row);
    }
    return grid;
  }
}