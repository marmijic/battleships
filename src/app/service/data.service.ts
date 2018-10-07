import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class DataService {
    constructor(private http: HttpClient) { }

    listOfPlayers(): Observable<any> {
        return this.getData('player/list')
    }

    getData(params: string): Observable<any> {
        const url: string = this.getUrl() + params;
        return this.http.get(url);
    }

    postData(): Observable<any> {
        const url: string = this.getUrl() + 'player';
        const headers = this.getHeaders();
        let body = {
            // name: "mariom",
            // email: "mariom@gmail.com"
        }

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