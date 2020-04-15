import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { Connection } from '../modals/connection.modal';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ConnectionService  {
  baseUrl = 'https://dcdataservices.herokuapp.com/dc_services';

  constructor(private http: HttpClient) {
    // super();
  }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  getConnections(): Observable<Connection[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.get<Connection[]>(this.baseUrl + '/sourcesall');
  }

  getConnectionsById(appId: number): Observable<Connection[]> {
    return this.http.get<Connection[]>(this.baseUrl + 'sources');
  }
}
