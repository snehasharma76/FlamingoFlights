import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../models/register.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  baseUrl: string = 'https://localhost:44356/api/register'

  constructor(private http: HttpClient) { }

  GetAllRegisteredUser(): Observable<Register[]>{
    return this.http.get<Register[]>(this.baseUrl +'/getall') ;
  }

  MakeRegistration(){
    return this.http.get<Register>(this.baseUrl +'/add') ;
  }
  
}
