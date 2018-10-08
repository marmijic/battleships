import { Component, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../service';
import { Game } from '../../../models/game';

@Component({
  selector: 'app-players-detail',
  templateUrl: './players-detail.component.html',
  styleUrls: ['./players-detail.component.css']
})
export class PlayersDetailComponent implements OnDestroy {
  private subscriptions: Subscription[] = [];
  games: Array<Game>;
  responseMessage: string = '';
  playerId: string;

  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService) {
    this.subscriptions.push(this.route.params.subscribe(params => {
      this.playerId = params.id;
      this.getData();
    }))
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription =>
      subscription.unsubscribe()
    )
  }

  getData() {
    this.dataService.playerDetail(this.playerId).subscribe(
      response => {
        if (response.status === 200) {
          this.games = response.body.games;
          this.games.forEach(value => {
          })
        }
        else {
          if (response.status === 204)
            this.responseMessage = "The player hasn't played any games yet!"
          else if (response.status === 404)
            this.responseMessage = "The player does not exist!"
        }
      },
      error => {
        console.warn(error)
      })
  }

  // getPlayer(playerId: string):Promise<any>{
  //   // this.dataService.playerProfile(playerId).subscribe(
  //   //   response => {
  //   //     console.log(response)
  //   //     // value.opponentName = response.body.name;
  //   //   },
  //   //   error => {
  //   //     console.warn(error);
  //   //   }
  //   // )
  //   // let promise = new Promise((resolve,reject) => {
  //   //   this.dataService.playerProfile(playerId).toPromise().then(
  //   //     response => {

  //   //       resolve(response.body.name);
  //   //     }
  //   //   )
  //   // })
  //   // return promise;
  // }

  navigateTo(gameId: string, gameStatus: string): void {
    if (gameStatus === 'IN_PROGRESS') {
      this.router.navigateByUrl('game-play/' + this.playerId + '/' + gameId);
    }
  }
}
