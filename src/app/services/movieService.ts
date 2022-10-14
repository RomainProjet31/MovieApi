import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuration } from '../domain/configuration';
import { Movie } from '../domain/movie';
import { Result } from '../domain/result';

@Injectable({
    providedIn: 'root',
})
export class MovieService {

    token = "0eac0e0840d1042342d0faee3ca962ff";
    api_root = "https://api.themoviedb.org/3/";

    constructor(private httpClient: HttpClient) { }

    getMovieByName(name: string): Observable<Result> {
        const apiPath = this.api_root + 'search/movie?api_key=' + this.token + '&language=fr&query=' + name + '&page=1&include_adult=true';
        return this.httpClient.get<Result>(apiPath);
    }

    getBaseUrl(): Observable<Configuration> {
        const apiPath = this.api_root + "configuration?api_key=" + this.token
        return this.httpClient.get<Configuration>(apiPath);
    }
}