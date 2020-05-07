import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Connection, DataHub } from '../modals/connection.modal';
import { Observable , throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class TagsService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
  }

  getAll(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/tags/');
  }

  delete(tag): Observable<any> {
    return this.http.delete(this.baseUrl + '/tags/' + tag.datahubid + '/');
  }

}
