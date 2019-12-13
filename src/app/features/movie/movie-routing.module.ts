import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppLayoutComponent} from '../../core/layout/app/app-layout.component';
import {AuthGuard} from '../../core/guard/auth.guard';
import {MovieRecommendationComponent} from './containers/movie-recommendation/movie-recommendation.component';
import {MovieListComponent} from './containers/movie-list/movie-list.component';
import {MovieDetailComponent} from './containers/movie-detail/movie-detail.component';


const routes: Routes = [
  {
    path: 'app/movies',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Movies',
      id: 'movies'
    },
    children: [
      {
        path: '',
        component: MovieListComponent,
        data: {
          title: 'Movies'
        }
      },
      {
        path: ':id/detail',
        component: MovieDetailComponent,
        data: {
          title: 'Detail movie'
        }
      }
    ]
  },
  {
    path: 'app/movies/recommendation',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      id: 'recommendation',
      title: 'Movies recommendation'
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
