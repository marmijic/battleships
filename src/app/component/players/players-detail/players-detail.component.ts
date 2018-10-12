import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, MessageService } from '../../../service';
import { GameDetail } from '../../../models/game';
import { Player } from '../../../models/player';
import { map } from 'rxjs/operators';

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

  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService) {
  }

  ngOnInit() {
    this.subscriptions.push(this.route.params.subscribe(params => {
      this.player.id = params.id;
      this.getPlayer(params.id).subscribe(value => {
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
            this.getPlayer(gameValue.opponent_id).subscribe(value => {
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

  getPlayer(playerId: string): Observable<any> {
    return this.dataService.playerProfile(playerId).pipe(
      map(response => {
        return {
          name: response.body.name,
          email: response.body.email
        }
      })
    )
  }

  navigateTo(gameId: string, gameStatus: string): void {
    if (gameStatus === 'IN_PROGRESS') {
      this.router.navigateByUrl(`game-play/${this.player.id}/${gameId}`);
    }
  }
}
