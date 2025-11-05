import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html'
})
export class MovieCardComponent {
  @Input() movie!: Movie;
  @Output() verifyAge = new EventEmitter<Movie>();

  isHovered = false;

  onVerifyClick(e: Event) {
    e.stopPropagation();
    this.verifyAge.emit(this.movie);
  }

  onWatchClick(e: Event) {
    e.stopPropagation();
    console.log('Watch clicked for', this.movie.title);
  }
}
