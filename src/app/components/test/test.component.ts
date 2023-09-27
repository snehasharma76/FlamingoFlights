import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Booking } from 'src/app/models/booking.model';
import { Passenger } from 'src/app/models/passenger.model';
import { BookingService } from 'src/app/services/booking.service';
import { PassengerDetailsService } from '../../services/passenger-details.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  newTrip?: Booking;
  newPassenger?: Passenger
  bookingForm !: FormGroup;
  detailsForm!: FormGroup;
  bookings: Booking[] = [];
  passengersData: Passenger[] = [];

  constructor(private fb: FormBuilder, private bookingService: BookingService, private details: PassengerDetailsService) {
    this.bookingForm = this.fb.group({
      BookingDate: [null, Validators.required],
      FlightId: [null, Validators.required],
      FlightDate: [null, Validators.required],
      NumberOfPassengers: [null, Validators.required],
      RatePerSeat: [null, Validators.required],
      PaymentMode: [null, Validators.required],
      CustomerId: [null, Validators.required]
    })
    this.detailsForm = this.fb.group({
      PnrNo: [null, Validators.required],
      FirstName: [null, Validators.required],
      LastName: [null, Validators.required],
      Age: [null, Validators.required],
      AadharNo: [null, Validators.required],
    })

  }

  ngOnInit() {

  }
  onSubmit() {
    if (this.bookingForm.valid) {
      console.log(this.bookingForm.value)
      this.newTrip = this.bookingForm.value;

      this.bookingService.BookFlight1(this.newTrip!).subscribe({
        next: (res) => console.log(res),
        error: (err) => console.log(err)
      });

    }
  }
  onGetDetails() {
    // this.bookingService.GetBookedFlights().subscribe({
    //   next: (result) => {
    //     console.log(result);
    //     this.bookings = result

    //     console.log(this.bookings);
    //   },
    //   error: (err) => console.log(err)
    // })
  }
  onDelete(pnrNo: number) {
    this.bookingService.RemoveBookedFlight(pnrNo).subscribe({
      next: (res) => {
        console.log("Successfully Deleted")
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onPassengerSubmit() {
    if (this.detailsForm.valid) {
      console.log(this.detailsForm.value)
      this.newPassenger = this.detailsForm.value;
      this.details.AddPassengerDetails(this.newPassenger!).subscribe({
        next: (res) => console.log(res),
        error: (err) => console.log(err)
      });
    }
  }
  onGetPassengers() {
    this.details.GetPassengerDetails().subscribe({
      next: (res) => this.passengersData = res,
      error: (err) => console.log(err)
    })
  }
  onRemove(passengerId: number) {
    this.details.RemovePassenger(passengerId).subscribe({
      next: (res) => {
        console.log("Successfully Deleted")
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
