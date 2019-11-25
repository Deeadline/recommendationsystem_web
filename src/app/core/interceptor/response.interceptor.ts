import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {finalize, tap} from 'rxjs/operators';
import {Location} from '@angular/common';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(
    private location: Location
  ) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (environment.production === false) {
      const started = Date.now();
      let ok: string;

      // extend server response observable with logging
      return next.handle(req)
        .pipe(
          tap(
            event => ok = event instanceof HttpResponse ? 'succeeded' : '',
            error => {
              if (error.status === 0) {
                console.log('Connection error in API');
              } else if (error.status === 500) {
                console.log('Internal server error');
              } else if (error.status === 403) {
                console.log('Nie masz pozwolenia');
                this.location.back();
              }
              ok = 'failed';
            }
          ),
          // Log when response observable either completes or errors
          finalize(() => {
            const elapsed = Date.now() - started;
            const msg = `${req.method} "${req.urlWithParams}" ${ok} in ${elapsed} ms.`;
            console.log(msg);
          })
        );
    }

    return next.handle(req);

  }
}
