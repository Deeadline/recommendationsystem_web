import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie-routing.module';
import { MovieRecommendationComponent } from './movie-recommendation/movie-recommendation.component';
import { MovieListComponent } from './movie-list/movie-list.component';


@NgModule({
  declarations: [MovieRecommendationComponent, MovieListComponent],
  imports: [
    CommonModule,
    MovieRoutingModule
  ]
})
export class MovieModule { }
