import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../service';

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.css']
})
export class GamePlayComponent implements OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute, private dataService: DataService) {
    this.subscriptions.push(this.route.params.subscribe(params => {
      console.log(params)
      const playerId = params.playerId;
      const gameId = params.gameId;
      this.dataService.gameStatus(playerId, gameId).subscribe(
        response => {
          console.log(response)
        },
        error => {
          console.log(error)
        }
      )
    }))
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription =>
      subscription.unsubscribe()
    )
  }

}
