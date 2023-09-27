import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../models/register.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  baseUrl: string = 'https://localhost:44356/api/register' ;

  constructor(private http: HttpClient) { }

  GetAllRegisteredUser(): Observable<Register[]>{
    return this.http.get<Register[]>(this.baseUrl +'/getall') ;
  }

  MakeRegistration(register:Register){
    return this.http.post<Register>(this.baseUrl +'/add', register) ;
  }
  
  LogIn( credentials:string){
    
    console.log(credentials);
    
    const headers = new HttpHeaders({ // creating header and storing the encrypted credentials 
      'Authorization': `Basic ${credentials}`
    });


    return this.http.get<string>(this.baseUrl + '/login',{headers}) ; // sending get req along with header
    
  }
}
