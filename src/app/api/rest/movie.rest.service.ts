import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MovieApiModel} from '../model/movie.api.model';
import {classToPlain, plainToClass} from 'class-transformer';
import {map, shareReplay} from 'rxjs/operators';
import {MovieDetailApiModel} from '../model/movie-detail.api.model';
import {GenreApiModel} from '../model/genre.api.model';
import {CommentApiModel} from '../model/comment.api.model';
import {MovieFeedbackApiModel} from '../model/movie-feedback.api.model';

@Injectable()
export class MovieRestService {

  private genres$: Observable<GenreApiModel[]>;

  constructor(private httpService: HttpClient) {
  }

  public getAll(): Observable<MovieApiModel[]> {
    return this.httpService.get<MovieApiModel[]>('/api/movies')
      .pipe(
        map((result) => plainToClass(MovieApiModel, result as object[]))
      );
  }

  public getById(id: number): Observable<MovieDetailApiModel> {
    return this.httpService.get<MovieDetailApiModel>(`/api/movies/${id}`)
      .pipe(
        map((result) => plainToClass(MovieDetailApiModel, result as object))
      );
  }

  public addMovie(request: MovieApiModel): Observable<MovieApiModel> {
    return this.httpService.post<MovieApiModel>(`/api/movies`, classToPlain(request))
      .pipe(
        map((result) => plainToClass(MovieApiModel, result as object))
      );
  }

  public updateMovie(request: MovieApiModel): Observable<boolean> {
    return this.httpService.put<boolean>(`/api/movies/${request.id}`, classToPlain(request));
  }

  public deleteMovie(movieId: number, commentId: number): Observable<boolean> {
    return this.httpService.delete<boolean>(`/api/movies/${movieId}/comments/${commentId}`);
  }

  public getRecommendations(): Observable<MovieApiModel[]> {
    return this.httpService.get<MovieApiModel[]>(`/api/movies/recommendation/`)
      .pipe(
        map((result) => plainToClass(MovieApiModel, result as object[]))
      );
  }

  public getGenres(): Observable<GenreApiModel[]> {
    if (!this.genres$) {
      this.genres$ = this.httpService.get<GenreApiModel[]>('/api/movies/genres')
        .pipe(
          map((result) => plainToClass(GenreApiModel, result as object[])),
          shareReplay(1)
        );
    }
    return this.genres$;
  }

  public getComments(movieId: number): Observable<CommentApiModel[]> {
    return this.httpService.get<CommentApiModel[]>(`/api/movies/${movieId}/comments`)
      .pipe(
        map((result) => plainToClass(CommentApiModel, result as object[]))
      );
  }

  public addComment(movieId: number, request: CommentApiModel): Observable<CommentApiModel> {
    return this.httpService.post<CommentApiModel>(`/api/movies/${movieId}/comments`, classToPlain(request))
      .pipe(
        map((result) => plainToClass(CommentApiModel, result as object))
      );
  }

  public updateComment(movieId: number, request: CommentApiModel): Observable<CommentApiModel> {
    return this.httpService.put<CommentApiModel>(`/api/movies/${movieId}/comments/${request.id}`, classToPlain(request))
      .pipe(
        map((result) => plainToClass(CommentApiModel, result as object))
      );
  }

  public deleteComment(movieId: number, commentId: number): Observable<boolean> {
    return this.httpService.delete<boolean>(`/api/movies/${movieId}/comments/${commentId}`);
  }

  public addFeedback(movieId: number, request: MovieFeedbackApiModel): Observable<MovieFeedbackApiModel> {
    return this.httpService.post<MovieFeedbackApiModel>(`/api/movies/${movieId}/rates`, classToPlain(request))
      .pipe(
        map((result) => plainToClass(MovieFeedbackApiModel, result as object))
      );
  }

  public updateFeedback(movieId: number, request: MovieFeedbackApiModel): Observable<boolean> {
    return this.httpService.put<boolean>(`/api/movies/${movieId}/rates/${request.id}`, classToPlain(request));
  }
}
