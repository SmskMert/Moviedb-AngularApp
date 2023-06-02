import { Component} from '@angular/core';
import { MovieGenreService } from '../movie-genre.service';
import { MovieService } from '../movie.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Movie } from '../movies/movie';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.scss'],
})
export class MovieCreateComponent {
  genres$ = this.movieGenreService.movieGenres$;

  addedMovies$ = this.movieService.moviesWithAdd$;
  movieForm = this.fb.group({
    title: ['', Validators.required],
    releaseDate: ['', Validators.required],
    director: ['', Validators.required],
    rating: ['', Validators.required],
    budget: ['', Validators.required],
    language: ['', Validators.required],
    country: ['', Validators.required],
  });

  genreForm = new FormGroup({
    drama: new FormControl(),
    comedy: new FormControl(),
    romance: new FormControl(),
    horror: new FormControl(),
    thriller: new FormControl(),
    action: new FormControl(),
    scifi: new FormControl(),
  });

  constructor(
    private movieGenreService: MovieGenreService,
    private movieService: MovieService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  getGenreId(formGroup: FormGroup): number {
    const formGroupKeys = Object.keys(formGroup.value);
    console.log(formGroupKeys);
    for (let i = 1; i < formGroupKeys.length; i++) {
      if (formGroup.value[formGroupKeys[i]] != null) {
        return +formGroup.value[formGroupKeys[i]];
      }
    }
    return 0;
  }

  createMovie() {
    this.getGenreId(this.genreForm);
    const newMovie: Movie = {
      id: Math.floor(Math.random() * 101) + 200,
      title: this.movieForm.value.title ? this.movieForm.value.title : '',
      releaseDate: this.movieForm.value.releaseDate
        ? this.movieForm.value.releaseDate
        : '',
      director: this.movieForm.value.director
        ? this.movieForm.value.director
        : '',
      language: this.movieForm.value.language
        ? this.movieForm.value.language
        : '',
      genreId: this.getGenreId(this.genreForm),
      rating: this.movieForm.value.rating
        ? parseFloat(this.movieForm.value.rating)
        : 1.1,
      budget: this.movieForm.value.budget ? this.movieForm.value.budget : '',
      country: this.movieForm.value.country ? this.movieForm.value.country : '',
    };
    console.log(newMovie);
    this.movieService.addMovie(newMovie);
    this.router.navigate(['/movies']);
  }
}
