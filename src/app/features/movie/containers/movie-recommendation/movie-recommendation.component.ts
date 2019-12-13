import {Component, OnInit} from '@angular/core';
import {MovieDataProvider} from '../../data-provider/movie.data-provider';
import {MovieViewModel} from '../../model/movie.view.model';

@Component({
  selector: 'app-movie-recommendation',
  templateUrl: './movie-recommendation.component.html',
  styleUrls: ['./movie-recommendation.component.scss']
})
export class MovieRecommendationComponent implements OnInit {
  public showSpinner = true;
  private _recommendedMovies: MovieViewModel[] = [];

  constructor(private dataProvider: MovieDataProvider) {
  }

  ngOnInit() {
    this.dataProvider
      .getRecommendations()
      .subscribe((value) => {
        this.showSpinner = false;
        console.log(value);
        this._recommendedMovies = value;
      });
  }

  get movies(): MovieViewModel[] {
    return this._recommendedMovies;
  }
}
