import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import { ActivatedRoute, Router,ParamMap } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Employee } from '../employee';
import { switchMap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  constructor(private restaurantService: RestaurantService,
    private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService,private sanitizer: DomSanitizer) {
    //console.log(this.movies);
  }

  employee: Employee;
  public redirect = false;
  update = false;

   getImage(bytevalue):void|any{
    let base64String =bytevalue;
    var url;
    if(bytevalue){
      url = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,'+ base64String);
    }
    else{
      url="assets/image.jpg";
    }
    return url;
  }

  showUpdate(): void {
    if(this.authenticationService.getRole()=="ROLE_ADMIN")
    {
      this.update = true;
    }
    
  }

  public back(): void {
    this.router.navigate(['GetEmployees']);
  }

  public popoverTitle: string = "Delete Confirmation";
  public popoverMessage: string = "Are you sure to delete";
  public cancelCliked: boolean = false;
  public deleteEmployee(id): void {
    if(this.authenticationService.getRole()=="ROLE_ADMIN"){
      this.restaurantService.deleteEmployee(id)
      .then((m: string) => {
        this.redirect = true;
        //Window.location.href = '/index.html';
        this.router.navigate(['GetEmployees']);
        console.log("Movie deleted successfully", m);
      }
      )
    }    
  };

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          let id = params.get('employeeId');
          return this.restaurantService.getSingleEmployee(id);
        })
      )
      .subscribe((newEmployee: Employee) => {
        console.log(newEmployee);
        this.employee = newEmployee;
      });

  }

}
