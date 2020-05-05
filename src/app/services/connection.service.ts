import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Connection } from '../modals/connection.modal';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ConnectionService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
    // super();
  }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  getConnections(): Observable<Connection[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<Connection[]>(this.baseUrl + '/sourcesall/');
  }

  getConnectionsById(appId: number): Observable<Connection[]> {
    return this.http.get<Connection[]>(this.baseUrl + '/sources/', this.httpOptions);
  }


}
