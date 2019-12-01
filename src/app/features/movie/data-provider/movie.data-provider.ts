import {Injectable} from '@angular/core';
import {MovieRestService} from '../../../api/rest/movie.rest.service';
import {forkJoin, Observable} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {MovieApiModel} from '../../../api/model/movie.api.model';
import {MovieViewModel} from '../model/movie.view.model';
import {MovieDetailViewModel} from '../model/movie-detail.view.model';
import {GenreViewModel} from '../model/genre.view.model';
import {GenreApiModel} from '../../../api/model/genre.api.model';
import {MovieDetailApiModel} from '../../../api/model/movie-detail.api.model';
import {MovieCommentViewModel} from '../model/movie-comment.view.model';
import {MovieFeedbackViewModel} from '../model/movie-feedback.view.model';
import {CommentApiModel} from '../../../api/model/comment.api.model';

@Injectable()
export class MovieDataProvider {

  constructor(private movieRestService: MovieRestService) {
  }

  public getList(): Observable<MovieViewModel[]> {
    return this.movieRestService.getAll()
      .pipe(
        map((movies: MovieApiModel[]) => movies.map(movie => {
          const viewModel = new MovieViewModel(movie);
          this.getAllGenres()
            .pipe(
              map(result => result.filter(r => movie.genresIds.indexOf(r.id) === 0))
            ).subscribe(genres => viewModel.genres = genres);
          return viewModel;
        }))
      );
  }

  public getMovie(id: number): Observable<MovieDetailViewModel> {
    return this.movieRestService.getById(id)
      .pipe(
        map((movie: MovieDetailApiModel) => {
          const viewModel = new MovieDetailViewModel(movie);
          viewModel.currentUserFeedback = new MovieFeedbackViewModel(movie.feedback);
          this.getAllGenres()
            .pipe(
              map((result: GenreViewModel[]) => result.filter(r => movie.genresIds.indexOf(r.id) === 0))
            ).subscribe(genres => viewModel.genres = genres);
          return viewModel;
        }),
        mergeMap((movie: MovieDetailViewModel) => {
          return this.movieRestService.getComments(movie.id)
            .pipe(
              map((comments: CommentApiModel[]) => {
                movie.comments = comments.map(comment => new MovieCommentViewModel(comment));
                return movie;
              })
            );
        })
      );
  }

  public getRecommendations(userId: number): Observable<MovieViewModel[]> {
    return this.movieRestService.getRecommendations(userId)
      .pipe(
        map((movies: MovieApiModel[]) => movies.map(movie => {
          const viewModel = new MovieViewModel(movie);
          this.getAllGenres()
            .pipe(
              map(result => result.filter(r => movie.genresIds.indexOf(r.id) === 0))
            ).subscribe(genres => viewModel.genres = genres);
          return viewModel;
        }))
      );
  }

  public getAllGenres(): Observable<GenreViewModel[]> {
    return this.movieRestService
      .getGenres()
      .pipe(
        map((genres: GenreApiModel[]) => genres.map(genre => new GenreViewModel(genre)))
      );
  }
}
