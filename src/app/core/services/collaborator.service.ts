import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {
  jsonData: any

  constructor(
    private http: HttpClient
  ) { }

  loadJSON() {
    return this.http.get('assets/payload.json');

  }
}
