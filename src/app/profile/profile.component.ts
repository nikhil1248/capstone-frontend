import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import { AuthenticationService } from '../authentication.service';
import { Employee, address } from '../employee';
import { DomSanitizer } from '@angular/platform-browser';
import { Empupdate } from '../empupdate';
import {ChangePssword} from '../change-pssword';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../_helpers/must-match.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private restaurantService: RestaurantService,private authenticationService: AuthenticationService,private sanitizer: DomSanitizer) { }
  employee: Employee;
  manager:Employee;
  res:string;
  update:boolean=false;
  readonly:boolean=true;
  showPassword:boolean = false;
  passwordForm: FormGroup;
  submitted = false;
  public selectedFile;
  public newemp = {
    name: '',
    email: '',
    password: ''
  };
  
  updateemp:Empupdate=new Empupdate();
  changePassword:ChangePssword=new ChangePssword();
  empaddress:address=new address();
  Swal:any=  require('sweetalert2');


  private getMyProfile():void{

    this.restaurantService.getEmployeebyEmail(this.authenticationService.getCurrentUserEmail()).then((employee:Employee)=>{
    
      this.employee=employee;
      console.log(this.employee);
      }) 
    
    }
    private getManager():void{
      this.restaurantService.getMyManager(this.employee.managerid).then((employee:Employee)=>{
        this.manager=employee;
        console.log(this.manager)
      })
    }

    public onFileChanged(event){
      console.log(event);
      this.selectedFile=event.target.files[0];
      let reader=new FileReader();
      reader.onload = e => this.employee.photo = reader.result;

      reader.readAsDataURL(this.selectedFile);

    }

     getImage(bytevalue):void|any{
      let base64String =bytevalue;
      var url;
      
     if(bytevalue){
      if(bytevalue.startsWith("data:image")){
        url=bytevalue;
      }
      else{
        url = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,'+ base64String);
      }
       
      }
      else{
        url="assets/image.jpg";
      }
      return url;
    }
    

    onUpdate(){
      this.update=true;
      this.readonly=false;
    }

    onSaveChanges(){
      this.update=false;
      this.readonly=true;
      const uploadData=new FormData();
      this.updateemp.emp_id=this.employee.emp_id;
      this.updateemp.firstname=this.employee.firstname;
      this.updateemp.lastname=this.employee.lastname;
      this.updateemp.phonenumber=this.employee.phonenumber;
      this.updateemp.date=this.employee.date;
      this.updateemp.gender=this.employee.gender;
      this.updateemp.email=this.employee.email;
      
      // debugger
      this.empaddress.address_id=this.employee.address_id.address_id;
      this.empaddress.city=this.employee.address_id.city;
      this.empaddress.pincode=this.employee.address_id.pincode;
      this.empaddress.street=this.employee.address_id.street;
      this.updateemp.address_id=this.empaddress;
      if(this.selectedFile==undefined){
        uploadData.append('myFile',this.employee.photo);
      }
      else{
        uploadData.append('myFile',this.selectedFile);
      }
      
      uploadData.append("employee",JSON.stringify(this.updateemp));
      debugger
      this.employee.photo=uploadData;
      this.restaurantService.updateEmployeeProfile(uploadData);
    }

    onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.passwordForm.invalid) {
          return;
      }

     // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.passwordForm.value.currentPassword));
      this.changePassword.emp_id=this.employee.emp_id;
      this.changePassword.currentPassword=this.passwordForm.value.currentPassword;
      this.changePassword.newPassword=this.passwordForm.value.newPassword;
     
     this.restaurantService.changePassword(this.changePassword).then((result:string)=>{
       (result=='true')?Swal.fire({
        icon: 'success',
        title: 'Yeh...Yeh',
        text: 'Password Updated Successfully'
      }):Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Enter Correct Password'
      })
     });
    
  }
  get f() { return this.passwordForm.controls; }
  

  ngOnInit() {
    this.getMyProfile();
   // this.getManager();
    this.passwordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
  }, {
      validator: MustMatch('newPassword', 'confirmPassword')
  });
  }

}
