import { Component } from '@angular/core';
import { Booking } from '../../models/booking.model';
import { Passenger } from '../../models/passenger.model';
import { BookingService } from '../../services/booking.service';
import { PassengerDetailsService } from '../../services/passenger-details.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent {
  flights: Booking[] = [];
  passengers: Passenger[] = [];
  constructor(private bookingService: BookingService, private details: PassengerDetailsService) {
    this.bookingService.GetBookedFlights().subscribe({
      next: (result) => {
        console.log(result);
        this.flights = result

        console.log(this.flights);
      },
      error: (err) => console.log(err)
    })
    this.details.GetPassengerDetails().subscribe({
      next: (res) => this.passengers = res,
      error: (err) => console.log(err)
    })
  }
  isPassengerDetailsOpen: boolean[] = new Array(this.flights.length).fill(false);

  togglePassengerDetails(index: number) {
    this.isPassengerDetailsOpen[index] = !this.isPassengerDetailsOpen[index];
  }
  onRemove(passengerId: number) {
    this.details.RemovePassenger(passengerId).subscribe({
      next: (res) => {
        console.log("Successfully Deleted")
        alert("Successfully Deleted")
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
