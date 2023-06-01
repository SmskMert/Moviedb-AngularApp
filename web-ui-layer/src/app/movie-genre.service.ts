import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieGenre } from './movie-genres/movie-genre';
import { take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieGenreService {

private movieGenresUrl = 'api/movieGenre';

  constructor(private http: HttpClient) { }

  movieGenres$ = this.http.get<MovieGenre[]>(this.movieGenresUrl)
  .pipe(
    tap(data => console.log('movie genres:', JSON.stringify(data)))
    );

}
