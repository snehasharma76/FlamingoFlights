import { Injectable } from '@angular/core';
import { Airline } from '../models/airline.model';

@Injectable({
  providedIn: 'root'
})
export class BookFlightService {

  private flightData:Airline = new Airline();
  constructor() { }

  setFlightData(data: Airline) {
    console.log(data);
    this.flightData = data;
  }
  getFlightData() {
    console.log(this.flightData);
    return this.flightData;
  }
}
