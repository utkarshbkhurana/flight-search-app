import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private router: Router
  ){}

  title = 'flight-search-app';
  showResults = false;
  flightData = {};

  displaySearchResults($event) {
    console.log('event',$event)
    this.showResults = true;
    this.flightData = $event.searchResults;
  }

}
