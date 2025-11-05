import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-grid',
  templateUrl: './movie-grid.component.html'
})
export class MovieGridComponent {
  @Input() title = '';
  @Input() movies: Movie[] = [];

  selectedMovie: Movie | null = null;
  isVerificationOpen = false;

  handleVerifyAge(movie: Movie) {
    this.selectedMovie = movie;
    this.isVerificationOpen = true;
    console.log('Opening verification for:', movie.title);
  }

  handleCloseVerification() {
    this.isVerificationOpen = false;
    this.selectedMovie = null;
  }
}
