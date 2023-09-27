import { Component, OnInit } from '@angular/core';
import { UserValidationService } from 'src/app/services/user-validation.service';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss']
})
export class PaymentPageComponent implements OnInit {
  
  constructor(private user: UserValidationService){}
  
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    // this.user.logout() ;
  }

}
