import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserValidationService } from 'src/app/services/user-validation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss']
})
export class PaymentPageComponent implements OnInit {
  
  constructor(private user: UserValidationService, private router: Router){

  }
  
  ngOnInit(): void {
  
    if(sessionStorage.getItem("Role")?.toString() == "User"|| sessionStorage.getItem("Role")?.toString() == "Admin"){
      console.log("success")
    }
    else{
      Swal.fire( {icon: 'error',
      title: 'Please Login',
      text: 'Please login before making payment'});

      this.router.navigate(["/login"]);
    }

  }

}
