import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../domain/movie';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  @Input() movie: Movie;
  @Input() baseUrl: string;
  imagePath: string;

  constructor() { }

  ngOnInit() {
    this.imagePath = this.baseUrl + 'original' + this.movie.backdrop_path;
  }

}
