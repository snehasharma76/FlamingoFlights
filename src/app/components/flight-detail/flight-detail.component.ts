import { Component} from '@angular/core';



@Component({
  selector: 'app-flight-detail',
  templateUrl: './flight-detail.component.html',
  styleUrls: ['./flight-detail.component.scss']
})
export class FlightDetailComponent{
  flightNumber = 'F12345';
  airline = 'Flamingo';
  departure = 'BOM';
  arrival = 'DEL';
  departureTime = '21:00';
  arrivalTime = '23:15';
  }
  

