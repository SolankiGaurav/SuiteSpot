import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('accessToken');

    if (token) {
      const modifiedRequest = req.clone({
        url: `${environment.base_url}${req.url}`,
        setHeaders: {
          Authorization: 'Bearer ' + token,
        },
      });
      return next.handle(modifiedRequest);
    } else {
      const modifiedRequest = req.clone({
        url: `${environment.base_url}${req.url}`,
      });
      return next.handle(modifiedRequest);
    }
  }
}
