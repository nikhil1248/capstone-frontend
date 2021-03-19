import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery';
import * as moment from 'moment';
import 'fullcalendar';
import { Schedule } from '../schedule';
import { RestaurantService } from '../restaurant.service';
import { AuthenticationService } from '../authentication.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-viewschedule',
  templateUrl: './viewschedule.component.html',
  styleUrls: ['./viewschedule.component.css']
})
export class ViewscheduleComponent implements OnInit {

   @Input()
  set configurations(config: any) {
     if(config) {
        this.defaultConfigurations = config;  
     }
  }
 event=[];
 schedule:Schedule[];
 employee:Employee



defaultConfigurations: any;

  constructor(private restaurantService: RestaurantService,private auth: AuthenticationService) { 
    
     this.getMyProfile();
     
      console.log(this.event +" in constructor")         
  }

ngOnInit() {
}
  private  getMyProfile(){
     
   this.restaurantService.getEmployeebyEmail(this.auth.getCurrentUserEmail()).then((employee:Employee)=>{
      this.employee=employee
     this.getSchedulebyEmpID();
     }) 
   }


   private getSchedulebyEmpID(){
      this.restaurantService.getSchedulebyEmployee(this.employee.emp_id).then((schedules:Schedule[])=>{
         this.schedule=schedules.map(m=>{
           return m;
         })
         debugger
         //console.log(this.schedule);

         for (var i=0;i<this.schedule.length;i++){
          this.event.push({"title":"Schedule","start":this.schedule[i].schedule_start,"end":this.schedule[i].schedule_end})  
          
          console.log(this.event+" in get schedule");
       } 
       
       
       this.defaultConfigurations = {
       
         editable: false,
                  eventLimit: true,
                  titleFormat: 'MMM D YYYY',
                  header: {
                     left: 'prev,next today',
                     center: 'title',
                     right: 'month,agendaWeek,agendaDay'
                  },
                  buttonText: {
                     today: 'Today',
                     month: 'Month',
                     week: 'Week',
                     day: 'Day'
                  },
                  views: {
                     agenda: {
                        eventLimit: 2
                     }
                  },
                 
                  allDaySlot: false,
                  slotDuration: moment.duration('00:15:00'),
                  slotLabelInterval: moment.duration('01:00:00'),
                  firstDay: 1,
                  selectable: true,
                  selectHelper: true,
                  events: this.event
               };

               $('#full-calendar').fullCalendar(
                  this.defaultConfigurations
               );

      }
       
       ) };

}
