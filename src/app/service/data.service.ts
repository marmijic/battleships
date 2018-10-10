import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Player } from '../models/player';

@Injectable()
export class DataService {
    constructor(private http: HttpClient) { }

    playersList(): Observable<any> {
        return this.getData('player/list')
    }

    playerProfile(playerId: string): Observable<any> {
        return this.getData('player/' + playerId);
    }

    playerDetail(playerId: string): Observable<any> {
        return this.getData('player/' + playerId + '/game/list')
    }

    createPlayer(body: Player): Observable<any> {
        return this.postData('/player', body);
    }

    createGame(opponentId: string, body: any): Observable<any> {
        return this.postData('player/' + opponentId + '/game', body)
    }

    gameStatus(playerId: string, gameId: string): Observable<any> {
        return this.getData('player/' + playerId + '/game/' + gameId);
    }

    gameShot(playerId: string, gameId: string, salvo: any) {
        return this.putData('player/' + playerId + '/game/' + gameId, salvo)
    }

    turnAutopilot(playerId: string, gameId: string){
        return this.putData('player/' + playerId + '/game/' + gameId + '/autopilot')
    }

    getData(params: string): Observable<any> {
        const url: string = this.getUrl() + params;
        const options = this.getOptions();
        return this.http.get(url, options);
    }

    postData(params: string, body: Player): Observable<any> {
        const url: string = this.getUrl() + params;
        const options = this.getOptions();
        return this.http.post(url, body, options);
    }

    putData(params: string, body?: any): Observable<any> {
        console.log(params, body)
        const url: string = this.getUrl() + params;
        const options = this.getOptions();
        return this.http.put(url, body, options);
    }

    private getUrl(): string {
        return environment.apiBaseURL;
    }

    private getOptions(): any {
        return {
            observe: 'response'
        };
    }
}