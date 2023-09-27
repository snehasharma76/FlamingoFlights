import { Injectable } from '@angular/core';
import { Passenger } from '../models/passenger.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private passengerData: Observable<Passenger[]> = this.dataSubject.asObservable();
  private isFilled: boolean = false;
  private isBillFilled: boolean = false;
  // constructor() { }

  setSharedData(data: Passenger[]) {
    console.log(data);
    this.dataSubject.next(data);
  }
  getSharedData() {
    console.log(this.passengerData);
    return this.passengerData;
  }
  setBillAddInfo(data: boolean) {
    this.isBillFilled = data;
  }
  getBillAddInfo() {
    return this.isBillFilled;
  }
  setInfo(data: boolean) {
    this.isFilled = data;
  }
  getInfo() {
    return this.isFilled;
  }
}
