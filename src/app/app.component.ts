import { Component } from '@angular/core';
import { LikedMovie, Movie } from './model/Movie';
import { ApiService } from './service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /** The list of all movies */
  public movies: Movie[] = [];

  /** The list of liked movies */
  public likedMovies: LikedMovie[] = [];

  /** The title for the page */
  public title = 'Ghibli Central';

  constructor(private apiService: ApiService) {
    this.getAllMovies();
    this.getLikedMovies();
  }

  /**
   * Gets the list of liked movies from the server
   */
  public getLikedMovies() {
    this.apiService.getLikedMovies()
    .subscribe((likedMovies) => {
      this._updateLikedMovies(likedMovies);
    });
  }

  /**
   * Gets all the movies from server
   */
  public getAllMovies() {
    this.apiService.getFilms()
    .subscribe((movies) => {
      this.movies = movies;
    });
  }

  /**
   * Likes a movie
   * @param movie the movie the user liked
   */
  public likeMovie(movie) {
    this.apiService.likeMovie(movie)
    .subscribe((likedMovies) => {
      this._updateLikedMovies(likedMovies);
    });
  }

  /**
   * Updates the liked movies to show to the user
   * @param likedMovies the list of liked movies
   */
  private _updateLikedMovies(likedMovies: LikedMovie[]) {
    likedMovies.sort((movie1, movie2) => movie2.likeCount - movie1.likeCount);
    this.likedMovies = likedMovies;
  }
}
