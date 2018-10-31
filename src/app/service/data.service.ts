import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Player } from '../models/player';
import { LoaderService } from './loader.service';
import { ErrorService } from './error.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError, } from 'rxjs/operators';


@Injectable()
export class DataService {
    constructor(private http: HttpClient, private loaderService: LoaderService, private errorService: ErrorService) { }

    playersList(): Observable<any> {
        return this.getData(`player/list`);
    }

    playerProfile(playerId: string): Observable<any> {
        return this.getData(`player/${playerId}`);
    }

    playerDetail(playerId: string): Observable<any> {
        return this.getData(`player/${playerId}/game/list`);
    }

    createPlayer(body: Player): Observable<any> {
        return this.postData(`/player`, body);
    }

    createGame(opponentId: string, body: any): Observable<any> {
        return this.postData(`player/${opponentId}/game`, body);
    }

    gameStatus(playerId: string, gameId: string): Observable<any> {
        return this.getData(`player/${playerId}/game/${gameId}`);
    }

    gameShot(playerId: string, gameId: string, body: any) {
        return this.putData(`player/${playerId}/game/${gameId}`, body);
    }

    turnAutopilot(playerId: string, gameId: string) {
        return this.putData(`player/${playerId}/game/${gameId}/autopilot`);
    }

    getData(params: string): Observable<any> {
        this.showLoader();
        const url: string = this.getUrl() + params;
        const options = this.getOptions();
        return this.http.get(url, options).pipe(
            map(
                response => {
                    this.hideLoader();
                    return response;
                }),
            catchError(
                (error: HttpErrorResponse) => {
                    this.hideLoader();
                    this.errorService.checkError(error.status);
                    return throwError(error);
                }
            )
        );
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
                    this.errorService.checkError(error.status);
                    return throwError(error);
                }
            )
        );
    }

    putData(params: string, body?: any): Observable<any> {
        this.showLoader();
        const url: string = this.getUrl() + params;
        const options = this.getOptions();
        return this.http.put(url, body, options).pipe(
            map(
                response => {
                    this.hideLoader();
                    return response;
                }),
            catchError(
                (error: HttpErrorResponse) => {
                    this.hideLoader();
                    this.errorService.checkError(error.status);
                    return throwError(error);
                }
            )
        );
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
}
