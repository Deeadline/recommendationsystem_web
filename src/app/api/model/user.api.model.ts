import {Exclude, Expose} from 'class-transformer';

@Exclude()
export class UserApiModel {
  @Expose()
  public id: number;

  @Expose()
  public firstName: string;

  @Expose()
  public lastName: string;

  @Expose()
  public email: string;

  @Expose()
  public role: string;
}
