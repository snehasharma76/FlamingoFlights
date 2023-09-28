import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject, throwError } from 'rxjs';
import { Airline } from '../models/airline.model';
import { Flights } from '../models/flights.model';
import { FlightSearch } from '../models/flightserach.model';

@Injectable({
    providedIn: 'root'
})
export class AirlineService {

    baseUrl: string = 'https://localhost:44356/api/flights'

    private searchedFlights = new BehaviorSubject<Airline[]>([]);

    constructor(private http: HttpClient) { }

    //calling all the api's for admmin
    getAllFlightsForAdmin(): Observable<Airline[]> { //observable -> if we want to read the data stream by stream then we need it
        return this.http.get<Airline[]>(this.baseUrl + '/admin/getflights');
    }

    deleteFlight(flightId: number): Observable<boolean> {
        return this.http.delete<boolean>(this.baseUrl + `/admin/delete/${flightId}`);
    }

    addFlight(flight: Flights): Observable<boolean> {
        return this.http.post<boolean>(this.baseUrl + `/admin/addflight`, flight);
    }

    updateFlight(flightId: number, flight: Flights): Observable<boolean> {

        return this.http.put<boolean>(this.baseUrl + `/admin/updateflight/${flightId}`, flight);
    }

    //For user Search
    searchFlightsForUsers(searchedFlights: FlightSearch): Observable<Airline[]> {
        try {
            return this.http.post<Airline[]>(this.baseUrl + `/user/searchflights`, searchedFlights);
        }
        catch (error) {
            console.error(error);
            return throwError('Error occurred while fetching flight details'); // thorwing error

        }
    }

    setSharedData(data: Airline[]) {
        console.log(data);
        this.searchedFlights.next(data);
    }
    getSharedData(): Observable<Airline[]> {
        // console.log(this.searchedFlights);
        return this.searchedFlights.asObservable();;
    }


}















