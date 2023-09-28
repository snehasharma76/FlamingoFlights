import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
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
      const headers = new HttpHeaders({ // creating header and storing the encrypted credentials 
        'Authorization': `Basic ${sessionStorage.getItem("Base64")}`
      });

      console.log(sessionStorage.getItem("Base64"));
      

      return this.http.post<number>(this.baseUrl + '/addbooking', details, { headers }).pipe(catchError(this.handleError));
    } catch (error) {
      console.error(error);
      return throwError('Error occurred while booking flights'); // thorwing error

    }
  }

  GetCustomerId(email: string): Observable<number> {

    try {
      return this.http.get<number>(this.baseUrl + `/getId`, { params: { "email": email } });
    }catch(error){
      return throwError('Error occurred while getting te details of the customer')
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

  private handleError(error: any): Observable<never> {

    return throwError('Error occurred while fetching registered users.');
  }
} 
