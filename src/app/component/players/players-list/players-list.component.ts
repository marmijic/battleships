import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../service';
import { Player } from '../../../models/player';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.css']
})
export class PlayersListComponent implements OnInit {
  players: Array<Player>;

  constructor(private dataService: DataService) {
    this.getData();
  }

  ngOnInit() {
  }

  getData() {
    this.dataService.playersList().subscribe(
      response => {
        this.players = response.body.players;
      },
      error => {
        console.log(error)
      }
    )
  }

}
