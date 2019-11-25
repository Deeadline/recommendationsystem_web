import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {AuthService} from '../service/auth.service';

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }


  public intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();

    if (authToken !== null) {
      req = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + authToken)});
    }

    return next.handle(req);
  }

}
