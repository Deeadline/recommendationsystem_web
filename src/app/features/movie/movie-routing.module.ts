import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppLayoutComponent} from '../../core/layout/app/app-layout.component';
import {AuthGuard} from '../../core/guard/auth.guard';
import {MovieRecommendationComponent} from './movie-recommendation/movie-recommendation.component';
import {MovieListComponent} from './movie-list/movie-list.component';


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
