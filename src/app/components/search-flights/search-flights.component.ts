import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckSeatLimit, dateValidatorDepart, dateValidatorReturn } from 'src/app/shared/flightDetailValidator';

@Component({
  selector: 'app-search-flights-component',
  templateUrl: './search-flights.component.html',
  styleUrls: ['./search-flights.component.scss']
})
export class DetailsComponentComponent implements OnInit {

  registerForm!: FormGroup;
  submitted: boolean = false;

  activeTab: string = 'one-way';

  model = {
    roundTrip: '',
  };

  isDateRequired: boolean = true;

 
  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      origin: [null, [Validators.required,Validators.minLength(3)]],
      destination: [null, [Validators.required,Validators.minLength(3)]],
      departureDate: [null, [Validators.required, dateValidatorDepart]],
      returnDate: [null, [ dateValidatorReturn]],
      passenger: [0, [Validators.required]]
    },
      {
        validators: [CheckSeatLimit("passenger"), dateValidatorDepart("departureDate"), dateValidatorReturn("returnDate", "departureDate")]

      },

    );
  }

  activateTab(tabName: string) {
    this.activeTab = tabName;
    if (this.activeTab == 'round-trip') {
      this.isDateRequired = true;
    } else {
      this.isDateRequired = false;
      this.registerForm.get('returnDate')?.patchValue(null);
    }

    this.cdr.detectChanges();
  }
  
  onSubmit() {
    this.submitted = true;
    console.log(this.registerForm.value);
  }

  get f(): { [controlName: string]: AbstractControl } { //getter 
    return this.registerForm.controls;
  }
}