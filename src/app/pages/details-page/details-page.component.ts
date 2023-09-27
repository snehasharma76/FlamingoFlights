// import { Compone/nt } from '@angular/core';
import { Router } from '@angular/router';
import { Passenger } from 'src/app/models/passenger.model';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { UserValidationService } from 'src/app/services/user-validation.service';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit{
  constructor(private user:UserValidationService,private detailsService: DataService, private router: Router){}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    console.log( this.user.isUserActivated ) ;
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
