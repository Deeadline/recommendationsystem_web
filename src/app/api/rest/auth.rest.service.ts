import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserLoginViewModel} from '../../core/model/user-login.view.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {UserRegisterViewModel} from '../../core/model/user-register.view.model';

@Injectable()
export class AuthRestService {

  constructor(private client: HttpClient) {
  }

  public login(user: UserLoginViewModel): Observable<string> {
    return this.client.post<string>('/api/auth/login', user)
      .pipe(
        map((token: string) => token)
      );
  }

  public register(user: UserRegisterViewModel): Observable<boolean> {
    return this.client.post<boolean>('/api/auth/register', user)
      .pipe(
        map((result: boolean) => result)
      );
  }
}
