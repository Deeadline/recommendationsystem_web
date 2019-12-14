import {Injectable} from '@angular/core';
import {UserLoginViewModel} from '../model/user-login.view.model';
import {Observable} from 'rxjs';
import {UserRegisterViewModel} from '../model/user-register.view.model';
import {AuthRestService} from '../../api/rest/auth.rest.service';
import {UserViewModel} from '../model/user.view.model';
import {UserRestService} from '../../api/rest/user.rest.service';
import {map} from 'rxjs/operators';

@Injectable()
export class AuthDataProvider {

  constructor(
    private authService: AuthRestService,
    private userService: UserRestService
  ) {
  }

  public login(user: UserLoginViewModel): Observable<string> {
    return this.authService.login(user);
  }

  public register(user: UserRegisterViewModel): Observable<boolean> {
    return this.authService.register(user);
  }

  public get current(): Observable<UserViewModel> {
    return this.userService.current()
      .pipe(
        map((result) => new UserViewModel(result))
      );
  }
}
