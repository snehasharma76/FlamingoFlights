import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Airline } from 'src/app/models/airline';
import { AirlineService } from 'src/app/services/airline-services';
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

   airlines:Airline[] = [];

  flightAddForm!: FormGroup;
  submitted: boolean = false;


  constructor(private airlineService:AirlineService, private fb:FormBuilder)
  {

  }

  deleteRow(id: number) {
    for (let i = 0; i < this.airlines.length; i++) {
      if (this.airlines[i].flightId == id) {
        this.airlines.splice(i, 1);
      }
    }
  }

  totalPrice: number = 0
  
  quantityChanged(item: any) {
    this.airlines.forEach((p) => {
      if (p.flightId === item.id) {
        p.totalNumberOfSeats = item.quantity;
        return
      }
    })
  }
  onSubmit() {
    this.submitted = true;
    console.log(this.flightAddForm.value);
  }

  ngOnInit():void{
  
    this.flightAddForm = this.fb.group({
      origin: [null, [Validators.required,Validators.minLength(3)]],
      destination: [null, [Validators.required,Validators.minLength(3)]],
      timeOfDeparture: [null, [Validators.required]],
      timeOfArrival : [null, [Validators.required]],
      kmsTravel: [0],
    },
      {
        validators: []

      },

    );

    

    console.log("OnInit called");
    //this.productService = new ProductService(); //not needed as we don't wanna create objects here
    this.airlineService.getAllAirlines().subscribe(value=>
    {
      this.airlines = value;},
      error=>{ 
           console.log("error occured while fetching data")
      },
      ()=>{console.log("Product Completed Reading")}); 
  }

  get f(): { [controlName: string]: AbstractControl } { //getter 
    return this.flightAddForm.controls;
  }
}
