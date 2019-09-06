import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchService } from '../services/search.service';


@Component({
  selector: 'search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  @Input() isOneWay: boolean;
  @Output() onFlightSearch = new EventEmitter();
  sourceCity: string = '';
  departureDate: string = '';
  arrivalDate: string = '';
  destinationCity: string ='';
  allFlights: any;
  flightData = {
    'outgoing' : '',
    'incoming' : ''
  };
  showResults: boolean = false;
  maxPrice: any = 10000;
  constructor( private searchService: SearchService) { }

  ngOnInit() {
    this.getAllFlights();
  }


  async getAllFlights(){
    let data = await this.searchService.getSearchResults().toPromise();
    if(data) {
      this.allFlights = data;
    }
    else {
      console.log('Failed to get flights');
    }
  }

  getSearchResults() {
    this.resetResults();
    if(this.sourceCity === '') {
      document.getElementById('source-alert').style.display = 'block';
      return;
    }
    if(this.destinationCity === '') {
      document.getElementById('dest-alert').style.display = 'block';
      return;
    }
    this.getAllFlights();
    console.log('got flights',this.allFlights)
          /* filter outgoing flights */
    this.filterFlights(true,this.sourceCity,this.destinationCity,this.departureDate,this.maxPrice);
    if (!this.isOneWay) {
      /* filter incoming flights */
      this.filterFlights(false,this.destinationCity,this.sourceCity,this.arrivalDate,this.maxPrice);
      
    }
    this.showResults = true;
    this.onFlightSearch.emit({searchResults: this.flightData});
  }

  resetResults() {
    document.getElementById('source-alert').style.display = '';
    document.getElementById('dest-alert').style.display = '';
    this.showResults = false;
  }
 
  filterFlights(isOutgoing: boolean, source: string, dest: string, doa: string, priceLimit: number) {
    console.log(doa)
    if (isOutgoing) {
      this.flightData.outgoing = this.allFlights['flights'].filter(
        item => {
          if (doa && doa !== '') {
            console.log('is doa',doa==='')
            return item['origin'] === (source.toLowerCase()) &&
              item['destination'] === (dest.toLowerCase()) &&
              parseInt(item['price']) <= priceLimit && item['date'] === doa;
          }
          else return item['origin'] === (source.toLowerCase()) &&
            item['destination'] === (dest.toLowerCase()) &&
            parseInt(item['price']) <= priceLimit;

        });
    } else {
      console.log('is doa',doa==='')
      this.flightData.incoming = this.allFlights['flights'].filter(
        item => {
          if (doa && doa !== '') {
            return item['origin'] === (source.toLowerCase()) &&
              item['destination'] === (dest.toLowerCase()) &&
              parseInt(item['price']) <= priceLimit && item['date'] === doa;
          }
          else return true //return item['origin'] === (source.toLowerCase()) &&
            item['destination'] === (dest.toLowerCase()) &&
            parseInt(item['price']) <= priceLimit;

        });
    }
  }

}
