import { Component, OnInit } from '@angular/core';

import { Booking } from '../../models/booking.model';

import { Passenger } from '../../models/passenger.model';

import { BookingService } from '../../services/booking.service';

import { PassengerDetailsService } from '../../services/passenger-details.service';

import Swal from 'sweetalert2';

 

@Component({

  selector: 'app-bookings',

  templateUrl: './bookings.component.html',

  styleUrls: ['./bookings.component.scss']

})

export class BookingsComponent implements OnInit {

  flights: Booking[] = [];

  passengers: Passenger[] = [];

  

 

  constructor(private bookingService: BookingService, private details: PassengerDetailsService) {

    try {

      // Fetch booked flights for the given email ID

      this.bookingService.GetBookedFlights(sessionStorage.getItem("Email")!.toString()).subscribe({

        next: (result) => {

          console.log(result);

          this.flights = result;

          console.log(this.flights);

        },

        error: (err) => {

          console.error('Error fetching booked flights:', err);

        }

      });

 

      // Fetch passenger details

      this.details.GetPassengerDetails().subscribe({

        next: (res) => {

          this.passengers = res;

        },

        error: (err) => {

          console.error('Error fetching passenger details:', err);

        }

      });

    } catch (error) {

      console.error('An unexpected error occurred:', error);

    }

  }

 

  ngOnInit(): void {

  }

 

  isPassengerDetailsOpen: boolean[] = new Array(this.flights.length).fill(false);

 

  togglePassengerDetails(index: number) {

    this.isPassengerDetailsOpen[index] = !this.isPassengerDetailsOpen[index];

  }

  onDeleteFlight(pnrNo: number) {

 

    this.bookingService.RemoveBookedFlight(pnrNo).subscribe({

      next: (res) => {

        console.log("Successfully Deleted");

        // Replace the alert with your desired UI feedback, e.g., a Toastr notification.

        Swal.fire({

          icon: 'success',

          title: 'Success',

          text: 'Passenger deleted successfully!',

        });

      },

      error: (error) => {

        console.error('Error in removing passenger', error);

        Swal.fire({

          icon: 'error',

          title: 'Error',

          text: 'An error occurred while deleting the passenger.',

        });

      }

    })

 

  }

  onRemove(passengerId: number) {

 

    // Remove passenger by ID

    this.details.RemovePassenger(passengerId).subscribe({

      next: (res) => {

        console.log("Successfully Deleted");

        // Replace the alert with your desired UI feedback, e.g., a Toastr notification.

        Swal.fire({

          icon: 'success',

          title: 'Success',

          text: 'Passenger deleted successfully!',

        });

      },

      error: (error) => {

        console.error('Error in removing passenger', error);

        Swal.fire({

          icon: 'error',

          title: 'Error',

          text: 'An error occurred while deleting the passenger.',

        });

      }

    });

 

  }

}

 