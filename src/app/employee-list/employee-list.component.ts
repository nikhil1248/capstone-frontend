import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { RestaurantService } from '../restaurant.service';
import { AuthenticationService } from '../authentication.service';
import {DomSanitizer} from '@angular/platform-browser'; 

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employee: Employee[]
  selectedEmployee: Employee
  message:String
  url:any
  bytes:any
  uints:any
  base64:any
  

  constructor(private restaurantService: RestaurantService,private authenticationService: AuthenticationService,private sanitizer: DomSanitizer) { }

 
  private getEmployees(): void{
    this.restaurantService.getAllEmployees().then((employees:Employee[])=>{
      this.message=employees.length>0?'':'No Employees Found';
      this.employee=employees.map(m=>{    
        return m;
      })
      console.log(this.employee);
     
    })
  }
  private str2ab(str) {
    var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i=0, strLen=str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }

   getImage(bytevalue):void|any{
    
    // var bytes = bytevalue; // get from server
    // var uints = new Uint8Array([bytes]);
    // const STRING_CHAR = String.fromCharCode.apply(null, uints);
    let base64String =bytevalue;
    var url;
    if(bytevalue){
      url = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,'+ base64String);
    }
    else{
      url="assets/image.jpg";
    }
    console.log(url);
    return url;
  }


  private showError(error: any): void { 
    this.message = error.message; 
  };

  ngOnInit() {
    this.getEmployees();
  }

}
