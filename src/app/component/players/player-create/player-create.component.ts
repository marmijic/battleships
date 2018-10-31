import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService, MessageService } from '../../../service';
import { Player } from '../../../models/player';

@Component({
  selector: 'app-player-create',
  templateUrl: './player-create.component.html',
  styles: [`
    .player-form {
      margin-bottom: 20px;
    }

    .player-form input:last-of-type {
        margin: 10px 0 0;
    }
  `]
})

export class PlayerCreateComponent {
  createPlayerForm: FormGroup;
  responseMessage: string;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private messageService: MessageService) {
    this.setForm();
  }

  saveData() {
    const emailValid = /([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const body: Player = {
      name: this.createPlayerForm.value.nameInput,
      email: this.createPlayerForm.value.emailInput
    };
    if (body.email.match(emailValid)) {
      this.dataService.createPlayer(body).subscribe(
        response => {
          if (response.status === 201) {
            this.messageService.add({ name: 'Player was created', show: true, warning: false });
            this.setForm();
          }
        }
      );
    } else {
      this.messageService.add({ name: 'Invalid email address', show: true, warning: true });
    }

  }

  setForm() {
    this.createPlayerForm = this.formBuilder.group({
      nameInput: ['', [Validators.required]],
      emailInput: ['', [Validators.required]]
    });
  }
}
