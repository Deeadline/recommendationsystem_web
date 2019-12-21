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
  public description: string;
  private copyComment: MovieCommentViewModel;

  constructor(
    private formBuilder: FormBuilder,
    private dataProvider: MovieDataProvider,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.activateRoute.params.subscribe(({id}: Params) => {
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

      this.dataProvider
        .addComment(model.applyForm(this.form))
        .subscribe((item) => {
          this.form.reset();
          this.movie.comments.push(item);
          this.showSpinner = false;
        });
    }
  }

  toggleEdit(id: number) {
    this.copyComment = this.movie.comments.find(comment => comment.id === id);
    this.description = this.copyComment.description;
  }

  delete(id: number) {
    this.showSpinner = true;
    this.dataProvider
      .deleteComment(this.movie.id, id)
      .subscribe(() => {
        this.movie.comments = this.movie.comments.filter((comment) => comment.id !== id);
        this.showSpinner = false;
      });
  }

  update() {
    this.copyComment.description = this.description;
    this.dataProvider
      .updateComment(this.copyComment)
      .subscribe((v) => {
        this.copyComment = null;
        this.description = null;
        this.movie.comments = this.movie.comments.map((movie) => {
          if (movie.id === v.id) {
            movie = v;
          }
          return movie;
        });
      });
  }

  deleteMovie() {
    this.dataProvider
      .deleteMovie(this.movie.id)
      .subscribe(() => {
        this.router.navigate(['/app', 'movies']);
      });
  }
}
