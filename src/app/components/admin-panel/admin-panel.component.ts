import { Component, HostListener, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Airline } from 'src/app/models/airline.model';
import { Flights } from 'src/app/models/flights.model';
import { AirlineService } from 'src/app/services/airline.services';
import { dateTimeValidatorArrival, dateTimeValidatorDepart, originDesinationNotSame } from 'src/app/shared/flightDetailValidator';
import Swal from 'sweetalert2';

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
  role:string = "";
  constructor(private airlineService: AirlineService, private fb: FormBuilder, private router:Router) { }

  ngOnInit(): void {
    try {
      this.role != sessionStorage.getItem("Role");
      if(this.role == "User"){
      this.router.navigate(["/home"]);
    }
      // Initialize the flightAddForm with validators
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
        {
          validators: [
            originDesinationNotSame("origin", "destination"),
            dateTimeValidatorDepart("timeOfDeparture"),
          ]
        });
      console.log("OnInit called");
      this.getFlights();
    } catch (error) {
      console.error('Error initializing flightAddForm:', error);
    }
  }

  deleteRow(id: number) {
    try {
      for (let i = 0; i < this.flights.length; i++) {
        if (this.flights[i].flightId == id) {
          this.flights.splice(i, 1);

          // Attempt to delete flight by ID
          this.deleteFlightById(id);
          setTimeout(() => {
            this.getFlights();
          }, 700);
        }
      }
    }
    catch (error) {
      console.error('Error Deleting Row:', error);
    }
  }

  deleteFlightById(id: number) {
    try {
      this.airlineService.deleteFlight(id).subscribe(() => {
        console.log(`Flight With ${id} successfully deleted!!`);
        Swal.fire({
          icon: 'success',
          title: 'Flight Deleted Successfully!!',
          text: '',
        });     
      },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Can not delte this flight',
            text: 'Passengers are onboarded in this flight ',
          });          
          console.error(`Error deleting flight with ID ${id}:`, error);
        });
    } catch (error) {
      console.error(`Error in deleteFlightById:`, error);
    }
  }

  updateFlightById(id: number, flight: Flights) {
    try {
      this.airlineService.updateFlight(id, flight).subscribe(() => {
        alert(`Flight With ${id} successfully Updated!!`);
      },
        (error) => {
          console.error(`Error updating flight with ID ${id}:`, error);
        });
    } catch (error) {
      console.error(`Error in updateFlightById:`, error);
    }
  }

  getFlights() {
    try {
      this.airlineService.getAllFlightsForAdmin().subscribe(value => {
        console.log('konnichiwa');
        this.flights = value;
      },
        error => {
          console.error("Error fetching flight data:", error);
        },
        () => { console.log("Completed Reading") });
    } catch (error) {
      console.error('Error in getFlights:', error);
    }
  }

  addNewFlight(flight: Flights) {
    try {
      this.airlineService.addFlight(flight).subscribe(() => {
        console.log('adding intialized')
        alert("Flight Added Successfully!!");
      },
        (error) => {
          console.error("Error adding new flight:", error);
        },
        () => { console.log("Completed Reading") });
    } catch (error) {
      console.error('Error in addNewFlight:', error);
    }
  }

  onSubmit() {
    try {
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
    } catch (error) {
      console.error('Error in onSubmit:', error);
    }
  }

  updateField(id: number) {
    try {
      for (let i = 0; i < this.flights.length; i++) {
        if (this.flights[i].flightId == id) {
          this.updateFlightById(id, this.flights[i]);
          console.log(this.flights[i]);
          setTimeout(() => {
            this.getFlights();
          }, 500);
        }
      }
    } catch (error) {
      console.error('Error in updateField:', error);
    }
  }

  get f(): { [controlName: string]: AbstractControl } { //getter 
    return this.flightAddForm.controls;
  }
}
