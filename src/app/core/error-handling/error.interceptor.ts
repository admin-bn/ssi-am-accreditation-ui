import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export default class ErrorInterceptor implements HttpInterceptor {
  // eslint-disable-next-line class-methods-use-this
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let message = '';
        if (error.error instanceof ErrorEvent) {
          // handle client-side error
          message = `Error: ${error.error.message}`;
        } else {
          // handle server-side error
          message = `Error Status: ${error.status} \n Message: ${error.message}`;
          /**
           * @todo Verify x-operation-id is received in headers object from backend when
           * https://dth06.ibmgcloud.net/jira/browse/BKAACMGT-184 is implemented
           */

          if (error.headers && error.headers.has('x-operation-id')) {
            message = `${message} with Id: ${error.headers.get('x-operation-id')}`;
          }
        }

        return throwError(message);
      })
    );
  }
}
