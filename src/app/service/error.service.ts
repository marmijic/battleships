import { Injectable } from "@angular/core";
import { MessageService } from "./message.service";
import { ErrorMessage } from "../models/message";
import { Router } from "@angular/router";


@Injectable()
export class ErrorService {
    constructor(private router: Router, private messageService: MessageService) { }


    checkError(status: number): void {
        let errors: Array<ErrorMessage> = [
            {
                status: 201,
                message: "No contenct"
            },
            {
                status: 204,
                message: "The player hasn't played any game yet"
            },
            {
                status: 403,
                message: "Forbidden"
            },
            {
                status: 400,
                message: "Bad request"
            },
            {
                status: 405,
                message: "Not allowed"
            },
            {
                status: 409,
                message: "Player with the supplied email already exist"
            }
        ];
        if (status !== 404) {
            errors = errors.filter(value => value.status === status);
            this.addMessage(errors[0].message, true, true);
            if (status === 204) {
                this.router.navigateByUrl('players')
            }
        }
        else {
            this.router.navigateByUrl('not-found')
        }
    }

    private addMessage(error: string, show: boolean, warning: boolean): void {
        this.messageService.add({ name: error, show: show, warning: warning });
    }
}