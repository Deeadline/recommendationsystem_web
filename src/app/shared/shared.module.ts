import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule, MatChipsModule,
  MatFormFieldModule, MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatPaginatorModule,
  MatProgressSpinnerModule, MatSelectModule,
  MatSidenavModule, MatTableModule,
  MatTooltipModule
} from '@angular/material';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RoleDirective} from './directives/role.directive';
import {AuthService} from '../core/service/auth.service';
import {AuthGuard} from '../core/guard/auth.guard';
import {RoleGuard} from '../core/guard/role.guard';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {RequestInterceptor} from '../core/interceptor/request.interceptor';
import {JwtTokenInterceptor} from '../core/interceptor/jwt-token.interceptor';
import {ResponseInterceptor} from '../core/interceptor/response.interceptor';

library.add(fas);

@NgModule({
  declarations: [RoleDirective],
  imports: [
    CommonModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatPaginatorModule,
    FontAwesomeModule,
    MatChipsModule,
    MatTableModule,
    MatGridListModule,
    MatSelectModule,
    MatAutocompleteModule,
    NgbModule
  ],
  exports: [
    MatCardModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    FontAwesomeModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatChipsModule,
    MatTableModule,
    MatGridListModule,
    MatSelectModule,
    MatAutocompleteModule,
    NgbModule,
    RoleDirective
  ]
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        RoleDirective
      ],
    };
  }
}
