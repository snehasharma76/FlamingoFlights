import { Injectable } from '@angular/core';
import { Passenger } from '../models/passenger.model';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class PassengerDetailsService {

  // contactData!: { mobileNo: number, emailId: string };
  baseUrl: string = "https://localhost:44356/api/passenger-details"
  constructor(private http: HttpClient) { }

  GetPassengerDetails(): Observable<Passenger[]> {
    try {
      return this.http.get<Passenger[]>(this.baseUrl + '/all');
    } catch (error) {
      console.error(error);
      return throwError('Error occured while fetching passenger details')
    }
  }

  AddPassengerDetails(details: Passenger): Observable<number> {
    try {
      return this.http.post<number>(this.baseUrl + '/add-passenger', details);
    } catch (error) {
      return throwError('Error occured while adding passenger details')
    }

  }

  RemovePassenger(passengerId: number): Observable<number> {
    try {
      return this.http.delete<number>(this.baseUrl + '/remove/' + passengerId);
    } catch (error) {
      return throwError('Error occured while removing passenger details')
    }

  }

  //api call for inserting cancelled record
  InsertCancelledFlight(details: Booking): Observable<boolean> {
    try {
      return this.http.post<boolean>(this.baseUrl + '/cancellation/addentry', details);
    } catch (error) {
      return throwError('Error occured while inserting canceled flight data')
    }

  }

}