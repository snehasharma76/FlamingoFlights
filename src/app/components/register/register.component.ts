import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateValidatorContactDetails } from 'src/app/shared/contact-details-date-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  submitted: boolean = false;

  emailRegex: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  passRegex: string = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"

  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstname: [null, [Validators.required,Validators.minLength(3)]],
      lastname: [null, [Validators.required,Validators.minLength(3)]],
      username: [null, [Validators.required,Validators.pattern(this.emailRegex)]],
      dob:[null,DateValidatorContactDetails],
      aadhar: [null, [Validators.required,Validators.minLength(12),Validators.maxLength(12)]],
      password: [null, [Validators.required,Validators.pattern(this.passRegex)]]
    },
      {
        validators: [DateValidatorContactDetails("dob")]
      },

    );

  }
  onSubmit() {
    this.submitted = true;
    console.log(this.registerForm.value);

  }

  get f(): { [controlName: string]: AbstractControl } { //getter

    return this.registerForm.controls;
  }

}