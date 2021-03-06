import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Loader } from '../models/loader';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    private loaderSubject = new Subject<Loader>();
    loaderState = this.loaderSubject.asObservable();

    constructor() { }

    show() {
        this.loaderSubject.next(<Loader>{ show: true });
    }

    hide() {
        setTimeout(() => {
            this.loaderSubject.next(<Loader>{ show: false });
        }, 500);
    }
}
