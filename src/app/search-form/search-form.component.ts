import { Component, OnInit, Input } from '@angular/core';
import { SearchService } from '../services/search.service';


@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  @Input() isOneWay: boolean;
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


  getAllFlights(){
    this.searchService.getSearchResults().subscribe(     
      (data) => {
        this.allFlights = data;
      }
    );
    ;
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
          /* filter outgoing flights */
    this.filterFlights(true,this.sourceCity,this.destinationCity,this.departureDate,this.maxPrice);
    if (!this.isOneWay) {
      /* filter incoming flights */
      this.filterFlights(false,this.destinationCity,this.sourceCity,this.arrivalDate,this.maxPrice);
      
    }
    this.showResults = true;

   
  }

  resetResults() {
    document.getElementById('source-alert').style.display = '';
    document.getElementById('dest-alert').style.display = '';
    this.showResults = false;
  }
 
  filterFlights(isOutgoing: boolean, source: string, dest: string, doa: string, priceLimit: number) {
    if (isOutgoing) {
      this.flightData.outgoing = this.allFlights['flightData'].filter(
        item => {
          if(doa) {
            return item['origin']===(source.toLowerCase()) && 
            item['destination']===(dest.toLowerCase()) && 
            parseInt(item['price'])<=priceLimit && item['date']===doa;
          }
          else return item['origin']===(source.toLowerCase()) && 
          item['destination']===(dest.toLowerCase()) && 
          parseInt(item['price'])<=priceLimit;
  
          });
    } else {
      this.flightData.incoming = this.allFlights['flightData'].filter(
        item => {
          if(doa) {
            return item['origin']===(source.toLowerCase()) && 
            item['destination']===(dest.toLowerCase()) && 
            parseInt(item['price'])<=priceLimit && item['date']===doa;
          }
          else return item['origin']===(source.toLowerCase()) && 
          item['destination']===(dest.toLowerCase()) && 
          parseInt(item['price'])<=priceLimit;
  
          });
    }

  }

}
