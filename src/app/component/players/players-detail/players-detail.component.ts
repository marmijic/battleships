import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private dataService: DataService) {
    this.subscriptions.push(this.route.params.subscribe(params => {
      this.dataService.playerDetail(params.id).subscribe(
        response => {
          if (response.status === 200) {
            this.games = response.body.games;
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
    }))
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription =>
      subscription.unsubscribe()
    )
  }
}
