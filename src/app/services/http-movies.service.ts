import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class HttpMoviesService {

  private url = 'http://localhost:3000/movies';

  constructor(private http: HttpClient) {
    
   }

   getMovies(): Observable<Movie[]> {
     return this.http.get<Movie[]>(this.url).pipe(tap(console.log ));
   }
  // getMovies(): Observable<HttpResponse<Movie[]>> {
  //   return this.http
  //     .get<HttpResponse<Movie[]>>(this.url ,{observe: 'response'})
  //     .pipe(tap(console.log ));
  // }

  postMovie(movie: Movie): Observable<Movie> {
    return this.http
      .post(this.url, movie).pipe(tap(console.log), catchError(this.handleError));
  }

  putMovie(movie: Movie): Observable<Movie> {
    return this.http
    .put(this.url+'/'+movie.id, movie)
    .pipe(tap(console.log), catchError(this.handleError));
  }

  patchMovie(movie: Partial<Movie>): Observable<Movie> {
    return this.http
    .patch(this.url+'/'+movie.id, movie)
    .pipe(tap(console.log), catchError(this.handleError));
  }

  deleteMovie(id: string): Observable<{}> {
    return this.http.delete<{}>(this.url + '/' + id)
    .pipe(tap(console.log), catchError(this.handleError));
  }

  makeError(): Observable<HttpErrorResponse> {
    return this.http
    .delete(this.url + '/' + 999)
    .pipe(tap(console.log), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error(
      `Name: ${error.name} \n`+
      `Message: ${error.message} \n`+
      `Status code: ${error.status} \n`
    );
    return throwError('Something bad happend; please try again later.');
  }

  headers(): Observable<HttpResponse<Movie[]>> {

    const headers = new HttpHeaders( {
      Authorizations: 'my_token',
      'Content-Type': 'application/json',
      'X-Custom-Header': 'ucze_sie_angulara'
    })

    return this.http
      .get<Movie[]>(this.url,{observe: 'response', headers: headers})
      .pipe(
        tap((res:HttpResponse<Movie[]>) => {
          console.log(res.headers.keys())
        })
      )
  }

  params(): Observable<Movie> {
    const myParams = new HttpParams()
      .set('_sort','title')
      .set('_order','desc');

    return this.http
      .get<Movie[]>(this.url, { params: myParams})
      .pipe(tap(console.log));
  }
}
