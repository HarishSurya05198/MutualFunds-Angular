import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent,HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (localStorage.getItem('token') != null || localStorage.getItem('token') != '') {
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      return next.handle(clonedRequest);
    } else {
      return next.handle(req);
    }
  }
}

export const AuthInterceptorProvider = {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true};