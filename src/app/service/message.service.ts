import { Injectable } from "@angular/core";
import { Message } from "../models/message";
import { Subject } from "rxjs";


@Injectable()
export class MessageService {
    private messageSubject = new Subject<Message>();
    messageState = this.messageSubject.asObservable();

    constructor() { }

    add(message) {
        this.messageSubject.next(<Message>{
            name: message.name,
            show: message.show,
            warning: message.warning
        });
        this.autoHide();
    }
    
    private autoHide() {
        setTimeout(() => {
            this.messageSubject.next(<Message>{
                name: null,
                show: false
            });
        }, 5000);
    }

}