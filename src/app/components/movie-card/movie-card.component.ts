import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {
    /** Movie Title */
    @Input()
    public title = '';

    /** id of the movie */
    @Input()
    public id = '';

    /** image url of movie poster */
    @Input()
    public imageUrl = '';

    /** number of likes */
    @Input()
    public likes = 0;

    /** release date */
    @Input()
    public releaseDate = 0;

    /** Event emitter for when user likes this movie */
    @Output()
    public likeMovieEmitter = new EventEmitter<string>();

    /**
     * Event emitter function when user likes movie
     */
    public likeMovie() {
        this.likeMovieEmitter.next(this.id);
    }
}
