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
  email!:string ;
  password!:string ;
  credentials!:string;


  constructor(private fb: FormBuilder, private registerService: RegisterService, private router:Router, private userValidation:UserValidationService) { }

  ngOnInit(): void {

    if(this.userValidation.isAuthenticated()){
      this.router.navigate(["/"]) ; // if user is already loggedIn then will be redirected to home
    }

    this.registerForm = this.fb.group({
      username: [null, [Validators.required,Validators.minLength(3)]],
      password: [null, [Validators.required,Validators.minLength(3)]]
    },
      {
        validators: []
      },

    );

  }
  onSubmit() {
    this.submitted = true;
    this.email = this.registerForm.value.username ;
    this.password = this.registerForm.value.password ;
    this.credentials = btoa(`${this.email}:${this.password}`); // encrypting the credentials in base64 

    this.registerService.LogIn(this.credentials).subscribe({ // sen
      next:(response)=>{
        sessionStorage.setItem("Role",response) ; // adding role in session
        sessionStorage.setItem("Base64",this.credentials) ; // storing the base64 encrypted credentials
        this.userValidation.login(); // marking login in user validation service
        
        this.router.navigate(["/"]) ; // when after success navigating to home

      },
      error:(response)=>{
        Swal.fire('Invalid Credentials!');
             
      },
      complete:()=>{

      }
    })
    


  }

  get f(): { [controlName: string]: AbstractControl } { //getter

    return this.registerForm.controls;
  }

}