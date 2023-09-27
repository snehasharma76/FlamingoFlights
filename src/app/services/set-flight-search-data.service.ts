import { Injectable } from '@angular/core';
import { FlightSearch } from '../models/flightserach.model';

@Injectable({
  providedIn: 'root'
})
export class SetFlightSearchDataService {



  private flightSearchData:FlightSearch = new FlightSearch();

  constructor() { }

  setFlightSearchData(data: FlightSearch) {
    console.log(data);
    this.flightSearchData = data;
  }
  getFlightSearchData() {
    console.log(this.flightSearchData);
    // console.log(this.flightSearchData);
    return this.flightSearchData.NumberOfPassengers;
  }
}
