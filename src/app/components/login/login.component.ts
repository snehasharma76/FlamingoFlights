import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';
import { UserValidationService } from 'src/app/services/user-validation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  registerForm!: FormGroup;
  submitted: boolean = false;
  email!: string;
  password!: string;
  credentials!: string;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router,
    private userValidation: UserValidationService
  ) { }

  ngOnInit(): void {
    try {
      if (this.userValidation.isAuthenticated()) {
        this.router.navigate(["/"]); // Redirect to home if the user is already logged in.
      }

      this.registerForm = this.fb.group({
        username: [null, [Validators.required, Validators.minLength(3)]],
        password: [null, [Validators.required, Validators.minLength(3)]]
      });
    } catch (error) {
      console.error('An error occurred during initialization:', error);
    }
  }

  onSubmit() {
    try {
      this.submitted = true;
      this.email = this.registerForm.value.username;
      this.password = this.registerForm.value.password;
      this.credentials = btoa(`${this.email}:${this.password}`); // Encrypting the credentials in base64.

      this.registerService.LogIn(this.credentials).subscribe({
        next: (response) => {
          sessionStorage.setItem("Role", response); // Adding role to the session.
          sessionStorage.setItem("Base64", this.credentials); // Storing the base64 encrypted credentials.
          sessionStorage.setItem("Email", this.email);
          this.userValidation.login(); // Marking the user as logged in using user validation service.

          this.router.navigate(["/"]); // Navigating to the home page after successful login.
        },
        error: (response) => {
          Swal.fire('Invalid Credentials!', '', 'error'); // Displaying a SweetAlert for invalid credentials.
        },
        complete: () => { }
      });
    } catch (error) {
      console.error('An error occurred during form submission:', error);
    }
  }

  get f(): { [controlName: string]: AbstractControl } {
    try {
      return this.registerForm.controls;
    } catch (error) {
      console.error('An error occurred while retrieving form controls:', error);
      return {}; // Returning an empty object.
    }
  }
}
