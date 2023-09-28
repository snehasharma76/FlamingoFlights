import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Airline } from 'src/app/models/airline.model';
import { Booking } from 'src/app/models/booking.model';
import { Card } from 'src/app/models/card';
import { Register } from 'src/app/models/register.model';
import { BookFlightService } from 'src/app/services/book-flight.service';
import { BookingService } from 'src/app/services/booking.service';
import { CardService } from 'src/app/services/card.service';
import { RegisterService } from 'src/app/services/register.service';
import { SetFlightSearchDataService } from 'src/app/services/set-flight-search-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment-portal',
  templateUrl: './payment-portal.component.html',
  styleUrls: ['./payment-portal.component.scss']
})
export class PaymentPortalComponent implements OnInit {

  cardDetailsForm!: FormGroup;
  data!: Airline;
  cardRegex: string = "^[0-9]{16}$";
  id:number=14;
  date:string="2023-09-28"

  newUser: Register = { CustomerId: 1, FirstName: 'A', LastName: 'B', Email: 'anurag@gmail.com', DateOfBirth: '01/2023', Password: '12222', AadharId: '1111' };

  constructor(private fb: FormBuilder, private cardService: CardService, private router:Router,
    private getSearchedFligthDetails: SetFlightSearchDataService,
    private flightService: BookFlightService,
    private bookingService: BookingService) { }

  ngOnInit(): void {
        
    this.cardDetailsForm = this.fb.group({
      cardNumber: [null, [Validators.required, Validators.pattern(this.cardRegex)]],
      cardExpiryMonth: ['Month', [Validators.required]],
      cardExpiryYear: ['Year', [Validators.required]],
      cardCvv: [null, [Validators.required, Validators.minLength(3)]],
      creditDebit: [null, [Validators.required]]
    });
    this.data =this.flightService.getFlightData();
  }

  cardNumber!:string ;
  cardCvv!:number ;
  cardType!:string ;
  cardExpiry!:string ;


  onSubmit() {
    
    console.log(this.cardDetailsForm.value);
     this.cardNumber = this.cardDetailsForm.value.cardNumber;
     this.cardCvv = this.cardDetailsForm.value.cardCvv;
     this.cardType = this.cardDetailsForm.value.creditDebit;
     this.cardExpiry = this.cardDetailsForm.value.cardExpiryMonth + '/' + this.cardDetailsForm.value.cardExpiryYear;

    this.cardService.ValidateCard(new Card(this.cardType, this.cardNumber, this.cardCvv, this.cardExpiry)).subscribe({
      next: (res) => {
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: 'Validation Successful',
          text: 'Card validation was successful!',
        });


        console.log(this.cardType);
        
        // this.FlightDetails.paymentMode = this.cardType;
        // // console.log(this.FlightDetails.paymentMode);

        // this.FlightDetails.flightDate = this.data.timeOfDeparture;

        // this.FlightDetails.flightId = this.data.flightId;

        // this.FlightDetails.ratePerSeat = this.data.startingFarePerSeat;

        // this.FlightDetails.bookingDate = Date.now().toString();

        // this.FlightDetails.numberOfPassengers = Number(this.getSearchedFligthDetails.getFlightSearchData());

        // this.FlightDetails.customerId = Number(this.bookingService.GetCustomerId(this.email!));
       

        console.log(this.data);
        // console.log(new Booking(Date.now().toString(), this.data.flightId, this.data.timeOfDeparture, Number(this.getSearchedFligthDetails.getFlightSearchData()), this.data.startingFarePerSeat,this.cardType,Number(this.bookingService.GetCustomerId(sessionStorage.getItem("Email")!)) ));
       
        // this.bookingService.GetCustomerId(sessionStorage.getItem("Email")!).subscribe({
        //   next:(res)=>{
        //     this.id=res;
        //   }
   
        // }); 
        console.log(this.id);
        
        this.bookingService.BookFlight1(new Booking(this.date, this.data.flightId, this.data.timeOfDeparture, Number(this.getSearchedFligthDetails.getFlightSearchData()), this.data.startingFarePerSeat,this.cardType,this.id )).subscribe({
          next:(res) =>{console.log("Added")},
          error:(err) => {console.log(err)},
          complete:()=>{console.log()}
        });

      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Validation Error',
          text: 'An error occurred while validating the card!',
        });
      },
      complete: () => { }
    });

  }

  get f(): { [controlName: string]: AbstractControl } {
    return this.cardDetailsForm.controls;
  }
}
