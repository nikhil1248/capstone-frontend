import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { Employee } from '../employee';
import { RestaurantService } from '../restaurant.service';
import { CreateEmployee } from '../create-employee';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NormalEmployees } from '../normal-employees';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent implements OnInit {
  registerForm:FormGroup;
  roles = [];
  managers:NormalEmployees[];
  submitted = false;
  showManagers=false;
  Swal:any=  require('sweetalert2');
  noManager=false;
  public employee:CreateEmployee={
    firstname: '',
    lastname: '',
    email: '',
    password:'',
    gender: '',
    date: '',
    phonenumber:null,
    photo:'',
    address_id:{
      address_id:'',
      street: '',
    city: '',
    pincode:''
    },
    roles: [{
      role_id:'',
      role_name:''

    }],
    managerid:''
  };

  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute, private router: Router,private restaurantService:RestaurantService) { 
    this.getAllManagers();
  }

  getRoles() {
    return [
      { id: '2', name: 'Manager' },
      { id: '3', name: 'Employee' }
    ];
  }

  onRegister() {
    this.submitted = true;
    if(this.registerForm.value.roles==2){
      this.registerForm.value.manager="1"
    }
    console.log(this.registerForm.value)
    console.log(this.registerForm.invalid)
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value));
    this.employee.firstname=this.registerForm.value.firstName;
    this.employee.lastname=this.registerForm.value.lastName;
    this.employee.phonenumber=this.registerForm.value.phoneNumber;
    this.employee.email=this.registerForm.value.email;
    this.employee.roles[0].role_id=this.registerForm.value.roles;
    
    if(this.employee.roles[0].role_id=='2'){
    this.employee.roles[0].role_name='MANAGER';
    //this.employee.manager=
    }
    else if(this.employee.roles[0].role_id=='3'){
      this.employee.roles[0].role_name='EMPLOYEE'
    }

    this.employee.password=this.registerForm.value.email;
    console.log(this.registerForm.value.manager);
    this.employee.managerid=this.registerForm.value.manager;
    this.restaurantService.addEmployeebyAdmin(this.employee)
    .then((emp:Employee)=>{
      console.log(emp);
      if(emp.emp_id!="0"){
        this.router.navigate(['employee',emp.emp_id]);
      }else{
        this.Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Email already exists'
        })
      }
      
    })
    console.log(this.employee);
   
  
}
getAllManagers() {
  this.restaurantService.getAllManagers().then((emp:NormalEmployees[])=>{
    this.managers=emp.map(m=>m);
    console.log(this.managers);
  })
  return this.managers
}

onChange(role_id) {
  console.log(role_id);
  if(role_id==3){
    console.log(this.managers)
    this.showManagers=true
  }
  else this.showManagers=false
}


get f() { return this.registerForm.controls; }

  ngOnInit() {
  
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required,Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      roles: [''],
      manager:['']
    });

    of(this.getRoles()).subscribe(roles => {
      this.roles = roles;
      this.registerForm.controls.roles.patchValue(this.roles[0].id);
    });
    
  }
 

}
