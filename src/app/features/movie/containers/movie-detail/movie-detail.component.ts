import {Component, OnInit} from '@angular/core';
import {MovieDataProvider} from '../../data-provider/movie.data-provider';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MovieDetailViewModel} from '../../model/movie-detail.view.model';
import {MovieCommentViewModel} from '../../model/movie-comment.view.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  public movie: MovieDetailViewModel;
  public showSpinner = true;
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dataProvider: MovieDataProvider,
    private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.router.params.subscribe(({id}: Params) => {
      this.dataProvider
        .getMovie(id)
        .subscribe((value) => {
          this.movie = value;
          this.createForm();
          this.showSpinner = false;
        });
    });
  }

  private createForm() {
    this.form = this.formBuilder.group({
      description: [null, [Validators.required, Validators.maxLength(500)]]
    });
  }

  onRateChange(rate: number) {
    if (rate !== 0) {
      this.showSpinner = true;
      this.dataProvider
        .saveRate(this.movie)
        .subscribe(() => this.showSpinner = false);
    }
  }

  addComment() {
    if (this.form.valid) {
      this.showSpinner = true;
      const model = new MovieCommentViewModel();
      model.movieId = this.movie.id;
      model.applyForm(this.form);
      this.dataProvider
        .addComment(model)
        .subscribe((item) => {
          this.form.reset();
          this.movie.comments.push(item);
          this.showSpinner = false;
        });
    }
  }
}
