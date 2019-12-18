import {Exclude, Expose, Type} from 'class-transformer';

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
  @Type(() => Date)
  public createdAt: Date;

  @Expose()
  @Type(() => Date)
  public updatedAt: Date;
}
