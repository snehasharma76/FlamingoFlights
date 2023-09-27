import { Injectable } from '@angular/core';
import { Passenger } from '../models/passenger.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class PassengerDetailsService {

  // contactData!: { mobileNo: number, emailId: string };
  baseUrl: string = "https://localhost:44356/api/passenger-details"
  constructor(private http: HttpClient) { }

  GetPassengerDetails(): Observable<Passenger[]> {
    return this.http.get<Passenger[]>(this.baseUrl + '/all');
  }

  AddPassengerDetails(details: Passenger): Observable<number> {
    // const data = new Passenger();
    // console.log(details);
    // data.pnrNo = details.pnrNo;
    // data.firstName = details.firstName;
    // data.lastName = details.lastName;
    // data.age = details.age;
    // data.aadharNo = details.aadharNo;
    // console.log(data);

    return this.http.post<number>(this.baseUrl + '/add-passenger', details);
  }

  RemovePassenger(passengerId: number): Observable<number> {

    return this.http.delete<number>(this.baseUrl + '/remove/' + passengerId);
  }
  
  //api call for inserting cancelled record
  InsertCancelledFlight(details:Booking):Observable<boolean>{
        return this.http.post<boolean>(this.baseUrl + '/cancellation/addentry', details);
  }

}