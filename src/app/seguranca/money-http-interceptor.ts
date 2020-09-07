import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AuthService } from './auth.service';


export class NotAuthenticatedError { }

@Injectable()
export class MoneyHttpInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token && request.url.indexOf('/oauth/token') === -1) {
      request = request.clone({
        setHeaders: {
          Accept: `application/json`,
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }
}    