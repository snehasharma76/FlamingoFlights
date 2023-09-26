import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Airline } from '../models/airline.model';
import { Flights } from '../models/flights.model';
import { FlightSearch } from '../models/flightserach.model';

@Injectable({
    providedIn: 'root'
})
export class AirlineService {

    baseUrl: string = 'https://localhost:44356/flights'

    constructor(private http: HttpClient) { }

    //calling all the api's for admmin
    getAllFlightsForAdmin(): Observable<Airline[]> { //observable -> if we want to read the data stream by stream then we need it
        return this.http.get<Airline[]>(this.baseUrl + '/admin/getflights');
    }

    deleteFlight(flightId:number): Observable<boolean>{
        return this.http.delete<boolean>(this.baseUrl + `/admin/delete/${flightId}`); 
    }

    addFlight(flight:Flights):Observable<boolean>{
        return this.http.post<boolean>(this.baseUrl + `/admin/addflight`, flight);
    }

    updateFlight(flightId:number, flight:Flights):Observable<boolean>{
        
        return this.http.put<boolean>(this.baseUrl + `/admin/updateflight/${flightId}`, flight); 
    }


    searchFlightsForUsers(searchedFlights:FlightSearch):Observable<Airline[]>{
        return this.http.post<Airline[]>(this.baseUrl + `/user/searchflights`, searchedFlights);
    }

}















