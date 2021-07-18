import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { startingUrl } from 'src/environments/environment';
import { SignInData } from '../general/models/signInData';
import { SignInTokenStatus } from '../general/models/signInDataToken';
import { AuthenticationService } from './authentication.service';
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(
    private authenticationService:AuthenticationService,
    protected http: HttpClient) {}

  getRestaurants(): Observable<any[]> {
    return this.http.get<any[]>(`${startingUrl}/public/restaurant/list`);
  }

  getRestaurantMenu(name: string) {
    return this.http.get(
      `${startingUrl}/public/restaurant/menulist/` + name
    );
  }

  signin(data: SignInData): Observable<Object> {
    //console.log(data.getusername());
    //console.log(this.authenticationService.getToken());
    return this.http.post(`${startingUrl}/auth/login`, data).pipe(
      catchError(this.handleError),
      );
  }

  createUser(data: SignInData): Observable<Object> {
      return this.http.post(`${startingUrl}/auth/create-user`, data).pipe(
      catchError(this.handleError),
      );
  }

  addorderi(menuname:string) {

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authenticationService.getToken()}`,
    });

    //const params = new HttpParams({fromString: 'name=foo'});
    // return this.http.post('http://localhost:3000/private/order/order/new', {}, {headers: new HttpHeaders({'test': 'true'})});
    const mess = this.http.post(
      `${startingUrl}/private/order/order/new`,
      {
        username: this.authenticationService.getUser(),
        items: [
          {
            name: menuname,
            qty: '1',
          },
        ],
        status: 'processing',
      },
      {
        headers: headers,
      }
    ).pipe(catchError(this.handleError));
    return mess;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);

    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

}
