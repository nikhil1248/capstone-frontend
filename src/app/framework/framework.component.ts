import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-framework',
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.css']
})
export class FrameworkComponent implements OnInit {

  constructor(private router: Router,private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }
  public doLogout(): void {
    this.authenticationService.logout();
    this.router.navigateByUrl('');
  }
  public isLoggedIn(): boolean {
    return this.authenticationService.isAuthenticated();
  }

  public isAdmin():void|boolean{
    if(this.isLoggedIn()){
        if(this.authenticationService.getRole()=="ROLE_ADMIN"){
          return true;
      }
      else{
        return false;
      }
    }
    else{
      return false;
    }
    
  }

  public isManager():void|boolean{
    if(this.isLoggedIn()){
      if(this.authenticationService.getRole()=="ROLE_MANAGER"){
        return true;
      }
      else{
        return false;
      }
    }
    else{
      return false;
    }
    
  }

  public isEmployee():void|boolean{
    if(this.isLoggedIn()){
      if(this.authenticationService.getRole()=="ROLE_EMPLOYEE"){
        return true;
      }
      else{
        return false;
      }
    }
    else{
      return false;
    }
  }
}
