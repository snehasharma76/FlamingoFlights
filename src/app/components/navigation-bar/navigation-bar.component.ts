import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserValidationService } from 'src/app/services/user-validation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {

  constructor(private userValidation: UserValidationService, private router:Router) { }

  collapsed = true;

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  checkIfLoggedIn() {
    try {
      return this.userValidation.isAuthenticated();
    } catch (error) {
      console.error('An error occurred while checking if logged in:', error);
      return false;
    }
  }

  logout() {
    try {
      this.userValidation.logout();
      Swal.fire('Logged Out', 'You have been successfully logged out!', 'success');
      sessionStorage.clear();
      this.router.navigate(["/home"]);
    } catch (error) {
      console.error('An error occurred while logging out:', error);
    }
  }

  routeBooks(){
    try{
      if(sessionStorage.getItem("Role") == "Admin"){
        this.router.navigate(["/admin"]);
        return;
      }
      this.router.navigate(["/bookings"]);
    }
    catch(error){
      console.error('An error occurred while logging out:', error);

    }
  }

  taketoabout(){
    this.router.navigate(["/about"]);

  }
}
