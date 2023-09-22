import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  passengerData: { firstName: string, lastName: string, dateOfBirth: Date, aadharId: number }[] = [];
  contactData!: { mobileNo: number, emailId: string };
  constructor() { }
}
