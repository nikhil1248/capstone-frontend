import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import { Employee } from '../employee';
import { NormalEmployees } from '../normal-employees';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Schedule } from '../schedule';


@Component({
  selector: 'app-schedule-employee',
  templateUrl: './schedule-employee.component.html',
  styleUrls: ['./schedule-employee.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleEmployeeComponent implements OnInit {
  Swal:any=  require('sweetalert2');
  scheduleForm:FormGroup;
  public dateTime: string="";
  public enddateTime: string="";
  constructor(private restaurantService: RestaurantService,private formBuilder: FormBuilder) { }
  userSelectsString = '';
  name = 'Angular';
  userSelects = [];
  employee:NormalEmployees[];
  schedule:Schedule={
    emp_id:'',
    schedule_start:'',
    schedule_end:''
  };
  show: boolean = false;

  private getEmployees(): void{
    this.restaurantService.getAllNormalEmployees().then((employees:NormalEmployees[])=>{
      this.employee=employees.map(m=>{
        return m;
      })
      
      console.log(employees);
    })
  }

  onSchedule(){
  //  console.log(+" "+this.enddateTime+" "+this.userSelects)
    if(this.dateTime && this.enddateTime && this.userSelects.length>0){
     
      for (var i=0;i<this.userSelects.length;i++){
       console.log(this.userSelects[i]); 
       this.schedule.emp_id=this.userSelects[i].emp_id;
       this.schedule.schedule_start=this.dateTime.toString().substring(0,24);
       this.schedule.schedule_end=this.enddateTime.toString().substring(0,24);
       //console.log(this.schedule);
       this.restaurantService.addSchedule(this.schedule);
     } 
      this.Swal.fire({
        icon: 'success',
        title: 'Schedule',
        text: 'Added Successfully'
      })
    }

    else{
      this.Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Enter valid inputs'
      })
    }
  }

  suggest() {
    this.show = true;
  }

  isSelected(s:any) {
   return this.userSelects.findIndex((item) => item.emp_id === s.emp_id) > -1 ? true : false;
  }

  selectSuggestion(s) {
    this.userSelects.find((item) => item.emp_id === s.emp_id) ? 
    this.userSelects = this.userSelects.filter((item) => item.emp_id !== s.emp_id) :
    this.userSelects.push(s);
    this.show=false
    console.log(this.userSelects)
  }

  deleteSelects(s) {
    this.userSelects = this.userSelects.filter((item) => item.emp_id !== s.emp_id);
  }

  assignToNgModel() {
    this.userSelectsString = '';
    this.userSelects.map((item) => this.userSelectsString += item.firstname + ' ');
  }

  ngOnInit() {
    this.getEmployees();

  }
  

}
