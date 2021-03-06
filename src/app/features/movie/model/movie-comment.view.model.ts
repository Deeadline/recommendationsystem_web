import {CoreViewModel} from '../../../core/model/core.view.model';
import {CommentApiModel} from '../../../api/model/comment.api.model';
import {FormGroup} from '@angular/forms';
import {UserViewModel} from '../../../core/model/user.view.model';

export class MovieCommentViewModel extends CoreViewModel<CommentApiModel> {
  public id: number = null;
  public description: string = null;
  public createdAt: Date = null;
  public updatedAt: Date = null;
  public userId: number = null;
  public movieId: number = null;
  public user: UserViewModel = null;

  constructor(protected apiModel: CommentApiModel = new CommentApiModel()) {
    super(apiModel);
    this.fromApiModel();
  }

  fromApiModel(): void {
    this.id = this.apiModel.id;
    this.movieId = this.apiModel.movieId;
    this.createdAt = this.apiModel.createdAt;
    this.updatedAt = this.apiModel.updatedAt;
    this.description = this.apiModel.description;
    this.userId = this.apiModel.userId;
  }

  toApiModel(): CommentApiModel {
    return Object.assign(this.apiModel, {
      description: this.description,
      createdAt: this.createdAt,
      id: this.id,
      movieId: this.movieId,
      updatedAt: this.updatedAt,
      userId: this.userId
    });
  }

  applyForm(form: FormGroup): this {
    return Object.assign(this, form.value);
  }
}
