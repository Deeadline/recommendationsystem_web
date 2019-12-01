import {Exclude, Expose} from 'class-transformer';

@Exclude()
export class GenreApiModel {
  @Expose()
  public id: number;

  @Expose()
  public name: string;
}
