import {CoreViewModel} from '../../../core/model/core.view.model';
import {MovieApiModel} from '../../../api/model/movie.api.model';
import {GenreViewModel} from './genre.view.model';
import {FormGroup} from '@angular/forms';

export class MovieViewModel extends CoreViewModel<MovieApiModel> {
    public id: number = null;
    public title: string = null;
    public releaseYear: number = null;
    public genres: GenreViewModel[] = null;
    public averageRate: number = null;

    constructor(protected apiModel: MovieApiModel = new MovieApiModel()) {
        super(apiModel);
        this.fromApiModel();
    }

    fromApiModel(): void {
        this.id = this.apiModel.id;
        this.title = this.apiModel.title;
        this.releaseYear = this.apiModel.releaseYear;
        this.averageRate = Number(this.apiModel.averageRate.toPrecision(2));
    }

    toApiModel(): MovieApiModel {
        return Object.assign(this.apiModel, {
            id: this.id,
            title: this.title,
            averageRate: this.averageRate,
            releaseYear: this.releaseYear,
            genresIds: this.genres.map(genre => genre.id)
        });
    }

    applyForm(form: FormGroup) {
        Object.assign(this, form.value);
    }
}
