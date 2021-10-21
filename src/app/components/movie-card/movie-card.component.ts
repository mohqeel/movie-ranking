import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {
    @Input()
    public title = '';

    @Input()
    public id = '';

    @Input()
    public imageUrl = '';

    @Input()
    public likes = 0;

    @Output()
    public likeMovieEmitter = new EventEmitter<string>();

    public likeMovie() {
        this.likeMovieEmitter.next(this.id);
    }
}
