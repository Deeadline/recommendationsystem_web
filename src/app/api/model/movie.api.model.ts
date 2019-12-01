import {Exclude, Expose} from 'class-transformer';

@Exclude()
export class MovieApiModel {
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
}
