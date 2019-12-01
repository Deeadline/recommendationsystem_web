import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserLoginViewModel} from '../model/user-login.view.model';
import {map, tap} from 'rxjs/operators';
import {UserRegisterViewModel} from '../model/user-register.view.model';
import {AuthDataProvider} from '../data-provider/auth.data-provider';

@Injectable()
export class AuthService {

  private tokenKey = 'jwt-token';

  constructor(private authDataProvider: AuthDataProvider) {
  }

  public isAuthenticated(): boolean {
    return Boolean(this.getToken());
  }

  public getToken(): string {
    return localStorage.getItem(this.tokenKey);
  }

  public setToken(value: string): void {
    localStorage.setItem(this.tokenKey, value);
  }

  public login(user: UserLoginViewModel): Observable<boolean> {
    return this.authDataProvider.login(user).pipe(
      map((token) => {
        this.setToken(token);
        return true;
      })
    );
  }

  public register(user: UserRegisterViewModel): Observable<boolean> {
    return this.authDataProvider.register(user).pipe(tap((res) => console.log(res)));
  }
}
