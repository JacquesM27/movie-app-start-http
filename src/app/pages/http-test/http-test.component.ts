import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { HttpMoviesService } from 'src/app/services/http-movies.service';

@Component({
  selector: 'app-http-test',
  templateUrl: './http-test.component.html',
  styleUrls: ['./http-test.component.css'],
})
export class HttpTestComponent {
  errorMessage: string;
  showError: boolean = false;
  constructor(private http: HttpMoviesService) {}

  get() {
    this.http.getMovies().subscribe({error: (err: string) => (this.errorMessage = err)});
    this.showErrorForTime(5);
  }

  post() {
    const movie: Movie = {
      country: "POLAND",
      director: "Marek Brodzki",
      category: "Fantasy",
      plot: "Testowy opis wiedźmina.",
      poster: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
      year: "2001",
      title: "Wiedźmin",
      imdbRating: "9.3"
    }
    this.http.postMovie(movie).subscribe({error: (err: string) => (this.errorMessage = err)});
    this.showErrorForTime(5);
  }

  put() {
    const movie: Movie = {
      id: '54',
      country: "POLAND",
      director: "Marek Brodzki",
      category: "Fantasy",
      plot: "Testowy opis wiedźmina.",
      poster: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
      year: "2001",
      title: "Wiedźmin 2",
      imdbRating: "9.4"
    }
    this.http.putMovie(movie).subscribe({error: (err: string) => (this.errorMessage = err)});
    this.showErrorForTime(5);
  }

  patch() {
    const movie: Partial<Movie> = {
      id: '54',
      country: "POLAND",
      director: "Marek Brodzki",
      category: "Fantasy",
      plot: "W tej części wiedźmin jeździ samochodem.",
      poster: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
      year: "2077",
      title: "Wiedźmin 2333",
      imdbRating: "10.0"
    }
    this.http.patchMovie(movie).subscribe({error: (err: string) => (this.errorMessage = err)});
    this.showErrorForTime(5);
  }

  delete() {
    this.http.deleteMovie('54').subscribe({error: (err: string) => (this.errorMessage = err)});
    this.showErrorForTime(5);
  }

  error() {
    this.http.makeError().subscribe({error: (err: string) => (this.errorMessage = err)});
    this.showErrorForTime(5);
  }

  showErrorForTime(seconds: number): void
  {
    if(this.errorMessage != '')
    {
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
      },seconds * 1000)
    }
  }

  headers() {
    this.http.headers().subscribe();
  }

  params() {
    this.http.params().subscribe();
  }
}
