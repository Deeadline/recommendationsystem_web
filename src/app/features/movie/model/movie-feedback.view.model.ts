import {CoreViewModel} from '../../../core/model/core.view.model';
import {MovieFeedbackApiModel} from '../../../api/model/movie-feedback.api.model';
import {FormGroup} from '@angular/forms';

export class MovieFeedbackViewModel extends CoreViewModel<MovieFeedbackApiModel> {
  public id: number = null;
  public userId: number = null;
  public rate: number = null;

  constructor(protected apiModel: MovieFeedbackApiModel = new MovieFeedbackApiModel()) {
    super(apiModel);
    this.fromApiModel();
  }

  fromApiModel(): void {
    this.id = this.apiModel.id || null;
    this.rate = this.apiModel.rate || null;
    this.userId = this.apiModel.userId || null;
  }

  toApiModel(): MovieFeedbackApiModel {
    return Object.assign(this.apiModel, {
      id: this.id,
      rate: this.rate,
      userId: this.userId
    });
  }
  applyForm(form: FormGroup) {
    Object.assign(this, form.value);
  }
}
