import { Component,OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../authentication.service';
import { Messages } from '../messages';
import { Employee } from '../employee';
import { RestaurantService } from '../restaurant.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private restaurantService: RestaurantService,public auth: AuthenticationService, private modalService: NgbModal) { }

  employee: Employee;
  modalReference: any;
  p: number = 1;
  count: number = 5;
  messages:Messages[];
  public modalError: string;
  public modalAdded:string;
  public newMessage:Messages= {
    employee_id:'',
    message_time:'',
    message_text:'',
    };

    private getMyProfile():void{

      this.restaurantService.getEmployeebyEmail(this.auth.getCurrentUserEmail()).then((employee:Employee)=>{
      
        this.employee=employee;
        console.log(this.employee);
        }) 
      }

      private getAllMessages():void{

        this.restaurantService.getAllMessages().then((mes:Messages[])=>{
          this.messages=mes.map(m=>m)
          console.log(this.messages);
          }) 
        
        }

      open(content) {
        this.modalReference =  this.modalService.open(content, {size: 'sm'});
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          
        }, (reason) => {
          
        });
      }
      close():void{
        this.modalService.dismissAll();
      }

      private formIsValid(): boolean {
        if (this.newMessage.message_text) {
        return true;
        } else {
        return false;
        }
        }
      public onMessageSubmit(): void {
        this.modalError = '';
        this.modalAdded='';
        if (this.formIsValid()) {
          this.newMessage.employee_id=this.employee.emp_id;
          this.newMessage.message_time=new Date().toUTCString();
          this.restaurantService.addMessage(this.newMessage);
          console.log("added");
        this.modalAdded='Successfully Added';
        this.modalService.dismissAll();
        } else {
        this.modalError = 'All fields required, please try again';
        }
        this.modalReference.close();
        window.location.reload();
      }


      ngOnInit() {
        this.getMyProfile();
        this.getAllMessages();
      }
  
  
}
