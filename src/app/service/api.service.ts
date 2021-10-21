import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { LikedMovie, Movie } from '../model/Movie';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUri = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient) { }

  /**
   * Gets the list of all movies/films
   * @returns list of all movies/films
   */
  public getFilms(): Observable<LikedMovie[]> {
    return this._http.get(`${this.baseUri}/films`).pipe(
      map((res: LikedMovie[]) => {
        return res || [];
      }),
      catchError(this._errorMgmt)
    );
  }

  /**
   * Fetches the list of liked movies
   * @returns list of liked movies
   */
  public getLikedMovies(): Observable<LikedMovie[]> {
    return this._http.get(`${this.baseUri}/likedMovies`).pipe(
      map((res: LikedMovie[]) => {
        return res || [];
      }),
      catchError(this._errorMgmt)
    );
  }

  /**
   * Likes a movie
   * @param movie the movie we like
   * @returns list of updated liked movies
   */
  public likeMovie(movie: Movie): Observable<LikedMovie[]> {
    return this._http.post(`${this.baseUri}/like/`, movie).pipe(
      map((res: LikedMovie[]) => {
        return res || [];
      }),
      catchError(this._errorMgmt)
    );
  }

  // Error handling
  private _errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
