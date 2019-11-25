import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthLoginComponent} from './page/login/login.component';
import {AuthRegisterComponent} from './page/register/register.component';
import {AuthLayoutComponent} from '../../core/layout/auth/auth-layout.component';


const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: AuthLoginComponent
      },
      {
        path: 'register',
        component: AuthRegisterComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
