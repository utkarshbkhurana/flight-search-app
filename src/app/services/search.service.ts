import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  dataUrl = "../assets/flights.json";

  constructor(
    private http: HttpClient
  ) { }

  getSearchResults() {
    return this.http.get(this.dataUrl);
  }
}
