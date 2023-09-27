import { Component } from '@angular/core';
import { UserValidationService } from 'src/app/services/user-validation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {

  constructor(private userValidation: UserValidationService) { }

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
    } catch (error) {
      console.error('An error occurred while logging out:', error);
    }
  }
}
