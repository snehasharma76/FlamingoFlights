import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../models/register.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  baseUrl: string = 'https://localhost:44356/api/register' ;

  constructor(private http: HttpClient) { }

  GetAllRegisteredUser(): Observable<Register[]>{ // this will get all the registered user
    
    const headers = new HttpHeaders({ // creating header and storing the encrypted credentials 
      'Authorization': `Basic ${sessionStorage.getItem("Base64")}`
    });

    return this.http.get<Register[]>(this.baseUrl +'/getall',{headers}).pipe(catchError(this.handleError)) ; // sending the get request along with the header
  }


  MakeRegistration(register:Register){ // method that will do a registration for new user
    return this.http.post<Register>(this.baseUrl +'/add', register).pipe(catchError(this.handleError)) ; // sending post req along with the registration data 
  }


  
  LogIn( credentials:string){
    
    const headers = new HttpHeaders({ // creating header and storing the encrypted credentials 
      'Authorization': `Basic ${credentials}`
    });

    return this.http.get<string>(this.baseUrl + '/login',{headers}).pipe(catchError(this.handleError)) ; // sending get req along with header    
  }


  private handleError(error: any): Observable<never> {

    return throwError('Error occurred while fetching registered users.');
  }
}
