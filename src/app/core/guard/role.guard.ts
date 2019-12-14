import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../service/auth.service';
import {UserViewModel} from '../model/user.view.model';
import {AuthDataProvider} from '../data-provider/auth.data-provider';

@Injectable()
export class RoleGuard implements CanActivateChild {

  constructor(
    private authDataProvider: AuthDataProvider,
  ) {
  }

  static isAllowedToActivate(user: UserViewModel, route: ActivatedRouteSnapshot): boolean {
    const userRoles: string[] = [user.role], dataRoles: string[] = route.data.roles;
    const intersection = userRoles.filter(value => dataRoles.includes(value));
    return Boolean(intersection.length);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.authDataProvider.current.subscribe((user: UserViewModel) => {
        if (user !== null && !RoleGuard.isAllowedToActivate(user, route)) {
          observer.next(false);
          return;
        }
        return observer.next(true);
      });
    });
  }
}
