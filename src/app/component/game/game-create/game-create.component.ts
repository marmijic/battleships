import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../../service';
import { Player } from '../../../models/player';

@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.css']
})
export class GameCreateComponent {
  createGameForm: FormGroup;
  challengers: Array<any>;
  opponents: Array<any>;
  challengerId: string;
  opponentId: string;

  constructor(private formBuilder: FormBuilder, private dataService: DataService) {
    this.getData();
  }

  getData() {
    this.dataService.playersList().subscribe(
      response => {
        this.challengers = response.body.players;
        this.opponents = response.body.players;
      },
      error => {
        console.log(error)
      }
    )
  }

  onChallengerChange(challengerId) {
    this.challengerId = challengerId;
    this.opponents = this.opponents.filter(value => value.id !== challengerId);
  }

  onOpponentChange(opponentId) {
    this.opponentId = opponentId;
    this.challengers = this.challengers.filter(value => value.id !== opponentId);
  }

  createGame() {
    console.log('challengerId', this.challengerId)
    console.log('opponentId', this.opponentId)
    let body: any = {
      player_id: this.challengerId,
    };
    this.dataService.createGame(this.opponentId, body).subscribe(
      response => {
        console.log(response)
      },
      error => {
        console.log(error);
      }
    );
  }

}
