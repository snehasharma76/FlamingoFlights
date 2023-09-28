import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Passenger } from '../../models/passenger.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-passenger-details',
  templateUrl: './passenger-details.component.html',
  styleUrls: ['./passenger-details.component.scss']
})
export class PassengerDetailsComponent {
  passengerDetails: Passenger[] = [];
  emailId: string = sessionStorage.getItem("Email") !== null ? sessionStorage.getItem("Email")! : "";

  constructor(private detailsService: DataService) {
  }

  ngOnInit() {
    try {
      this.detailsService.getSharedData().subscribe((data) => {
        console.log(data);
        this.passengerDetails = data;
        // Swal.fire({
        //   icon: 'success',
        //   title: 'Data Loaded Successfully',
        //   text: 'Passenger details loaded successfully!',
        // });
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while loading data!',
      });
    }
  }
}
