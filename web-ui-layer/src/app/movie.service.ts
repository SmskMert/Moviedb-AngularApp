import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from './movies/movie';
import { moviesData } from './movies/movie-data';
import {
  catchError,
  tap,
  of,
  Observable,
  forkJoin,
  combineLatest,
  map,
  Subject,
  BehaviorSubject,
} from 'rxjs';
import { MovieGenreService } from './movie-genre.service';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private moviesUrl = 'api/movies';
  constructor(
    private http: HttpClient,
    private movieGenreService: MovieGenreService
  ) {}

  private movieSelectedSubject = new BehaviorSubject<number>(0);
  movieSelectedAction$ = this.movieSelectedSubject.asObservable();

  private movieIdSubject = new BehaviorSubject<number>(1);
  movieIdAction$ = this.movieIdSubject.asObservable();

  movies$ = this.http.get<Movie[]>(this.moviesUrl).pipe(
    tap((data) => console.log('movies: ', JSON.stringify(data))),
    catchError(this.handleError<Movie[]>('getHeroes', []))
  );

  movieGenres$ = this.movieGenreService.movieGenres$.pipe(
    tap((movieGenre) => console.log(movieGenre))
  );

  moviesWithGenres$ = forkJoin([this.movies$, this.movieGenres$]).pipe(
    map(([movies, movieGenres]) =>
      movies.map(
        (movie) =>
          ({
            ...movie,
            genre: movieGenres.find((mg) => mg.id === movie.genreId)?.name,
          } as Movie)
      )
    )
  );

  movieToBeUpdated$ = combineLatest([
    this.moviesWithGenres$,
    this.movieIdAction$,
  ]).pipe(
    map(([movies, selectedMovieId]) =>
      movies.find((movie) => movie.id == selectedMovieId)
    )
  );

  selectedMovie$ = combineLatest([
    this.moviesWithGenres$,
    this.movieSelectedAction$,
  ]).pipe(
    map(([movies, selectedMovieId]) =>
      movies.find((movie) => movie.id == selectedMovieId)
    )
  );

  selectedMovieChanged(selectedMovieId: number): void {
    this.movieSelectedSubject.next(selectedMovieId);
  }
  emitMovieId(selectedMovieId: number): void {
    this.movieIdSubject.next(selectedMovieId);
  }

  private movieAddedSubject = new Subject<Movie>();
  movieAddedAction$ = this.movieAddedSubject.asObservable();

  addMovie(newMovie: Movie) {
    moviesData.unshift(newMovie);
    this.movieAddedSubject.next(newMovie);
  }
  updateMovieInArr(updatedMovie:Movie):void{
    moviesData.forEach((movie, index) => {
      if(movie.id === updatedMovie.id) moviesData[index] = updatedMovie;
    } )
    console.log(JSON.stringify(updatedMovie), 'Updated Successfully')
  }

  moviesWithAdd$ = combineLatest([this.movies$, this.movieAddedAction$]).pipe(
    tap((data) => console.log(JSON.stringify(data))),
    map((movies, movieAdded) => [...movies, movieAdded])
  );

  fakeMovie: Movie = {
    id: 111,
    title: 'PI Works',
    releaseDate: '1/11/1111',
    director: 'Mert Mert',
    genreId: 1,
    rating: 1.1,
    budget: 'Ruble',
    language: 'Turkish',
    country: 'Turkey',
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
