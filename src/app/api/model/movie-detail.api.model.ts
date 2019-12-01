import {Exclude, Expose, Transform} from 'class-transformer';
import {MovieFeedbackApiModel} from './movie-feedback.api.model';

@Exclude()
export class MovieDetailApiModel {
  @Expose()
  public id: number;

  @Expose()
  public title: string;

  @Expose()
  public releaseYear: number;

  @Expose()
  public genresIds: number[];

  @Expose()
  public averageRate: number;

  @Expose()
  public numberOfVotes: number;

  @Expose()
  @Transform(() => MovieFeedbackApiModel)
  public feedback: MovieFeedbackApiModel;
}
