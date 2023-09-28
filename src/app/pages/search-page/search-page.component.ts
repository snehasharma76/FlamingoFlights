import { Component, OnInit } from '@angular/core';
import { UserValidationService } from 'src/app/services/user-validation.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit{

  constructor(private user: UserValidationService){

  }

  ngOnInit(): void {
    // console.log("search loaded");
    // console.log(this.user.isUserActivated);
    // this.user.login() ;
    // console.log(this.user.isUserActivated);
  }

}
