import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserValidationService {

  isUserActivated:boolean  = false;

  login(){
    this.isUserActivated = true ;
    sessionStorage.setItem("isUserValidated","true") ;
  }

  logout(){
    this.isUserActivated = false ;
    sessionStorage.setItem("isUserValidated","false") ;

  }

  isAuthenticated() : boolean{
    if(sessionStorage.getItem("isUserValidated") != null && sessionStorage.getItem("isUserValidated") === "true"){
      this.isUserActivated = true ;
    }
    else{
      this.isUserActivated = false ;
    }
    return this.isUserActivated ;
  }
}
