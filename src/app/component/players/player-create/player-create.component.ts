import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService, MessageService } from '../../../service';
import { Player } from '../../../models/player';

@Component({
  selector: 'app-player-create',
  templateUrl: './player-create.component.html',
  styleUrls: ['./player-create.component.css']
})
export class PlayerCreateComponent {
  createPlayerForm: FormGroup;
  responseMessage: string = '';

  constructor(private FormBuilder: FormBuilder, private dataService: DataService, private messageService: MessageService) {
    this.setForm();
  }

  saveData() {
    let body: Player = {
      name: this.createPlayerForm.value.nameInput,
      email: this.createPlayerForm.value.emailInput
    };

    this.dataService.createPlayer(body).subscribe(
      response => {
        if (response.status === 201) {
          this.messageService.add({ name: 'Player was created', show: true, warning: false });
          this.setForm();
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
