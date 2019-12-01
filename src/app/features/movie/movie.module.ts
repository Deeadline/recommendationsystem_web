import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MovieRoutingModule} from './movie-routing.module';
import {MovieRecommendationComponent} from './movie-recommendation/movie-recommendation.component';
import {MovieListComponent} from './movie-list/movie-list.component';
import {MovieDataProvider} from './data-provider/movie.data-provider';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [MovieRecommendationComponent, MovieListComponent],
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
