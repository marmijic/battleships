import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.css']
})
export class PlayersListComponent implements OnInit {

  constructor(private dataService: DataService) {
    this.dataService.listOfPlayers().subscribe(
      response => {
        console.log(response)
      },
      error => {
        console.log(error)
      }
    )
  }

  ngOnInit() {
  }

}
