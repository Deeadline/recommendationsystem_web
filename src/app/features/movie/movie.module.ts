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
import { MovieCreateComponent } from './containers/movie-create/movie-create.component';
import { MovieEditComponent } from './containers/movie-edit/movie-edit.component';


@NgModule({
  declarations: [MovieRecommendationComponent, MovieListComponent, MovieDetailComponent, MovieCreateComponent, MovieEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MovieRoutingModule,
    SharedModule.forRoot()
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
