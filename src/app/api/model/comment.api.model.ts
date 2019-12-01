import {Exclude, Expose, Transform} from 'class-transformer';

@Exclude()
export class CommentApiModel {
  @Expose()
  public id: number;

  @Expose()
  public description: string;

  @Expose()
  public userId: number;

  @Expose()
  public movieId: number;

  @Expose()
  @Transform((value) => Date)
  public createdAt: Date;

  @Expose()
  @Transform((value) => Date)
  public updatedAt: Date;
}
