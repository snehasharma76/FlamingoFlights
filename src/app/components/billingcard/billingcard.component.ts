import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-billingcard',
  templateUrl: './billingcard.component.html',
  styleUrls: ['./billingcard.component.scss']
})
export class BillingcardComponent  implements OnInit {

 

  registerForm!: FormGroup;

  submitted: boolean = false;

 

 

 constructor(private fb:FormBuilder){}

 

  ngOnInit(): void {

     this.registerForm = this.fb.group({

      pincode:[null,[Validators.required, Validators.minLength(6)]],
      billingaddress:[null,[Validators.required, Validators.minLength(15)]],
      city:[null,[Validators.required, Validators.minLength(3)]],
      state:[null,[Validators.required, Validators.minLength(3)]],
     },

     );

  }

 

  onSubmit() {

    this.submitted = true;

    console.log(this.registerForm);

    // console.log(this.getControl('firstName'));

    console.log(this.f['firstName']);

  }

 

 

  get f(): { [controlName: string]: AbstractControl } { //getter

    return this.registerForm.controls;

  }
}
 
