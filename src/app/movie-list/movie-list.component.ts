import { Message } from '../domain/message';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  leftIndex: number;
  pageIndex: number;
  result: Movie[];
  resultNoLimit: Movie[];
  configuration: Configuration;
  leftArrow: boolean;
  rightArrow: boolean;
  maxPageToShow: number;
  pagesToShow: number[];
  messageManager: Message;
  msgToShow: string;
  loading: boolean;

  constructor(builder: FormBuilder, private movieService: MovieService) {
    this.formGroup = builder.group({
      title: [null, Validators.required],
      limit: [10, Validators.required],
      adultContent: [false, Validators.required]
    });
    this.errorMsg = "Veuillez renseigner le nombre de films à afficher et le titre du film"
    this.error = false;
    this.result = [];
    this.pageIndex = 0;
  }

  ngOnInit() {
    this.messageManager = new Message();
    this.movieService.getBaseUrl().subscribe(configuration => this.configuration = configuration);
  }

  search() {
    if (this.formGroup.valid) {
      this.result = [];
      this.loading = true;
      this.error = false;
      const title = this.formGroup.get('title').value;
      const adultContent = this.formGroup.get('adultContent').value;
      const timeOut = adultContent ? 1000 : 0;
      this.manageMessageWarning(adultContent);
      setTimeout(() => {
        this.updateMovies(title, adultContent);
        this.loading = false;
      }, timeOut);
    } else {
      this.error = true;
    }
  }

  manageMessageWarning(adultContent: boolean) {
    if (adultContent) {
      this.msgToShow = this.messageManager.getMessage();
    }
    else {
      this.msgToShow = '';
      this.messageManager.reset();
    }
  }

  updateMovies(title: string, adultContent: boolean) {
    this.movieService.getMovieByName(title, adultContent).subscribe(result => {
      this.resultNoLimit = result.results;
      this.pageIndex = 0;
      this.getPage();
    });
  }

  incrementPage() {
    this.pageIndex++;
    this.getPage();
  }

  decrementPage() {
    this.pageIndex--;
    this.getPage();
  }

  setPage(pageIndex: number) {
    this.pageIndex = pageIndex;
    this.getPage();
  }

  getPage() {
    const limit = this.formGroup.get('limit').value;
    this.leftIndex = (limit + 1) * this.pageIndex;
    const rightIndex = this.leftIndex + limit;
    this.result = this.resultNoLimit.slice(this.leftIndex, rightIndex);
    this.rightArrow = rightIndex < this.resultNoLimit.length;
    this.leftArrow = this.leftIndex > 0;
    this.changePageToShow();
    this.toTheTop();
  }

  changePageToShow() {
    this.pagesToShow = [];
    const limit = this.formGroup.get('limit').value;
    const minPageIndex = this.pageIndex == 0 ? this.pageIndex + 2 : this.pageIndex;
    const calculatedMax = minPageIndex + 3;

    this.maxPageToShow = this.resultNoLimit.length / limit;
    console.log(this.maxPageToShow, calculatedMax, this.resultNoLimit.length, limit);

    this.maxPageToShow = calculatedMax >= this.maxPageToShow ? this.maxPageToShow : calculatedMax;
    for (let i = minPageIndex; i <= this.maxPageToShow; i++) {
      this.pagesToShow.push(i);
    }
  }

  toTheTop() {
    window.scroll(0, 0);
  }

}
