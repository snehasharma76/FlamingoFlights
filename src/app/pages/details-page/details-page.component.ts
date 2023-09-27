<<<<<<< HEAD
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Passenger } from 'src/app/models/passenger.model';
import { DataService } from 'src/app/services/data.service';
=======
import { Component, OnInit } from '@angular/core';
import { UserValidationService } from 'src/app/services/user-validation.service';
>>>>>>> e3c547c0ce17c5dc2f3af658a43caca09f3c361e

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
<<<<<<< HEAD
export class DetailsPageComponent {
  // passengerDetails: Passenger[] = [];
=======
export class DetailsPageComponent implements OnInit{
  constructor(private user:UserValidationService){}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    console.log( this.user.isUserActivated ) ;
  }
>>>>>>> e3c547c0ce17c5dc2f3af658a43caca09f3c361e

  constructor(private detailsService: DataService, private router: Router) {

  }
  onClick() {
    // this.detailsService.getSharedData().subscribe((data) => {
    //   this.passengerDetails = data;
    // });
    if (this.detailsService.getInfo() && this.detailsService.getBillAddInfo())
      this.router.navigate(["/payment"]);
    else
      alert("Please fill all the data fields")
  }
}
