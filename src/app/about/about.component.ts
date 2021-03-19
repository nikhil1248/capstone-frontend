import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import { AuthenticationService } from '../authentication.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private restaurantService: RestaurantService,private authenticationService: AuthenticationService) { }
  employee:Employee;
  manager:Employee;
  private getMyProfile():void{

    this.restaurantService.getEmployeebyEmail(this.authenticationService.getCurrentUserEmail()).then((employee:Employee)=>{
      this.employee=employee;
      this.getManager();
      }) 
    
    }
    private getManager():void{
      this.restaurantService.getMyManager(this.employee.managerid).then((employee:Employee)=>{
        this.manager=employee;
      })
    }

  ngOnInit() {
    this.getMyProfile();
  }

}
