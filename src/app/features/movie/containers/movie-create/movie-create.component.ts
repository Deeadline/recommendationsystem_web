import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MovieDataProvider} from '../../data-provider/movie.data-provider';
import {MovieViewModel} from '../../model/movie.view.model';
import {GenreViewModel} from '../../model/genre.view.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.scss']
})
export class MovieCreateComponent implements OnInit {

  public formGroup: FormGroup;
  private movie = new MovieViewModel();
  public showSpinner = true;
  public genres: GenreViewModel[];

  constructor(
    private formBuilder: FormBuilder,
    private dataProvider: MovieDataProvider,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.dataProvider.getAllGenres()
      .subscribe((genres) => {
        this.genres = genres;
        this.createForm();
        this.showSpinner = false;
      });
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      releaseYear: [null, [Validators.required, Validators.min(1901), Validators.max(2020)]],
      genres: [null, [Validators.required]]
    });
  }

  submit() {
    if (this.formGroup.valid) {
      this.showSpinner = true;
      this.dataProvider
        .addMovie(this.movie.applyForm(this.formGroup))
        .subscribe(() => {
          this.showSpinner = false;
          this.router.navigate(['/app', 'movies']);
        });
    }
  }

}
