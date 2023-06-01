import { Component, OnInit } from '@angular/core';
import { MovieGenreService } from '../movie-genre.service';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MovieService } from '../movie.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-update',
  templateUrl: './movie-update.component.html',
  styleUrls: ['./movie-update.component.scss'],
})
export class MovieUpdateComponent implements OnInit {
  movieId: string = '';
  currentMovieGenreId: any;

  movie$ = this.movieService.movieToBeUpdated$;
  genres$ = this.movieGenreService.movieGenres$;

  title?: string = '';
  director?: string = '';
  releaseDate?: string = '';
  rating?: number = 0;
  budget?: string = '';
  language?: string = '';
  country?: string = '';

  genreForm: FormGroup = new FormGroup({
    genreId: new FormControl(Validators.required),
  });

  updateMovie(): void {
    if (
      this.title &&
      this.director &&
      this.rating &&
      this.budget &&
      this.language &&
      this.country &&
      this.releaseDate
    ) {
      this.movieService.updateMovieInArr({
        id: +this.movieId,
        title: this.title,
        director: this.director,
        releaseDate: this.releaseDate,
        rating: this.rating,
        budget: this.budget,
        language: this.language,
        country: this.country,
        genreId: +this.genreForm.value.genreId,
      });
    }
  }

  constructor(
    private movieGenreService: MovieGenreService,
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.movieId = params['id'];
    });
    this.movie$.subscribe((movie) => {
      this.genreForm.controls['genreId'].setValue(movie?.genreId.toString());
      this.title = movie?.title;
      this.director = movie?.director;
      this.releaseDate = movie?.releaseDate;
      this.rating = movie?.rating;
      this.budget = movie?.budget;
      this.language = movie?.language;
      this.country = movie?.country;
    });
    this.movieService.emitMovieId(+this.movieId);
  }
}
