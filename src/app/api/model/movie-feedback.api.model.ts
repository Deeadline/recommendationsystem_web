import {Exclude, Expose} from 'class-transformer';

@Exclude()
export class MovieFeedbackApiModel {
  @Expose()
  public id: number;

  @Expose()
  public userId: number;

  @Expose()
  public rate: number;
}
