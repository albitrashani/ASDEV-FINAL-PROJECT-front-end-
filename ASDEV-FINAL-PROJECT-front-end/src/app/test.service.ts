import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  addorderi() {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${'d625fd0d-2cc0-4324-a33e-be7b69b616a1'}`
    );

    // return this.http.post('http://localhost:3000/private/order/order/new', {}, {headers: new HttpHeaders({'test': 'true'})});
    return this.http.post(
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
        headers: new HttpHeaders({
          Authorization: `Bearer ${'d625fd0d-2cc0-4324-a33e-be7b69b616a1'}`,
        }),
      }
    );
  }
}
