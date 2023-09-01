import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SendDataSubjectService {
    private dataSubject = new BehaviorSubject<any>(null);

    sendData(data: any) {
        this.dataSubject.next(data);
    }

    getData(): Observable<any> {
        return this.dataSubject.asObservable();
    }
}
