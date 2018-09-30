import { Component, OnInit, Input } from '@angular/core';
import { SearchService } from './../../services/search.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  @Input() oneWay: boolean;
  sourceCity: string = '';
  departureDate: string = '';
  arrivalDate: string = '';
  destinationCity: string ='';
  flightData: any;
  showResults: boolean = false;
  maxPrice: any = 10000;
  constructor( private searchService: SearchService) { }

  ngOnInit() {
    this.searchFlights();
  }

  ngOnChanges() {
    this.showResults = false;
  }

  searchFlights() {
    this.searchService.getSearchResults().subscribe(
      (data) => {
        this.flightData = data['flightData'];
      }
    )
  }
  getSearchResults() {
    this.showResults = true;
  }
}
