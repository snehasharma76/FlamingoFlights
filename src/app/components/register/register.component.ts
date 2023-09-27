import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from 'src/app/models/register.model';
import { RegisterService } from 'src/app/services/register.service';
import { UserValidationService } from 'src/app/services/user-validation.service';
import { DateValidatorContactDetails } from 'src/app/shared/contact-details-date-validator';
import Swal from 'sweetalert2';

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

  constructor(private fb: FormBuilder, private registerService: RegisterService, private router: Router, private userValidation: UserValidationService) { }


  ngOnInit(): void {

    if (this.userValidation.isAuthenticated()) {
      this.router.navigate(["/"]); // if user is loggedIn then will be redirected to home
    }

    this.registerForm = this.fb.group({
      firstname: [null, [Validators.required, Validators.minLength(3)]],
      lastname: [null, [Validators.required, Validators.minLength(3)]],
      username: [null, [Validators.required, Validators.pattern(this.emailRegex)]],
      dob: [null, DateValidatorContactDetails],
      aadhar: [null, [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
      password: [null, [Validators.required, Validators.pattern(this.passRegex)]]
    },
      {
        validators: [DateValidatorContactDetails("dob")]
      },

    );

  }

  credentials!: string;


  onSubmit() {

    try {
      this.submitted = true;
      let firstname = this.registerForm.value.firstname;
      let lastname = this.registerForm.value.lastname;
      let email = this.registerForm.value.username;
      let dob = this.registerForm.value.dob;
      let aadhar = this.registerForm.value.aadhar;
      let password = this.registerForm.value.password;

      this.registerService.MakeRegistration(new Register(firstname, lastname, email, dob, aadhar, password)).subscribe({
        next: (response) => {
          console.log(response);
          this.credentials = btoa(`${email}:${password}`); // encrypting the credentials in base64 

          // after registration doing login
          this.registerService.LogIn(this.credentials).subscribe({
            next: (response) => {
              sessionStorage.setItem("Role", response); // adding role in session
              sessionStorage.setItem("Base64", this.credentials); // storing the base64 encrypted credentials
              this.userValidation.login(); // marking login in user validation service

              this.router.navigate(["/"]); // when after success navigating to home

            },
            error: (response) => {
              Swal.fire('Invalid Credentials!');

            },
            complete: () => { }
          })
        },
        error: (err) => {
          console.log(err);

        },
        complete: () => { }
      });

    }
    catch (error) {
      console.error(error);
    }


  }




  get f(): { [controlName: string]: AbstractControl } {
    try {
      return this.registerForm.controls;
    } catch (error) {
      console.error('An error occurred:', error);
      return {}; // Returning an empty object.
    }
  }

}