import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Passenger } from '../../models/passenger.model';

@Component({
  selector: 'app-passenger-details',
  templateUrl: './passenger-details.component.html',
  styleUrls: ['./passenger-details.component.scss']
})
export class PassengerDetailsComponent {
  passengerDetails: Passenger[] = [];
  emailId: string = "raukum74@gmail.com";

  constructor(private detailsService: DataService) {
  }

  ngOnInit() {
    this.detailsService.getSharedData().subscribe((data) => {
      console.log(data);
      this.passengerDetails = data;
    });
    console.log(this.passengerDetails);

  }

}
