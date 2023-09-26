import { Injectable } from '@angular/core';
import { Passenger } from '../models/passenger.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  passengerData: Passenger[] = [];
  // constructor() { }

  setSharedData(data: Passenger[]) {
    console.log(data);
    this.passengerData = data;
  }
  getSharedData() {
    console.log(this.passengerData);
    return this.passengerData;
  }
}
