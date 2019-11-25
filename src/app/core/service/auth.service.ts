import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserLoginViewModel} from '../model/user-login.view.model';
import {HttpService} from './http.service';
import {map, tap} from 'rxjs/operators';
import {UserRegisterViewModel} from '../model/user-register.view.model';

@Injectable()
export class AuthService {

  private tokenKey = 'jwt-token';

  constructor(private httpService: HttpService) {
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
    return this.httpService.login(user).pipe(
      map((token) => {
        this.setToken(token);
        return true;
      })
    );
  }

  public register(user: UserRegisterViewModel): Observable<boolean> {
    return this.httpService.register(user).pipe(tap((res) => console.log(res)));
  }
}
