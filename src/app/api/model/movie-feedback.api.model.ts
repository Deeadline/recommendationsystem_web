import {Exclude, Expose, Transform} from 'class-transformer';

@Exclude()
export class MovieFeedbackApiModel {
  @Expose()
  @Transform((value) => value === undefined ? null : value)
  public id: number;

  @Expose()
  @Transform((value) => value === undefined ? null : value)
  public userId: number;

  @Expose()
  @Transform((value) => value === undefined ? null : value)
  public rate: number;
}
