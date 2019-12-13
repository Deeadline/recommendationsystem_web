import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MovieRoutingModule} from './movie-routing.module';
import {MovieRecommendationComponent} from './containers/movie-recommendation/movie-recommendation.component';
import {MovieListComponent} from './containers/movie-list/movie-list.component';
import {MovieDataProvider} from './data-provider/movie.data-provider';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MovieDetailComponent } from './containers/movie-detail/movie-detail.component';


@NgModule({
  declarations: [MovieRecommendationComponent, MovieListComponent, MovieDetailComponent],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MovieRoutingModule
  ],
  providers: [
    MovieDataProvider
  ],
  exports: [
    RouterModule
  ]
})
export class MovieModule {
}
