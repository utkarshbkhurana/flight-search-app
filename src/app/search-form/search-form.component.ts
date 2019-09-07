import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchService } from '../services/search.service';


@Component({
  selector: 'search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  isOneWay = true;
  @Output() onFlightSearch = new EventEmitter();
  sourceCity: string = '';
  departureDate: string = '';
  returnDate: string = '';
  destinationCity: string = '';
  allFlights: any;
  flightData = {
    'flights': [],
    'roundTrip': false,
    'origin': '',
    'destination': '',
    'returnDate': '',
    'departureDate': ''
  };
  showResults: boolean = false;
  maxPrice: any = 10000;
  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.getAllFlights();
  }


  async getAllFlights() {
    let data = await this.searchService.getSearchResults().toPromise();
    if (data) {
      this.allFlights = data;
    }
    else {
      console.log('Failed to get flights');
    }
  }

  getSearchResults() {
    this.resetResults();
    if (!this.validateForm())
      return;
    this.getAllFlights();
    console.log('got flights', this.allFlights)
    this.flightData.origin = this.sourceCity;
    this.flightData.destination = this.destinationCity;
    this.flightData.departureDate = this.departureDate;
    if (this.isOneWay) {
      this.getOneWayFlights(this.destinationCity, this.sourceCity, this.departureDate, this.maxPrice);
    }
    else {
      this.flightData.roundTrip = true;
      this.flightData.returnDate = this.returnDate;
      this.getRoundTrips(this.destinationCity, this.sourceCity, this.departureDate, this.returnDate, this.maxPrice)
    }

    this.showResults = true;
    this.onFlightSearch.emit({ searchResults: this.flightData });
  }

  resetResults() {
    document.getElementById('source-alert').style.display = '';
    document.getElementById('dest-alert').style.display = '';
    document.getElementById('depart-alert').style.display = '';
    document.getElementById('return-alert').style.display = '';
    this.showResults = false;
    this.flightData.flights = []
  }

  getOneWayFlights(source: string, dest: string, departureDate: string, priceLimit: number) {
    this.flightData.flights = this.allFlights.flights.filter(
      flight => {
        return (flight.origin.toLowerCase()) === (source.toLowerCase()) &&
          (flight.destination.toLowerCase()) === (dest.toLowerCase()) &&
          parseInt(flight.price) <= priceLimit && this.compareDates(departureDate, flight.departureDate);
      });
  }

  getRoundTrips(source: string, dest: string, departureDate: string, returnDate: string, priceLimit: number) {
    let forwardFlights = this.allFlights.flights.filter(
      flight => {
        return (flight.origin.toLowerCase()) === (source.toLowerCase()) &&
          (flight.destination.toLowerCase()) === (dest.toLowerCase()) &&
          parseInt(flight.price) <= priceLimit && this.compareDates(departureDate, flight.departureDate);
      });
    let returnFlights = this.allFlights.flights.filter(
      flight => {
        return (flight.origin.toLowerCase()) === (dest.toLowerCase()) &&
          (flight.destination.toLowerCase()) === (source.toLowerCase()) &&
          parseInt(flight.price) <= priceLimit && this.compareDates(returnDate, flight.departureDate);
      });
    for (let forwardFlight of forwardFlights) {
      for (let returnFlight of returnFlights) {
        let price = parseInt(forwardFlight.price) + parseInt(returnFlight.price);
        if (price <= priceLimit)
          this.flightData.flights.push({
            "roundTrip": true,
            "flightNo1": forwardFlight.flightNo,
            "flightNo2": returnFlight.flightNo,
            "origin": forwardFlight.origin,
            "destination": forwardFlight.destination,
            "departureDate1": forwardFlight.departureDate,
            "arrivalDate1": forwardFlight.arrivalDate,
            "departureDate2": returnFlight.departureDate,
            "arrivalDate2": returnFlight.arrivalDate,
            "price": parseInt(forwardFlight.price) + parseInt(returnFlight.price)
          })
      }
    }
  }

  validateForm() {
    if (this.sourceCity === '') {
      document.getElementById('source-alert').style.display = 'block';
      return false;
    }
    if (this.destinationCity === '') {
      document.getElementById('dest-alert').style.display = 'block';
      return false;
    }
    if (this.departureDate === '') {
      document.getElementById('depart-alert').style.display = 'block';
      return false;
    }
    if (this.returnDate === '' && !this.isOneWay) {
      document.getElementById('return-alert').style.display = 'block';
      return false;
    }
    return true;
  }

  compareDates(a, b) {
    return new Date(a).toDateString() === new Date(b).toDateString();
  }

  toggleOneWay(oneWay) {
    this.isOneWay = oneWay;
    if (oneWay) {
      document.getElementById('one-way').classList.add('active');
      document.getElementById('round-trip').classList.remove('active');
    }
    else {
      document.getElementById('one-way').classList.remove('active');
      document.getElementById('round-trip').classList.add('active');
    }
  }
}
