import {CoreViewModel} from '../../../core/model/core.view.model';
import {GenreApiModel} from '../../../api/model/genre.api.model';
import {FormGroup} from '@angular/forms';

export class GenreViewModel extends CoreViewModel<GenreApiModel> {
  public id: number = null;
  public name: string = null;

  constructor(protected apiModel: GenreApiModel = new GenreApiModel()) {
    super(apiModel);
    this.fromApiModel();
  }

  fromApiModel(): void {
    this.id = this.apiModel.id;
    this.name = this.apiModel.name;
  }

  toApiModel(): GenreApiModel {
    return Object.assign(this.apiModel, {
      id: this.id,
      name: this.name,
    });
  }

  applyForm(form: FormGroup): this {
    return Object.assign(this, form.value);
  }
}
