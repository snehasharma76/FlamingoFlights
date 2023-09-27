import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { AadharValidation } from '../../shared/aadhar-validator';
import { DateValidatorContactDetails } from '../../shared/contact-details-date-validator';
import { Passenger } from '../../models/passenger.model';
import { DataService } from "../../services/data.service";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { BookFlightService } from 'src/app/services/book-flight.service';
import { SetFlightSearchDataService } from 'src/app/services/set-flight-search-data.service';
import { FlightSearch } from 'src/app/models/flightserach.model';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent {
  numberOfPassengers: number = 1;
  dataFilled: number = 0;
  passengerDetails: Passenger[] = [];
  passengerForm!: FormGroup;
  flightSearched!: FlightSearch;
  submitted: boolean = false;
  showForm: boolean = true;

  constructor(
    private fb: FormBuilder,
    private detailsService: DataService,
    private router: Router,
    private flightBookServices: BookFlightService,
    private getSearchedFligthDetails: SetFlightSearchDataService
  ) {
    try {
      // Initialize passengerForm with validators
      this.passengerForm = this.fb.group({
        firstName: [null, [Validators.required, Validators.minLength(3)]],
        lastName: [null, [Validators.required, Validators.minLength(3)]],
        age: [null, [Validators.required]],
        aadharNo: [null, [Validators.required]]
      },
        { validators: [AadharValidation("aadharNo"), DateValidatorContactDetails("age")] });
    } catch (error) {
      console.error('Error in creating PassengerForm:', error);
    }
  }

  ngOnInit() {
    // Get the number of passengers from the flight search data
    this.numberOfPassengers = Number(this.getSearchedFligthDetails.getFlightSearchData());
  }

  onSubmit() {
    try {
      if (this.passengerForm.invalid) {
        return;
      }
      // Increment dataFilled and add passenger data to passengerDetails array
      this.dataFilled++;
      this.submitted = true;
      this.showForm = false;
      this.passengerDetails.push(this.passengerForm.value);
      this.passengerForm.reset();
      console.log(this.passengerDetails)
      if (this.dataFilled == this.numberOfPassengers) {
        // Set shared passenger data and info flag
        this.detailsService.setSharedData(this.passengerDetails);
        this.detailsService.setInfo(true);
      }
    } catch (error) {
      console.error('Error in onSubmit:', error);
    }
  }

  OnAddNewPassenger() {
    if (this.dataFilled < this.numberOfPassengers) {
      this.submitted = false;
      this.showForm = true;
    } else if (this.dataFilled >= this.numberOfPassengers) {
      // Display an info SweetAlert popup
      Swal.fire({
        icon: 'info',
        title: 'Data Filled',
        text: 'Data Filled For all Passengers',
      });
    }
  }

  getControl(key: string): AbstractControl {
    return this.passengerForm.controls[key];
  }

  get f(): { [controlName: string]: AbstractControl } {
    return this.passengerForm.controls;
  }

  get iterableRange(): any {
    return new Array(this.numberOfPassengers);
  }
}
