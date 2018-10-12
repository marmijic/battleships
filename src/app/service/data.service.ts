import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Player } from '../models/player';
import { map, catchError } from 'rxjs/operators';
import { LoaderService } from './loader.service';
import { MessageService } from './message.service';


@Injectable()
export class DataService {
    constructor(private http: HttpClient, private loaderService: LoaderService, private messageService: MessageService) { }

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
                    console.log(error)
                    this.hideLoader();
                    this.addMessage('Error', true);
                    return Observable.throw(error)
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
                    this.addMessage(error.error.error_code, true);
                    return Observable.throw(error)
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
                    console.log(error)
                    this.hideLoader();
                    this.addMessage('foo', true);
                    return Observable.throw(error)
                }
            )
        )
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

    private addMessage(error: string, show: boolean): void {
        this.messageService.add({ name: error, show: show });
    }
}