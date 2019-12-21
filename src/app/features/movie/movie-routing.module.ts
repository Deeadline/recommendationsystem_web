import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppLayoutComponent} from '../../core/layout/app/app-layout.component';
import {AuthGuard} from '../../core/guard/auth.guard';
import {MovieRecommendationComponent} from './containers/movie-recommendation/movie-recommendation.component';
import {MovieListComponent} from './containers/movie-list/movie-list.component';
import {MovieDetailComponent} from './containers/movie-detail/movie-detail.component';
import {RoleGuard} from '../../core/guard/role.guard';
import {MovieCreateComponent} from './containers/movie-create/movie-create.component';
import {MovieEditComponent} from './containers/movie-edit/movie-edit.component';


const routes: Routes = [
  {
    path: 'app/movies',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [RoleGuard],
    data: {
      title: 'Movies',
      id: 'movies',
      roles: ['admin', 'user']
    },
    children: [
      {
        path: '',
        component: MovieListComponent,
        data: {
          title: 'Movies',
          roles: ['admin', 'user']
        }
      },
      {
        path: ':id/detail',
        component: MovieDetailComponent,
        data: {
          title: 'Detail movie',
          roles: ['admin', 'user']
        }
      },
      {
        path: 'create',
        component: MovieCreateComponent,
        data: {
          title: 'Create movie',
          roles: ['admin']
        }
      },
      {
        path: ':id/edit',
        component: MovieEditComponent,
        data: {
          title: 'Create movie',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: 'app/movies/recommendation',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [RoleGuard],
    data: {
      id: 'recommendation',
      title: 'Movies recommendation',
      roles: ['admin', 'user']
    },
    children: [
      {
        path: '',
        component: MovieRecommendationComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule {
}
