import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-one-way-flight',
  templateUrl: './one-way-flight.component.html',
  styleUrls: ['./one-way-flight.component.css']
})
export class OneWayFlightComponent implements OnInit {

  isOneWay = true;  
  constructor() { }

  ngOnInit() {
  }

}
