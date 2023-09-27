import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Card } from 'src/app/models/card';
import { Register } from 'src/app/models/register.model';
import { CardService } from 'src/app/services/card.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-payment-portal',
  templateUrl: './payment-portal.component.html',
  styleUrls: ['./payment-portal.component.scss']
})
export class PaymentPortalComponent implements OnInit {

  cardDetailsForm!: FormGroup;
  cardRegex: string = "^[0-9]{16}$";
  newUser:Register = {CustomerId: 1, FirstName: 'A', LastName: 'B', Email:'anurag@gmail.com', DateOfBirth: '01/2023', Password:'12222', AadharId:'1111'} ;

  constructor(private fb: FormBuilder, private cardService: CardService){ }

  ngOnInit(): void {
    this.cardDetailsForm = this.fb.group({
      cardNumber: [null,[Validators.required, Validators.pattern(this.cardRegex)]],
      cardExpiryMonth: ['Month', [Validators.required]],
      cardExpiryYear: ['Year', [Validators.required]],
      cardCvv: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      creditDebit:[null, [Validators.required]]
    }) ;

  }


  onSubmit(){
    console.log(this.cardDetailsForm.value); 
    let cardNumber = this.cardDetailsForm.value.cardNumber ;
    let cardCvv = this.cardDetailsForm.value.cardCvv ;
    let cardType = this.cardDetailsForm.value.creditDebit ;
    let cardExpiry = this.cardDetailsForm.value.cardExpiryMonth + '/' + this.cardDetailsForm.value.cardExpiryYear ;

    try {

      this.cardService.ValidateCard(new Card(cardType, cardNumber, cardCvv, cardExpiry)).subscribe({
        next:(res)=>{
          console.log(res);
          
        },
        error:(err) =>{

        },
        complete:() =>{}
      });
      
    } catch (error) {
      console.error(error) ;
    }
    
  }

  get f():{[controlName: string]: AbstractControl} {
    return this.cardDetailsForm.controls ;
  }





}
