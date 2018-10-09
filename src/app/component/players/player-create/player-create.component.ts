import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../../service';
import { Player } from '../../../models/player';

@Component({
  selector: 'app-player-create',
  templateUrl: './player-create.component.html',
  styleUrls: ['./player-create.component.css']
})
export class PlayerCreateComponent {
  createPlayerForm: FormGroup;
  responseMessage: string = '';

  constructor(private FormBuilder: FormBuilder, private dataService: DataService) {
    this.setForm();
  }

  saveData() {
    let body: Player = {
      name: this.createPlayerForm.value.nameInput,
      email: this.createPlayerForm.value.emailInput
    };

    this.dataService.createPlayer(body).subscribe(
      response => {
        console.log(response)
        if (response.status === 201) {
          this.responseMessage = 'Player was created!'
          this.setForm();
        }
        else if (response.status === 409) {
          this.responseMessage = 'Player with that email already exists!'
        }
      },
      error => {
        console.warn(error);
        if (error.status === 409) {
          this.responseMessage = 'Player with that email already exists!'
        }
      }
    )
  }

  setForm() {
    this.createPlayerForm = this.FormBuilder.group({
      nameInput: ['', [Validators.required]],
      emailInput: ['', [Validators.required]]
    })
  }
}
