import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { AadharValidation } from '../../shared/aadhar-validator';
import { DateValidatorContactDetails } from '../../shared/contact-details-date-validator';
import { Passenger } from '../../models/passenger.model';
import { DataService } from "../../services/data.service"
import Swal from 'sweetalert2';
@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent {
  numberOfPassengers: number = 1;
  dataFilled: number = 0;
  // isFilled: boolean = false;
  passengerDetails: Passenger[] = [];
  passengerForm!: FormGroup;

  submitted: boolean = false;

  showForm: boolean = true;
  constructor(private fb: FormBuilder, private detailsService: DataService) {
    try {
      this.passengerForm = this.fb.group({
        firstName: [null, [Validators.required, Validators.minLength(3)]],
        lastName: [null, [Validators.required, Validators.minLength(3)]],
        age: [null, [Validators.required]],
        aadharNo: [null, [Validators.required]]
      },
        { validators: [AadharValidation("aadharNo"), DateValidatorContactDetails("age")] });
    } catch (error) {
      console.error('Error in creating PassengerForm:', error)
    }

  }

  ngOnInit() {
  }

  onSubmit() {
    // console.log(this.passengerForm)
    try {
      if (this.passengerForm.invalid) {
        return;
      }
      this.dataFilled++;
      this.submitted = true;
      this.showForm = false;
      this.passengerDetails.push(this.passengerForm.value);
      this.passengerForm.reset();
      console.log(this.passengerDetails)
      if (this.dataFilled == this.numberOfPassengers) {
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

    }
    else if (this.dataFilled >= this.numberOfPassengers) {
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
