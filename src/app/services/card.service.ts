import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Card } from '../models/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  baseUrl: string = 'https://localhost:44356/api/cards' ;
  constructor(private http: HttpClient) { }

  ValidateCard(card:Card): Observable<boolean>{ // this will get all the registered user
    
    const headers = new HttpHeaders({ // creating header and storing the encrypted credentials 
      'Authorization': `Basic ${sessionStorage.getItem("Base64")}`
    });

    return this.http.post<boolean>(this.baseUrl +'/cardcheck',card, {headers}).pipe(catchError(this.handleError)) ; // sending the get request along with the header
  }
  
  // .pipe(catchError(this.handleError)) 

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error); // printing the error
    return throwError('Error occurred while fetching card details'); // thorwing error
  }
}
