import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, MessageService } from '../../../service';
import { GameDetail } from '../../../models/game-detail';
import { Player } from '../../../models/player';

@Component({
  selector: 'app-players-detail',
  templateUrl: './players-detail.component.html',
  styleUrls: ['./players-detail.component.css']
})
export class PlayersDetailComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  games: Array<GameDetail>;
  player: Player = {
    name: '',
    email: '',
    id: ''
  };

  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService, private messageService: MessageService) {
  }

  ngOnInit() {
    this.subscriptions.push(this.route.params.subscribe(params => {
      this.player.id = params.id;
      this.getPlayer(params.id).then(value => {
        this.player.name = value.name;
        this.player.email = value.email;
      })
      this.getData();
    }))
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription =>
      subscription.unsubscribe()
    )
  }

  getData() {
    this.dataService.playerDetail(this.player.id).subscribe(
      response => {
        if (response.status === 200) {
          this.games = response.body.games;
          this.games.forEach(gameValue => {
            this.getPlayer(gameValue.opponent_id).then(value => {
              gameValue.opponentName = value.name;
              gameValue.opponentEmail = value.email;
            })
          })
        }
        else {
          this.dataService.checkError(response.status);
        }
      })
  }

  getPlayer(playerId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.dataService.playerProfile(playerId).subscribe(
        response => {
          resolve({
            name: response.body.name,
            email: response.body.email
          });
        }
      )
    })
  }

  navigateTo(gameId: string, gameStatus: string): void {
    if (gameStatus === 'IN_PROGRESS') {
      this.router.navigateByUrl(`game-play/${this.player.id}/${gameId}`);
    }
  }

  private addError(error: string, show: boolean): void {
    this.messageService.add({ name: error, show: show });
  }
}
