import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message';
import { MessageService } from 'src/app/service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  show: boolean = false;
  name: string = null;

  constructor(private messageService: MessageService) {
    this.messageService.hide()
  }

  ngOnInit() {
    this.messageService.messageState.subscribe(
      (state: Message) => {
        this.show = state.show;
        this.name = state.name;
      }
    )
  }

}
