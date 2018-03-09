import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const auth_token = localStorage.getItem('auth_token');
    if (auth_token) {
      request = request.clone({
        setHeaders: {
          Authorization: auth_token
        }
      });
    }

    return next.handle(request);
  }
}
