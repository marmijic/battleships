import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message';
import { MessageService } from 'src/app/service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  message: Message = {
    show: false,
    name: null,
    warning: false
  }

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
    this.messageService.messageState.subscribe(
      (state: Message) => {
        this.message = {
          show: state.show,
          name: state.name,
          warning: state.warning
        }
      }
    )
  }
}
