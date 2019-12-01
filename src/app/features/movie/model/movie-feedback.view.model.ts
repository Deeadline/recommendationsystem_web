import {CoreViewModel} from '../../../core/model/core.view.model';
import {MovieFeedbackApiModel} from '../../../api/model/movie-feedback.api.model';

export class MovieFeedbackViewModel extends CoreViewModel<MovieFeedbackApiModel> {
  public id: number = null;
  public userId: number = null;
  public rate: number = null;

  constructor(protected apiModel: MovieFeedbackApiModel = new MovieFeedbackApiModel()) {
    super(apiModel);
    this.fromApiModel();
  }

  fromApiModel(): void {
    this.id = this.apiModel.id;
    this.rate = this.apiModel.rate;
    this.userId = this.apiModel.userId;
  }

  toApiModel(): MovieFeedbackApiModel {
    return Object.assign(this.apiModel, this);
  }
}
