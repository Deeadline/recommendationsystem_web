import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {UserApiModel} from '../model/user.api.model';
import {plainToClass} from 'class-transformer';

@Injectable()
export class UserRestService {

  private currentUser$: Observable<UserApiModel>;

  constructor(private client: HttpClient) {
  }

  public current(): Observable<UserApiModel> {
    if (!this.currentUser$) {
      this.currentUser$ = this.client.get<UserApiModel>('/api/user/current')
        .pipe(
          map((result) => plainToClass(UserApiModel, result as object)),
          shareReplay(1)
        );
    }
    return this.currentUser$;
  }
}
