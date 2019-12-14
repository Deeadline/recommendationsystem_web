import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppLayoutComponent} from '../../core/layout/app/app-layout.component';
import {AuthGuard} from '../../core/guard/auth.guard';
import {RoleGuard} from '../../core/guard/role.guard';
import {AdminActionsComponent} from './containers/admin-actions/admin-actions.component';


const routes: Routes = [
  {
    path: 'app/admin',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [RoleGuard],
    data: {
      title: 'Admin panel',
      id: 'admin',
      roles: ['admin']
    },
    children: [
      {
        path: '',
        component: AdminActionsComponent,
        data: {
          title: 'Admin panel',
          roles: ['admin']
        }
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
