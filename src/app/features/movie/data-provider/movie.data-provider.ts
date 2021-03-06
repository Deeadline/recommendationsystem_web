import {Injectable} from '@angular/core';
import {MovieRestService} from '../../../api/rest/movie.rest.service';
import {forkJoin, Observable} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {MovieApiModel} from '../../../api/model/movie.api.model';
import {MovieViewModel} from '../model/movie.view.model';
import {MovieDetailViewModel} from '../model/movie-detail.view.model';
import {GenreViewModel} from '../model/genre.view.model';
import {GenreApiModel} from '../../../api/model/genre.api.model';
import {MovieCommentViewModel} from '../model/movie-comment.view.model';
import {MovieFeedbackViewModel} from '../model/movie-feedback.view.model';
import {CommentApiModel} from '../../../api/model/comment.api.model';
import {UserRestService} from '../../../api/rest/user.rest.service';
import {UserViewModel} from '../../../core/model/user.view.model';

@Injectable()
export class MovieDataProvider {

  constructor(
    private movieRestService: MovieRestService,
    private userRestService: UserRestService
  ) {
  }

  public addMovie(movie: MovieViewModel): Observable<MovieViewModel> {
    return this.movieRestService
      .addMovie(movie.toApiModel())
      .pipe(
        map((result) => new MovieViewModel(result))
      );
  }

  public editMovie(movie: MovieDetailViewModel): Observable<MovieDetailViewModel> {
    return this.movieRestService
      .updateMovie(movie.toApiModel())
      .pipe(
        map((result) => movie)
      );
  }

  public getList(): Observable<MovieViewModel[]> {
    return this.movieRestService.getAll()
      .pipe(
        mergeMap((movies: MovieApiModel[]) => {
          return this.getAllGenres()
            .pipe(
              map((result) => movies.map((movie) => {
                const viewModel = new MovieViewModel(movie);
                viewModel.genres = result.filter(r => movie.genresIds.includes(r.id));
                return viewModel;
              }))
            );
        })
      );
  }

  public getMovie(id: number): Observable<MovieDetailViewModel> {
    return forkJoin(
      this.userRestService.current(),
      this.movieRestService.getById(id))
      .pipe(
        mergeMap(([user, movie]) => {
          return this.getAllGenres()
            .pipe(
              map((result) => {
                const viewModel = new MovieDetailViewModel(movie);
                const newMovieFeedbackViewModel = new MovieFeedbackViewModel();
                newMovieFeedbackViewModel.userId = user.id;
                viewModel.currentUserFeedback =
                  movie.feedback !== null ? new MovieFeedbackViewModel(movie.feedback) : newMovieFeedbackViewModel;
                viewModel.genres = result.filter(r => movie.genresIds.includes(r.id));
                return {user, viewModel};
              })
            );
        }),
        mergeMap(({user, viewModel: movie}) => {
          return this.movieRestService.getComments(movie.id)
            .pipe(
              map((comments: CommentApiModel[]) => {
                movie.comments = comments.map(comment => {
                  const movieComment = new MovieCommentViewModel(comment);
                  movieComment.user = new UserViewModel(user);
                  return movieComment;
                });
                return movie;
              })
            );
        })
      );
  }

  public getRecommendations(): Observable<MovieViewModel[]> {
    return this.movieRestService.getRecommendations()
      .pipe(
        mergeMap((movies: MovieApiModel[]) => {
          return this.getAllGenres()
            .pipe(
              map((result) => movies.map((movie) => {
                const viewModel = new MovieViewModel(movie);
                viewModel.genres = result.filter(r => movie.genresIds.includes(r.id));
                return viewModel;
              }))
            );
        })
      );
  }

  public getAllGenres(): Observable<GenreViewModel[]> {
    return this.movieRestService
      .getGenres()
      .pipe(
        map((genres: GenreApiModel[]) => genres.map(genre => new GenreViewModel(genre)))
      );
  }

  private addRate(movie: MovieDetailViewModel): Observable<MovieDetailViewModel> {
    return this.movieRestService
      .addFeedback(movie.id, movie.currentUserFeedback.toApiModel())
      .pipe(
        map((result) => {
          movie.currentUserFeedback.id = result.id;
          return movie;
        })
      );
  }

  public saveRate(movie: MovieDetailViewModel): Observable<MovieDetailViewModel> {
    if (movie.currentUserFeedback.id) {
      return this.updateRate(movie);
    } else {
      return this.addRate(movie);
    }
  }

  private updateRate(movie: MovieDetailViewModel): Observable<MovieDetailViewModel> {
    return this.movieRestService
      .updateFeedback(movie.id, movie.currentUserFeedback.toApiModel())
      .pipe(
        map((result) => movie)
      );
  }

  public addComment(comment: MovieCommentViewModel): Observable<MovieCommentViewModel> {
    return this.userRestService.current()
      .pipe(
        mergeMap((user) => {
          comment.userId = user.id;
          return this.movieRestService
            .addComment(comment.movieId, comment.toApiModel())
            .pipe(
              map((result) => {
                const movieComment = new MovieCommentViewModel(result);
                movieComment.user = new UserViewModel(user);
                return movieComment;
              })
            );
        })
      );
  }

  public updateComment(comment: MovieCommentViewModel): Observable<MovieCommentViewModel> {
    return this.userRestService.current()
      .pipe(
        mergeMap((user) => {
          comment.userId = user.id;
          return this.movieRestService
            .updateComment(comment.movieId, comment.toApiModel())
            .pipe(
              map((result) => {
                const movieComment = new MovieCommentViewModel(result);
                movieComment.user = new UserViewModel(user);
                return movieComment;
              })
            );
        })
      );
  }

  public deleteComment(movieId, id: number): Observable<boolean> {
    return this.movieRestService
      .deleteComment(movieId, id);
  }

  deleteMovie(id: number) {
    return this.movieRestService
      .deleteMovie(id);
  }
}
