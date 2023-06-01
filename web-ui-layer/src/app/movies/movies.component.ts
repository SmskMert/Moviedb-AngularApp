import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MovieService } from '../movie.service';
import {
  EMPTY,
  Subject,
  catchError,
  combineLatest,
  forkJoin,
  map,
  startWith,
  take,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesComponent {
  constructor(private movieService: MovieService) {}
  pageTitle: string = 'Movies';
  errorMessage = '';
  selectedGenre?: number;
  private genreSelectedSubject = new Subject<number>();
  genreSelectedAction$ = this.genreSelectedSubject.asObservable();

  movies$ = combineLatest([
    this.movieService.moviesWithGenres$,
    this.genreSelectedAction$.pipe(startWith(0)),
  ]).pipe(
    map(([movies, selectedGenreId]) =>
    { return  movies.filter((movie) =>
        selectedGenreId ? movie.genreId === selectedGenreId : true
      )}
    ),
    catchError((err) => {
      return EMPTY;
    })
  );
  
  movieGenres$ = this.movieService.movieGenres$;
  movie$= this.movieService.selectedMovie$;

  onCategoryClicked(genreId: number): void {
    this.selectedGenre = genreId;
    this.genreSelectedSubject.next(genreId);
  }


  onDetailClicked(movieId: number): void {
   this.movieService.selectedMovieChanged(movieId);
  }
}
