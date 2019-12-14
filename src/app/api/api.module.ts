import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {AuthRestService} from './rest/auth.rest.service';
import {MovieRestService} from './rest/movie.rest.service';
import {UserRestService} from './rest/user.rest.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AuthRestService,
    MovieRestService,
    UserRestService
  ]
})
export class ApiModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: ApiModule,
      providers: [
        AuthRestService,
        MovieRestService,
        UserRestService
      ]
    };
  }
}
