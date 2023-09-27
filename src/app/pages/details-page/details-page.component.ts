import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Passenger } from 'src/app/models/passenger.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent {
  // passengerDetails: Passenger[] = [];

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
