import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { config } from 'process';
import { Configuration } from '../domain/configuration';
import { Movie } from '../domain/movie';
import { MovieService } from '../services/movieService';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  formGroup: FormGroup;
  limits: number[] = [5, 10, 50, 100];
  errorMsg: string;
  error: boolean;
  result: Movie[];
  configuration: Configuration;

  constructor(builder: FormBuilder, private movieService: MovieService) {
    this.formGroup = builder.group({
      title: [null, Validators.required],
      limit: [10, Validators.required]
    });
    this.errorMsg = "Veuillez renseigner le nombre de films à afficher et le titre du film"
    this.error = false;
    this.result = [];
  }

  ngOnInit() {
    this.movieService.getBaseUrl().subscribe(configuration => this.configuration = configuration);
  }

  search() {
    if (this.formGroup.valid) {
      this.error = false;
      const title = this.formGroup.get('title').value;
      const limit = this.formGroup.get('limit').value;
      this.movieService.getMovieByName(title).subscribe(result => {
        this.result = result.results.slice(0, limit);
        console.log(this.result);
      });
    } else {
      this.error = true;
    }
  }
}
