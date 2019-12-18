import {Component, OnInit} from '@angular/core';
import {MovieViewModel} from '../../model/movie.view.model';
import {MovieDataProvider} from '../../data-provider/movie.data-provider';
import {MatSelectChange, PageEvent} from '@angular/material';
import {FormControl} from '@angular/forms';
import {forkJoin, Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Router} from '@angular/router';
import {GenreViewModel} from '../../model/genre.view.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  public showSpinner = true;
  private _movies: MovieViewModel[] = [];
  private _pagedList: MovieViewModel[] = [];
  public length = 0;
  public breakPoint = 3;
  public searchControl = new FormControl();
  public genres: GenreViewModel[] = [];
  public filteredOptions: Observable<MovieViewModel[]>;
  private _copyPagedList: MovieViewModel[] = [];

  constructor(
    private dataProvider: MovieDataProvider,
    private router: Router
  ) {
  }

  ngOnInit() {
    forkJoin(
      this.dataProvider.getAllGenres(),
      this.dataProvider.getList()
    )
      .subscribe(([genres, value]) => {
        this.breakPoint = (window.innerWidth <= 800) ? 1 : 3;
        this.length = value.length;
        this._pagedList = value.slice(0, 10);
        this._copyPagedList = [...this._pagedList];
        this.showSpinner = false;
        this._movies = value;
        this.genres = genres;
      });
    this.filteredOptions = this.searchControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.filter(value))
      );
  }

  onChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.length) {
      endIndex = this.length;
    }
    this._pagedList = this._movies.slice(startIndex, endIndex);
    this._copyPagedList = [...this._pagedList];
  }

  get movies(): MovieViewModel[] {
    return this._pagedList;
  }

  private filter(value: string): MovieViewModel[] {
    if (value === '') {
      return [];
    }
    const filterValue = value.toLowerCase();
    return this._movies.filter(movie => movie.title.toLowerCase().includes(filterValue));
  }

  onSelect(movie: MovieViewModel) {
    this.router.navigate([`/app/movies/${movie.id}/detail`]);
  }

  onSelectChange2({source, value}: MatSelectChange) {
    const genreIds = value.map((ev) => ev.id);
    this._pagedList = this._copyPagedList.filter((movie) => {
      return movie.genres.find(genre => genreIds.includes(genre.id));
    });
    if (this._pagedList.length === 0) {
      source.writeValue(null);
      this._pagedList = this._copyPagedList;
    }
  }
}
