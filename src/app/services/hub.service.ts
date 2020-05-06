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
export class HubService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
  }

  saveConnection(dataHub: DataHub): Observable<any> {
    console.log(dataHub.datasourceid);
    if (dataHub.datahubid) {
      return this.http.put<any>(this.baseUrl + '/hub/'+ dataHub.datahubid+ "/", dataHub).pipe(
        retry(1),
        catchError( err => this.handleError)
      );
    } else {
    return this.http.post<any>(this.baseUrl + '/hub/', dataHub);
    }
  }

  getAll(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/hub/');
  }

  deleteConnection(dataHub): Observable<any>{
    return this.http.delete(this.baseUrl + '/hub/'+ dataHub.datahubid +"/")
  }


  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    this.snackBar.open(errorMessage, null, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }
}
