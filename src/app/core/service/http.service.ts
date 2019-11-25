import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserLoginViewModel} from '../model/user-login.view.model';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {UserRegisterViewModel} from '../model/user-register.view.model';

@Injectable()
export class HttpService {

  constructor(private client: HttpClient) {
  }

  public login(user: UserLoginViewModel): Observable<string> {
    return this.client.post<string>('/auth/login', user)
      .pipe(
        map((token: string) => token)
      );
  }

  public register(user: UserRegisterViewModel): Observable<boolean> {
    return this.client.post<boolean>('/auth/register', user)
      .pipe(
        map((result: boolean) => result)
      );
  }
}
