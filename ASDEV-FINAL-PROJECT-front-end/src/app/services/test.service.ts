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

    headeri = new HttpHeaders({
      Authorization: `Bearer ${this.authenticationService.getToken()}`,
    });

  getRestaurants(): Observable<any[]> {
    return this.http.get<any[]>(`${startingUrl}/public/restaurant/list`);
  }

  getRestaurantMenu(name: string) {
    return this.http.get(`${startingUrl}/public/restaurant/menulist/` + name);
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

  getUser(): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authenticationService.getToken()}`,
    });
    return this.http.get<any[]>(`${startingUrl}/private/user/` +this.authenticationService.getUser(),{headers: headers})
    .pipe(catchError(this.handleError));
  }

  getOrderFromUser(): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authenticationService.getToken()}`,
    });
    console.log(`${startingUrl}/private/user/` +this.authenticationService.getUser());
    return this.http.get<any[]>(`${startingUrl}/private/order/order/` +this.authenticationService.getUser(),{headers: headers})
    .pipe(catchError(this.handleError));
  }

  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${startingUrl}/private/order/order/list`,{headers: this.headeri})
    .pipe(catchError(this.handleError));
  }

  updateStatus(id:any): Observable<any>{
    return this.http.put(`${startingUrl}/private/order/order/`+id,{headers: this.headeri}).pipe(
      catchError(this.handleError));

  }

  //Add order to database
  addorderi(items:any,total:any) {

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authenticationService.getToken()}`,
    });

    //const params = new HttpParams({fromString: 'name=foo'});
    // return this.http.post('http://localhost:3000/private/order/order/new', {}, {headers: new HttpHeaders({'test': 'true'})});
    const mess = this.http.post(
      `${startingUrl}/private/order/order/new`,
      {
        username: this.authenticationService.getUser(),
        items: items,
        status: 'processing',
        amount: total,
      },
      {
        headers: headers,
      }
    ).pipe(catchError(this.handleError));
    return mess;
  }

  //delete cart of costumer after submiting order
  deleteCart(){

    return this.http.delete(`${startingUrl}/private/cart/delete/`+this.authenticationService.getUser(),
      {
        headers: this.headeri,
      }
    ).pipe(catchError(this.handleError));
  }

  //Add order to user cart
  addtoCart(item:any) {
    const headers = new HttpHeaders({Authorization: `Bearer ${this.authenticationService.getToken()}`});
    const mess = this.http.post(`${startingUrl}/private/cart/cart/new`,
      {
        username: this.authenticationService.getUser(),
        items: [
          {
            name: item.name,
            qty: '1',
            price: item.price,
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

  //get Cart for user
  getCart() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authenticationService.getToken()}`,
    });

    return this.http.get(`${startingUrl}/private/cart/cart/`+this.authenticationService.getUser(),
      {
        headers: headers,
      }
    ).pipe(catchError(this.handleError));

  }




  //Error handler from angular
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
