import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Airline } from 'src/app/models/airline.model';
import { FlightSearch } from 'src/app/models/flightserach.model';
import { AirlineService } from 'src/app/services/airline-services';
import { CheckSeatLimit, dateValidatorDepart, dateValidatorReturn, originDesinationNotSame } from 'src/app/shared/flightDetailValidator';

@Component({
  selector: 'app-search-flights-component',
  templateUrl: './search-flights.component.html',
  styleUrls: ['./search-flights.component.scss']
})
export class DetailsComponentComponent implements OnInit {

  registerForm!: FormGroup;
  submitted: boolean = false;

  activeTab: string = 'one-way';

  model = {
    roundTrip: '',
  };

  isDateRequired: boolean = true;

  flights: Airline[] = [];
  searchFlights:FlightSearch = new FlightSearch();

 
  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef, private airlineService: AirlineService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      origin: [null, [Validators.required,Validators.minLength(3)]],
      destination: [null, [Validators.required,Validators.minLength(3)]],
      departureDate: [null, [Validators.required]],
      returnDate: [null, [ dateValidatorReturn]],
      passenger: [1, [Validators.required]]
    },
      {
        validators: [CheckSeatLimit("passenger"), dateValidatorDepart("departureDate"), dateValidatorReturn("returnDate", "departureDate"),
        originDesinationNotSame("origin","destination")] 
      },
    );
  }
  searchFlightsByDataProvided(searchedFlights:FlightSearch){
    this.airlineService.searchFlightsForUsers(searchedFlights).subscribe(value => {
      console.log('konnichiwa');
      this.flights = value;
      console.log(value);
    },
      error => {
        console.log("error occured while fetching data")
      },
      () => { console.log("Completed Reading") });
  }

  activateTab(tabName: string) {
    this.activeTab = tabName;
    if (this.activeTab == 'round-trip') {
      this.isDateRequired = true;
    } else {
      this.isDateRequired = false;
      this.registerForm.get('returnDate')?.patchValue(null);
    }

    this.cdr.detectChanges();
  }
  
  onSubmit() {
    this.submitted = true;
    console.log(this.registerForm.value);
    this.searchFlights.Origin = this.registerForm.controls["origin"].value;
    this.searchFlights.Destination = this.registerForm.controls["destination"].value;
    this.searchFlights.TimeOfDeparture = this.registerForm.controls["departureDate"].value;
    this.searchFlights.NumberOfPassengers = this.registerForm.controls["passenger"].value;
    

    this.searchFlightsByDataProvided(this.searchFlights);

  }

  get f(): { [controlName: string]: AbstractControl } { //getter 
    return this.registerForm.controls;
  }
}