import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  @Input('flight') flight;

  constructor() { }

  ngOnInit() {
    if(!this.flight.roundTrip) {
      this.flight.departureDate = new Date(this.flight.departureDate).toLocaleTimeString();
      this.flight.arrivalDate = new Date(this.flight.arrivalDate).toLocaleTimeString();
    }
    else {
      this.flight.departureDate1 = new Date(this.flight.departureDate1).toLocaleTimeString();
      this.flight.arrivalDate1 = new Date(this.flight.arrivalDate1).toLocaleTimeString();
      this.flight.departureDate2 = new Date(this.flight.departureDate2).toLocaleTimeString();
      this.flight.arrivalDate2 = new Date(this.flight.arrivalDate2).toLocaleTimeString();
    }
  }

}
