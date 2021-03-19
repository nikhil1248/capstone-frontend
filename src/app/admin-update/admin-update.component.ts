import { Component, OnInit,Input } from '@angular/core';
import { Employee } from '../employee';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-admin-update',
  templateUrl: './admin-update.component.html',
  styleUrls: ['./admin-update.component.css']
})
export class AdminUpdateComponent implements OnInit {

  @Input()
  employee:Employee;
  @Input()
  showform:any;
  

  public formError: string;
  public formAdded:string;
  

  private formIsValid(): boolean { 
    if (this.employee.roles[0].role_name) {
      return true;
    } else {
      return false;
    }
  }
   

 // public showform=true;
  public updateEmployeedetails(): void {
    this.formError = ''; 
    this.formAdded='';
    console.log(this.employee); 
    if (this.formIsValid()) { 
        this.restaurantService.updateAdminEmployeeRole(this.employee.emp_id,this.employee.roles[0].role_id);
        this.formAdded="Updated Successfully"
    } else { 
        this.formError = 'All fields required, please try again'; 
    }
  }
  oncancel():void{
    this.showform=false;
  }

  constructor(private restaurantService: RestaurantService) { 
  }

  ngOnInit() {
    this.showform=true
  }

}
