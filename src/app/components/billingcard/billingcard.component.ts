import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-billingcard',
  templateUrl: './billingcard.component.html',
  styleUrls: ['./billingcard.component.scss']
})
export class BillingcardComponent implements OnInit {

  billingForm!: FormGroup;
  submitted: boolean = false;
  isBillFilled: boolean = false;

  constructor(private fb: FormBuilder, private detailsService: DataService) { }

  ngOnInit(): void {
    try {
      // Initialize the billingForm with validators
      
      this.billingForm = this.fb.group({
        pincode: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
        billingaddress: [null, [Validators.required, Validators.minLength(15)]],
        city: [null, [Validators.required, Validators.minLength(3)]],
        state: [null, [Validators.required, Validators.minLength(3)]],
      });
    } catch (error) {
      console.error('Error in initializing billingForm', error);
    }
  }

  onSubmit() {
    try {
      this.submitted = true;
      console.log(this.billingForm.value);
      this.detailsService.setBillAddInfo(true);
    } catch (error) {
      console.error('Error in onSubmit:', error);
    }
  }

  get f(): { [controlName: string]: AbstractControl } { //getter
    return this.billingForm.controls;
  }
}
