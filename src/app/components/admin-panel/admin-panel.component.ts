import { Component, HostListener, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Airline } from 'src/app/models/airline.model';
import { Flights } from 'src/app/models/flights.model';
import { AirlineService } from 'src/app/services/airline-services';
import { dateTimeValidatorArrival, dateTimeValidatorDepart, originDesinationNotSame } from 'src/app/shared/flightDetailValidator';
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  flights: Airline[] = [];
  flight: Flights = new Flights();

  
  flightAddForm!: FormGroup;
  submitted: boolean = false;

  constructor(private airlineService: AirlineService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.flightAddForm = this.fb.group({
      origin: [null, [Validators.required, Validators.minLength(3)]],
      destination: [null, [Validators.required, Validators.minLength(3)]],
      timeOfDeparture: [null, [Validators.required]],
      timeOfArrival: [null, [Validators.required]],
      kmsTravel: [0],
      startingFarePerSeat: [0, [Validators.required]],
      totalNumberOfSeats: [0, [Validators.required]],
      seatsBooked: [0],
      daysOfFlight: [null, [Validators.required]],
      breakFlight: ['N']
    },
      { validators: [originDesinationNotSame("origin", "destination"), 
      dateTimeValidatorDepart("timeOfDeparture"), 
    ]},
    );
    console.log("OnInit called");
    this.getFlights();
  }
  
  deleteRow(id: number) {
    for (let i = 0; i < this.flights.length; i++) {
      if (this.flights[i].flightId == id) {
        this.flights.splice(i, 1);

        this.deleteFlightById(id);
        setTimeout(() => {
          this.getFlights();
        }, 700);
      }
    }
  }

  deleteFlightById(id: number) {
    this.airlineService.deleteFlight(id).subscribe(() => {
      console.log(`Flight With ${id} successfully deleted!!`);
    },
      (error) => {
        console.log(`Some Error Occured`, error);
      })
  }

  updateFlightById(id: number, flight: Flights) {
    this.airlineService.updateFlight(id, flight).subscribe(() => {
      alert(`Flight With ${id} successfully Updated!!`);
    },
      (error) => {
        console.log(`Some Error Occured`, error);
      })
  }

  getFlights() {
    this.airlineService.getAllFlightsForAdmin().subscribe(value => {
      console.log('konnichiwa');
      this.flights = value;
    },
      error => {
        console.log("error occured while fetching data")
      },
      () => { console.log("Completed Reading") });
  }

  addNewFlight(flight: Flights) {

    this.airlineService.addFlight(flight).subscribe(() => {
      console.log('adding intialized')
      alert("Flight Added Successfully!!")
    },
      error => {
        console.log("error occured while fetching data")
      },
      () => { console.log("Completed Reading") });
  }

  onSubmit() {
    this.flight.origin = this.flightAddForm.controls["origin"].value;
    this.flight.destination = this.flightAddForm.controls["destination"].value;
    this.flight.timeOfDeparture = this.flightAddForm.controls["timeOfDeparture"].value;
    this.flight.timeOfArrival = this.flightAddForm.controls["timeOfArrival"].value;
    this.flight.kmsTravel = this.flightAddForm.controls["kmsTravel"].value;
    this.flight.startingFarePerSeat = this.flightAddForm.controls["startingFarePerSeat"].value;
    this.flight.totalNumberOfSeats = this.flightAddForm.controls["totalNumberOfSeats"].value;
    this.flight.seatsBooked = this.flightAddForm.controls["seatsBooked"].value;
    this.flight.breakFlight = this.flightAddForm.controls["breakFlight"].value;
    this.flight.daysOfFlight = this.flightAddForm.controls["daysOfFlight"].value;

    console.log(this.flight);

    this.addNewFlight(this.flight);

    setTimeout(() => {
      this.getFlights();
    }, 500);

    this.flightAddForm.reset();
  }

  updateField(id: number) {
    for (let i = 0; i < this.flights.length; i++) {
      if (this.flights[i].flightId == id) {
        this.updateFlightById(id, this.flights[i]);
        console.log(this.flights[i]);
        setTimeout(() => {
          this.getFlights();
        }, 500);
      }
    }
    // console.log(this.flightAddForm.controls);
  }
  // @HostListener('window:beforeunload', ['$event'])
  // unloadNotification($event: any): void {
  //   // This code will run when the page is about to be unloaded (e.g., before a refresh)
  //   console.log('Page is about to be reloaded!');
  //   $event.returnValue = true; // This line is used to display a confirmation dialog (deprecated in some browsers)
  //   //this.getFlights();
  // }

  get f(): { [controlName: string]: AbstractControl } { //getter 
    return this.flightAddForm.controls;
  }
}
