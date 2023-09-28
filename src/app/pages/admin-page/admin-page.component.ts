import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit{

  constructor(private router:Router){}
  ngOnInit(): void {
    if(sessionStorage.getItem("Role")?.toString() == "User"){
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Sorry but you do not have access to that',
      });
          this.router.navigate(["/home"]);
    }
  }
   
}
