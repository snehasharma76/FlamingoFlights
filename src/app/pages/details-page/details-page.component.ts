import { Component, OnInit } from '@angular/core';
import { UserValidationService } from 'src/app/services/user-validation.service';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit{
  constructor(private user:UserValidationService){}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    console.log( this.user.isUserActivated ) ;
  }

}
