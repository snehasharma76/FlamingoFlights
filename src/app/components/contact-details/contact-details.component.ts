import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { DetailsService } from '../../services/details.service';
import { AadharValidation } from '../../shared/aadhar-validator';
import { DateValidatorContactDetails } from '../../shared/contact-details-date-validator';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent {
  numberOfPassengers: number = 1;
  dataFilled: number = 1;
  mobileRegex: string = "^[0-9]{10}$";
  passengerDetails: { firstName: string, lastName: string, dateOfBirth: Date, aadharId: number }[] = []
  contactDetails!: { mobileNo: number, emailId: string };
  passengerForm!: FormGroup;
  infoSentForm!: FormGroup;
  submitted: boolean = false;
  infoSubmitted: boolean = false;
  showForm: boolean = true;
  constructor(private fb: FormBuilder, private detailsService: DetailsService) {
    this.passengerForm = this.fb.group({
      firstName: [null, [Validators.required, Validators.minLength(3)]],
      lastName: [null, [Validators.required, Validators.minLength(3)]],
      dateOfBirth: [null, [Validators.required]],
      aadharId: [null, [Validators.required]]
    },
      { validators: [AadharValidation("aadharId"), DateValidatorContactDetails("dateOfBirth")] });

    this.infoSentForm = this.fb.group({
      mobileNo: [null, [Validators.required, Validators.pattern(this.mobileRegex)]],
      emailId: [null, [Validators.required, Validators.email]]
    })
  }

  ngOnInit() {

  }

  onSubmit() {
    console.log(this.passengerForm)
    if (this.passengerForm.valid) {
      this.submitted = true;
      this.showForm = false;
      this.passengerDetails.push(this.passengerForm.value);
      this.passengerForm.reset();
    }

  }
  OnAddNewPassenger() {
    this.dataFilled++;

    if (this.dataFilled <= this.numberOfPassengers) {
      this.submitted = false;
      this.showForm = true;
    }
    else {
      alert("Data Filled For all Passengers")
    }
  }
  getControl(key: string): AbstractControl {
    return this.passengerForm.controls[key];
  }

  get f(): { [controlName: string]: AbstractControl } {
    return this.passengerForm.controls;
  }
  getControls(key: string): AbstractControl {
    return this.infoSentForm.controls[key];
  }

  get ff(): { [controlName: string]: AbstractControl } {
    return this.infoSentForm.controls;
  }

  get iterableRange(): any {
    return new Array(this.numberOfPassengers);
  }
  onAddDetails() {
    console.log(this.passengerDetails);
    this.infoSubmitted = true;
    this.contactDetails = this.infoSentForm.value;
    this.detailsService.passengerData = this.passengerDetails;
    this.detailsService.contactData = this.contactDetails;
  }
}
