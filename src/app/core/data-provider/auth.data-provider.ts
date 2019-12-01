import {Injectable} from '@angular/core';
import {UserLoginViewModel} from '../model/user-login.view.model';
import {Observable} from 'rxjs';
import {UserRegisterViewModel} from '../model/user-register.view.model';
import {AuthRestService} from '../../api/rest/auth.rest.service';

@Injectable()
export class AuthDataProvider {

  constructor(private authService: AuthRestService) {
  }

  public login(user: UserLoginViewModel): Observable<string> {
    return this.authService.login(user);
  }

  public register(user: UserRegisterViewModel): Observable<boolean> {
    return this.authService.register(user);
  }
}
