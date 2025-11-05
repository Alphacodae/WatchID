import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  handleWatchTrailer() { console.log('Watch trailer clicked (Angular)'); }
  handleMoreInfo() { console.log('More info clicked (Angular)'); }
}
