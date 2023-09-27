import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  baseUrl: string = "https://localhost:44356/api/booking"
  constructor(private http: HttpClient) { }

  GetBookedFlights(email:string): Observable<Booking[]> {
    console.log(email);
    return this.http.get<Booking[]>(this.baseUrl + `/bookedflights`,{params:{"emailId":email}});
  }
  BookFlight1(details: Booking): Observable<number> {
    return this.http.post<number>(this.baseUrl + '/addbooking', details);
  }
  RemoveBookedFlight(pnrNo: number): Observable<number> {
    return this.http.delete<number>(this.baseUrl + '/remove/' + pnrNo);
  }
} 
