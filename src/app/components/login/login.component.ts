import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  registerForm!: FormGroup;
  submitted: boolean = false;
  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
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
    console.log(this.registerForm.value);
  }

  get f(): { [controlName: string]: AbstractControl } { //getter

    return this.registerForm.controls;
  }

}