import { Injectable } from "@angular/core";
import { Message } from "../models/message";
import { Subject } from "rxjs";


@Injectable()
export class MessageService {
    private messageSubject = new Subject<Message>();
    messageState = this.messageSubject.asObservable();

    constructor() { }

    add(message: Message) {
        this.messageSubject.next(<Message>{
            name: message.name,
            show: message.show
        });
    }

    autoHide() {
        setTimeout(() => {
            this.hide();
        }, 3000);
    }

    hide() {
        this.messageSubject.next(<Message>{
            name: null,
            show: false
        });
    }
}