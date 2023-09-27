import { Component } from '@angular/core';
import { UserValidationService } from 'src/app/services/user-validation.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {

constructor(private userValidation:UserValidationService){}

  collapsed = true;
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
  checkIfLoggedIn()
  {
      return this.userValidation.isAuthenticated();
  } 
}

