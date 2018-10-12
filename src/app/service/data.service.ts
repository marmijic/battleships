import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Player } from '../models/player';
import { map, catchError, } from 'rxjs/operators';
import { throwError } from 'rxjs'
import { LoaderService } from './loader.service';
import { MessageService } from './message.service';
import { ErrorMessage } from '../models/message';
import { Router } from '@angular/router';


@Injectable()
export class DataService {
    constructor(private http: HttpClient, private loaderService: LoaderService, private messageService: MessageService, private router: Router) { }

    playersList(): Observable<any> {
        return this.getData(`player/list`)
    }

    playerProfile(playerId: string): Observable<any> {
        return this.getData(`player/${playerId}`);
    }

    playerDetail(playerId: string): Observable<any> {
        return this.getData(`player/${playerId}/game/list`)
    }

    createPlayer(body: Player): Observable<any> {
        return this.postData(`/player`, body);
    }

    createGame(opponentId: string, body: any): Observable<any> {
        return this.postData(`player/${opponentId}/game`, body)
    }

    gameStatus(playerId: string, gameId: string): Observable<any> {
        return this.getData(`player/${playerId}/game/${gameId}`);
    }

    gameShot(playerId: string, gameId: string, body: any) {
        return this.putData(`player/${playerId}/game/${gameId}`, body)
    }

    turnAutopilot(playerId: string, gameId: string) {
        return this.putData(`player/${playerId}/game/${gameId}/autopilot`)
    }

    getData(params: string): Observable<any> {
        this.showLoader();
        const url: string = this.getUrl() + params;
        const options = this.getOptions();
        return this.http.get(url, options).pipe(
            map(
                response => {
                    this.hideLoader()
                    return response;
                }),
            catchError(
                (error: HttpErrorResponse) => {
                    this.hideLoader();
                    this.checkError(error.status);
                    return throwError(error)
                }
            )
        )
    }

    postData(params: string, body: Player): Observable<any> {
        this.showLoader();
        const url: string = this.getUrl() + params;
        const options = this.getOptions();
        return this.http.post(url, body, options).pipe(
            map(
                response => {
                    this.hideLoader();
                    return response;
                }),
            catchError(
                (error: HttpErrorResponse) => {
                    this.hideLoader();
                    this.checkError(error.status);
                    return throwError(error)
                }
            )
        )
    }

    putData(params: string, body?: any): Observable<any> {
        this.showLoader();
        const url: string = this.getUrl() + params;
        const options = this.getOptions();
        return this.http.put(url, body, options).pipe(map(
            response => {
                this.hideLoader();
                return response;
            }),
            catchError(
                (error: HttpErrorResponse) => {
                    this.hideLoader();
                    this.checkError(error.status);
                    return throwError(error)
                }
            )
        )
    }

    checkError(status: number): void {
        let errors: Array<ErrorMessage> = [
            {
                status: 201,
                message: "No contenct"
            },
            {
                status: 204,
                message: "The player hasn't played any games yet!"
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
                message: "Player with the supplied email already exist."
            }
        ];
        if (status !== 404) {
            if (status === 204) {
                this.router.navigateByUrl('players')
            }
            errors = errors.filter(value => value.status === status);
            this.addMessage(errors[0].message, true, true);
        }
        else {
            this.router.navigateByUrl('not-found')
        }
    }

    private getUrl(): string {
        return environment.apiBaseURL;
    }

    private getOptions(): any {
        return {
            observe: 'response'
        };
    }

    private showLoader(): void {
        this.loaderService.show();
    }

    private hideLoader(): void {
        this.loaderService.hide();
    }


    private addMessage(error: string, show: boolean, warning: boolean): void {
        this.messageService.add({ name: error, show: show, warning: warning });
    }

}