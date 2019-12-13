import {Component, OnInit} from '@angular/core';
import {MovieViewModel} from '../../model/movie.view.model';
import {MovieDataProvider} from '../../data-provider/movie.data-provider';
import {PageEvent} from '@angular/material';

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

  constructor(private dataProvider: MovieDataProvider) {
  }

  ngOnInit() {
    this.dataProvider
      .getList()
      .subscribe((value) => {
        this.breakPoint = (window.innerWidth <= 800) ? 1 : 3;
        this.length = value.length;
        this._pagedList = value.slice(0, 10);
        this.showSpinner = false;
        this._movies = value;
      });
  }

  onChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.length) {
      endIndex = this.length;
    }
    this._pagedList = this._movies.slice(startIndex, endIndex);
  }

  get movies(): MovieViewModel[] {
    return this._pagedList;
  }
}
