import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  apiUrl="https://api.myjson.com/bins/14lgdc";

  constructor(
    private http: HttpClient
  ) { }

  getSearchResults() {
    return this.http.get(this.apiUrl);
  }
}
