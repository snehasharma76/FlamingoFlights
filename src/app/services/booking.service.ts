import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Booking } from '../models/booking.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  baseUrl: string = "https://localhost:44356/api/booking"
  constructor(private http: HttpClient) { }

  GetBookedFlights(email: string): Observable<Booking[]> {
    console.log(email);
    return this.http.get<Booking[]>(this.baseUrl + `/bookedflights`, { params: { "emailId": email } });
  }
  BookFlight1(details: Booking): Observable<number> {
    try {
      return this.http.post<number>(this.baseUrl + '/addbooking', details);
    } catch (error) {
      console.error(error);
      return throwError('Error occurred while booking flights'); // thorwing error

    }
  }
  RemoveBookedFlight(pnrNo: number): Observable<number> {
    try {
      return this.http.delete<number>(this.baseUrl + '/remove/' + pnrNo);
    } catch (error) {
      console.error(error);
      return throwError('Error occurred while removing booked flight'); // thorwing error
    }
  }
} 
