import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Player } from '../models/player';

@Injectable()
export class DataService {
    constructor(private http: HttpClient) { }

    playersList(): Observable<any> {
        return this.getData('player/list')
    }

    playerDetail(playerId: number): Observable<any> {
        return this.getData('player/' + playerId + '/game/list')
    }

    createPlayer(body: Player): Observable<any> {
        return this.postData('/player', body);
    }

    createGame(opponentId: string, body: any): Observable<any> {
        return this.postData('player/' + opponentId + '/game', body)
    }

    getData(params: string): Observable<any> {
        const url: string = this.getUrl() + params;
        const headers = this.getHeaders();
        return this.http.get(url, headers);
    }

    postData(params: string, body: Player): Observable<any> {
        const url: string = this.getUrl() + params;
        const headers = this.getHeaders();
        return this.http.post(url, body, headers);
    }

    private getUrl(): string {
        return environment.apiBaseURL;
    }

    private getHeaders(): any {
        return {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
            observe: 'response'
        };
    }
}