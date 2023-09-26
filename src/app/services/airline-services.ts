import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Airline } from '../models/airline';

@Injectable({
    providedIn: 'root'
})

export class AirlineService {

    constructor(private http: HttpClient) {
    }

    getAllAirlines(): Observable<Airline[]> { //observable -> if we want to read the data stream by stream then we need it
        return this.http.get<Airline[]>("assets/dataSource/airlines.json");
    }
}















