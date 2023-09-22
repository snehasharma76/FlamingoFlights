import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-payment-portal',
  templateUrl: './payment-portal.component.html',
  styleUrls: ['./payment-portal.component.scss']
})
export class PaymentPortalComponent implements OnInit {

  cardDetailsForm!: FormGroup;
  mobileRegex: string = "^[0-9]{16}$";


  constructor(private fb: FormBuilder){ }


  ngOnInit(): void {
    this.cardDetailsForm = this.fb.group({
      cardNumber: [null,[Validators.required, Validators.pattern(this.mobileRegex)]],
      cardExpiryMonth: ['Month', [Validators.required]],
      cardExpiryYear: ['Year', [Validators.required]],
      cardCvv: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      creditDebit:[null, [Validators.required]]
    }) ;

  }


  onSubmit(){
    console.log(this.cardDetailsForm.value);
    
  }







  get f():{[controlName: string]: AbstractControl} {
    return this.cardDetailsForm.controls ;
  }





}
