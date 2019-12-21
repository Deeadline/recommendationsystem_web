import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MovieViewModel} from '../../model/movie.view.model';
import {GenreViewModel} from '../../model/genre.view.model';
import {MovieDataProvider} from '../../data-provider/movie.data-provider';
import {ActivatedRoute, Router} from '@angular/router';
import {forkJoin} from 'rxjs';
import {MovieDetailViewModel} from '../../model/movie-detail.view.model';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.scss']
})
export class MovieEditComponent implements OnInit {
  public formGroup: FormGroup;
  private movie: MovieDetailViewModel;
  public showSpinner = true;
  public genres: GenreViewModel[];

  constructor(
    private formBuilder: FormBuilder,
    private dataProvider: MovieDataProvider,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.activatedRouter.params.subscribe(({id}) => {
      forkJoin(
        this.dataProvider.getMovie(id),
        this.dataProvider.getAllGenres()
      ).subscribe(([movie, genres]) => {
        this.genres = genres;
        this.movie = movie;
        this.createForm();
        this.patchForm();
        this.showSpinner = false;
      });
    });
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      releaseYear: [null, [Validators.required, Validators.min(1901), Validators.max(2020)]],
      genres: [null, [Validators.required]]
    });
  }

  patchForm() {
    this.formGroup.patchValue(this.movie);
    console.log(this.formGroup.value);
  }

  submit() {
    if (this.formGroup.valid) {
      this.showSpinner = true;
      this.dataProvider
        .editMovie(this.movie.applyForm(this.formGroup))
        .subscribe(() => {
          this.showSpinner = false;
          this.router.navigate(['/app', 'movies']);
        });
    }
  }

  compareFn(g1: GenreViewModel, g2: GenreViewModel): boolean {
    return g1 && g2 ? g1.id === g2.id : g1 === g2;
  }
}
