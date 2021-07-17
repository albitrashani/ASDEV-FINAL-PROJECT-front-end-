import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { SignInData } from './models/signInData';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(protected http: HttpClient) {}

  getRestaurants(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/public/restaurant/list');
  }

  getRestaurantMenu(name: string) {
    return this.http.get(
      'http://localhost:3000/public/restaurant/menulist/' + name
    );
  }

  signin(data: SignInData): Observable<Object> {
    //console.log(data.getusername());
    return this.http.post('http://localhost:3000/auth/login', data).pipe(
      catchError(this.handleError),
      );
  }

  createUser(data: SignInData): Observable<Object> {
      return this.http.post('http://localhost:3000/auth/create-user', data).pipe(
      catchError(this.handleError),
      );
  }

  addorderi() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${'d625fd0d-2cc0-4324-a33e-be7b69b616a1'}`,
    });

    // return this.http.post('http://localhost:3000/private/order/order/new', {}, {headers: new HttpHeaders({'test': 'true'})});
    const mess = this.http.post(
      'http://localhost:3000/private/order/order/new',
      {
        username: 'atrashani',
        items: [
          {
            name: 'Pizza 2',
            qty: '1',
          },
        ],
        status: 'processing',
      },
      {
        headers: headers,
      }
    );
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
