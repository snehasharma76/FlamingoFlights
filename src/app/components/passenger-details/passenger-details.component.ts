import { Component } from '@angular/core';
import { DetailsService } from '../../services/details.service';

@Component({
  selector: 'app-passenger-details',
  templateUrl: './passenger-details.component.html',
  styleUrls: ['./passenger-details.component.scss']
})
export class PassengerDetailsComponent {
  passengerDetails: { firstName: string, lastName: string, dateOfBirth: Date, aadharId: number }[] = [];
  contactDetails!: { mobileNo: number, emailId: string };

  constructor(private detailsService: DetailsService) {

  }
  recieveData() {  //change to ngOnInit when routing is added
    console.log(this.detailsService.passengerData);
    this.passengerDetails = this.detailsService.passengerData;
    this.contactDetails = this.detailsService.contactData;
  }
  calculateAge(dateOfBirth: Date): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }
}
