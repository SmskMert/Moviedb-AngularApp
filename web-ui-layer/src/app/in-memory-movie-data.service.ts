import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Movie } from './movies/movie';
import { moviesData } from './movies/movie-data';
import { MovieGenre } from './movie-genres/movie-genre';
import { movieGenresData } from './movie-genres/movie-genres-data';
@Injectable({
  providedIn: 'root',
})
export class InMemoryMovieDataService implements InMemoryDbService {
  createDb() {
    const movies: Movie[] = moviesData;
    const movieGenre: MovieGenre[] = movieGenresData;
    return { movies , movieGenre };
  }
}
