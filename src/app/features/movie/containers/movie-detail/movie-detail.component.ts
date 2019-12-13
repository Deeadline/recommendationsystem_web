import {Component, OnInit} from '@angular/core';
import {MovieDataProvider} from '../../data-provider/movie.data-provider';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MovieDetailViewModel} from '../../model/movie-detail.view.model';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  public movie: MovieDetailViewModel;

  constructor(private dataProvider: MovieDataProvider,
              private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.router.params.subscribe(({id}: Params) => {
      this.dataProvider
        .getMovie(id)
        .subscribe((value) => {
          this.movie = value;
        });
    });
  }

}
