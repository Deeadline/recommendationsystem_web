import {CoreViewModel} from '../../../core/model/core.view.model';
import {MovieDetailApiModel} from '../../../api/model/movie-detail.api.model';
import {GenreViewModel} from './genre.view.model';
import {MovieCommentViewModel} from './movie-comment.view.model';
import {MovieFeedbackViewModel} from './movie-feedback.view.model';

export class MovieDetailViewModel extends CoreViewModel<MovieDetailApiModel> {
  public id: number = null;
  public title: string = null;
  public releaseYear: number = null;
  public genres: GenreViewModel[] = null;
  public averageRate: number = null;
  public numberOfVotes: number = null;
  public currentUserFeedback: MovieFeedbackViewModel = null;
  public comments: MovieCommentViewModel[] = null;

  constructor(protected apiModel: MovieDetailApiModel = new MovieDetailApiModel()) {
    super(apiModel);
    this.fromApiModel();
  }

  fromApiModel(): void {
    this.id = this.apiModel.id;
    this.title = this.apiModel.title;
    this.releaseYear = this.apiModel.releaseYear;
    this.averageRate = this.apiModel.averageRate;
    this.numberOfVotes = this.apiModel.numberOfVotes;
  }

  toApiModel(): MovieDetailApiModel {
    return Object.assign(this.apiModel, {
      id: this.id,
      title: this.title,
      averageRate: this.averageRate,
      releaseYear: this.releaseYear,
      genresIds: this.genres.map(genre => genre.id),
      numberOfVotes: this.numberOfVotes
    });
  }
}
