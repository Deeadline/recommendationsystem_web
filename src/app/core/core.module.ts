import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotFoundPageComponent} from './page/not-found/not-found.component';
import {RouterModule, Routes} from '@angular/router';
import {CoreComponent} from './core.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {SharedModule} from '../shared/shared.module';
import {RequestInterceptor} from './interceptor/request.interceptor';
import {JwtTokenInterceptor} from './interceptor/jwt-token.interceptor';
import {ResponseInterceptor} from './interceptor/response.interceptor';
import {AuthService} from './service/auth.service';
import {AuthLayoutComponent} from './layout/auth/auth-layout.component';
import {AuthGuard} from './guard/auth.guard';
import {AppLayoutComponent} from './layout/app/app-layout.component';
import {AuthModule} from '../features/auth/auth.module';
import {MovieModule} from '../features/movie/movie.module';
import {HttpService} from './service/http.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full',
  },
  {
    path: 'app',
    redirectTo: 'app/movies/recommendation',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    NotFoundPageComponent,
    CoreComponent,
    AuthLayoutComponent,
    AppLayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    AuthModule,
    MovieModule,
    SharedModule,

  ],
  exports: [
    RouterModule,
    CoreComponent
  ]
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule,
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        HttpService,
        AuthService,
        AuthGuard,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: RequestInterceptor,
          multi: true
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: JwtTokenInterceptor,
          multi: true
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ResponseInterceptor,
          multi: true
        },
      ],
    };
  }

}
