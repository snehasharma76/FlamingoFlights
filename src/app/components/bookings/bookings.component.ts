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
  emailID: string = 'rau@gmail.com'
  constructor(private bookingService: BookingService, private details: PassengerDetailsService) {
    try {
      this.bookingService.GetBookedFlights(this.emailID).subscribe({
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
    } catch (error) {
      console.error('Error fetching booked flights:', error);
    }

  }
  isPassengerDetailsOpen: boolean[] = new Array(this.flights.length).fill(false);

  togglePassengerDetails(index: number) {
    this.isPassengerDetailsOpen[index] = !this.isPassengerDetailsOpen[index];
  }
  onRemove(passengerId: number) {
    try {
      this.details.RemovePassenger(passengerId).subscribe({
        next: (res) => {
          console.log("Successfully Deleted")
          alert("Successfully Deleted")
        },
        error: (error) => {
          console.error('Error in removing passenger', error);
        }
      })
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }

  }
}
