import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

  constructor(private authenticationService:AuthenticationService) {}

  //Let have it in our project:D
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const authToken = this.authenticationService.getToken();

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = request.clone({
      headers: request.headers.set('Authorization', 'BEARER '+authToken)
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
