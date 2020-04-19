import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Connection, DataHub } from '../modals/connection.modal';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class HubService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  saveConnection(dataHub: DataHub): Observable<any> {
    console.log(dataHub.datasourceid);
    // if(dataHub.datahubid) {
    //   return this.http.put<any>(this.baseUrl + '/hub/', dataHub);
    // } else {
    return this.http.post<any>(this.baseUrl + '/hub/', dataHub);
    // }
  }

  getAll(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/hub/');
  }

}
