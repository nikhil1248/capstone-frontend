import { Injectable,Inject } from '@angular/core';
import { User } from './user';
import { Authresponse } from './authresponse';
import { BROWSER_STORAGE } from './storage';
import { Http, Response,Headers } from '@angular/http';
import { Employee } from './employee';
import {ChangePssword} from './change-pssword';
import { HttpParams,HttpClient } from '@angular/common/http';
import { CreateEmployee } from './create-employee';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Messages } from './messages';
import { Schedule } from './schedule';
import { NormalEmployees } from './normal-employees';


@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  

  private restaurantUrl = 'https://restaurants-managements.herokuapp.com';

  constructor(private http: Http,private httpClient:HttpClient,@Inject(BROWSER_STORAGE) private storage: Storage) { }

  private makeAuthApiCall(urlPath: string, user: User): Promise<void | Authresponse> {
    const url: string = this.restaurantUrl + '/' + urlPath;
  
    return this.http.post(url, user).toPromise()
    .then(response => {
      debugger
      return response.json() as Authresponse;
    }).catch(this.handleError);
  }

  addEmployeebyAdmin(employee:CreateEmployee):Promise<void | Employee>{
    var finalurl = this.restaurantUrl + '/api/employee/add';
    const headers = new Headers({ 'Authorization':  `Bearer ${this.storage.getItem('restaurant-token')}` });
    return this.http.post(finalurl,employee,{headers:headers}).toPromise().then(response => response.json() as Employee).catch(this.handleError);
  }

  addSchedule(schedule:Schedule){
    console.log(schedule.emp_id);
    var finalurl = this.restaurantUrl + '/schedule/add';
    const headers = new Headers({ 'Authorization':  `Bearer ${this.storage.getItem('restaurant-token')}` });
    return this.http.post(finalurl,schedule,{headers:headers}).toPromise().then(res=>{
    }).catch(this.handleError);
  }

  addMessage(message:Messages):Promise<void>{
    var finalurl = this.restaurantUrl + '/messages/add';
    const headers = new Headers({ 'Authorization':  `Bearer ${this.storage.getItem('restaurant-token')}` });
    return this.http.post(finalurl,message,{headers:headers}).toPromise().then(res=>{
    }).catch(this.handleError);
  }

  updateAdminEmployeeRole(empid:string,roleid:string):void{
    debugger
    var finalurl = this.restaurantUrl + '/api/employee/setRole';
    const myDto = { emp_id: empid, role_id: roleid, };
    const headers = new Headers({ 'Authorization':  `Bearer ${this.storage.getItem('restaurant-token')}` });
    this.http.put(finalurl,myDto,{headers:headers}).toPromise()
    .then(response => {
      
    }).catch(this.handleError);
  }

  updateEmployeeProfile(emp:FormData):void{
    var finalurl = this.restaurantUrl + '/api/employee/update';
    const headers = new Headers({ 'Authorization':  `Bearer ${this.storage.getItem('restaurant-token')}` });
    debugger
    this.http.put(finalurl,emp,{headers:headers}).toPromise()
    .then(response => {
      
    }).catch(this.handleError);
  }

  changePassword(changePassword:ChangePssword):Promise<void|String>{
    var singleUrl=this.restaurantUrl+'/api/employee/changePassword';
    const headers = new Headers({ 'Authorization':  `Bearer ${this.storage.getItem('restaurant-token')}` });
    return this.http.put(singleUrl,changePassword,{headers:headers}).toPromise()
    .then(response => {
    
      var result=response.text()
      return result;
    }).catch(this.handleError);
  }
  getEmployeebyEmail(emailid:string):Promise<void|Employee>{
    var singleUrl = this.restaurantUrl + '/api/employee/getbyemail/'+emailid;
    console.log(singleUrl);
    const headers = new Headers({ 'Authorization':  `Bearer ${this.storage.getItem('restaurant-token')}` });
    return this.http.get(singleUrl,{ headers: headers}).toPromise().then(response => response.json() as Employee).catch(this.handleError);

  }

  getSchedulebyEmployee(emp_id:string):Promise<void|Schedule[]>{
    var singleUrl = this.restaurantUrl + '/schedule/getSchedulebyEmployee/'+emp_id;
    console.log(singleUrl);
    const headers = new Headers({ 'Authorization':  `Bearer ${this.storage.getItem('restaurant-token')}` });
    return this.http.get(singleUrl,{ headers: headers}).toPromise().then(response => response.json() as Schedule[]).catch(this.handleError);

  }

  getAllManagers(): Promise<void | NormalEmployees[]> {
    const url: string = this.restaurantUrl + '/api/employee/allManagers';
    const headers = new Headers({ 'Authorization':  `Bearer ${this.storage.getItem('restaurant-token')}` });
    return this.http.get(url,{ headers: headers}).toPromise().then(response => response.json() as NormalEmployees[]).catch(this.handleError);
  }

   //get(api/employees)
   
   getAllEmployees(): Promise<void | Employee[]> {
    const url: string = this.restaurantUrl + '/api/employee/all';
    const headers = new Headers({ 'Authorization':  `Bearer ${this.storage.getItem('restaurant-token')}` });
    return this.http.get(url,{ headers: headers}).toPromise().then(response => response.json() as Employee[]).catch(this.handleError);
  }

  getAllNormalEmployees(): Promise<void | NormalEmployees[]> {
    const url: string = this.restaurantUrl + '/api/employee/allEmployees';
    const headers = new Headers({ 'Authorization':  `Bearer ${this.storage.getItem('restaurant-token')}` });
    return this.http.get(url,{ headers: headers}).toPromise().then(response => response.json() as NormalEmployees[]).catch(this.handleError);
  }

  getAllMessages(): Promise<void | Messages[]> {
    const url: string = this.restaurantUrl + '/messages/all';
    const headers = new Headers({ 'Authorization':  `Bearer ${this.storage.getItem('restaurant-token')}` });
    return this.http.get(url,{ headers: headers}).toPromise().then(response => response.json() as Messages[]).catch(this.handleError);
  }

  public login(user: User): Promise<void | Authresponse> {
    return this.makeAuthApiCall('token/generate-token', user);
  }

  deleteEmployee(employeeid: string): Promise<void | string> {
    var deleteurl = this.restaurantUrl + '/api/employee/' + employeeid;
    console.log(deleteurl);
    const headers = new Headers({ 'Authorization':  `Bearer ${this.storage.getItem('restaurant-token')}` });
    return this.http.delete(deleteurl,{ headers: headers}).toPromise().then(response => response.json() as string).catch(this.handleError);
  }
  
  

  getSingleEmployee(employeeId: string): Promise<void | Employee> {
    var singleUrl = this.restaurantUrl + '/api/employee/' + employeeId;
    const headers = new Headers({ 'Authorization':  `Bearer ${this.storage.getItem('restaurant-token')}` });
    return this.http.get(singleUrl,{ headers: headers}).toPromise().then(response => response.json() as Employee).catch(this.handleError);
  }

  getMyManager(employeeId: string): Promise<void | Employee> {
    var singleUrl = this.restaurantUrl + '/api/employee/manager/' + employeeId;
    const headers = new Headers({ 'Authorization':  `Bearer ${this.storage.getItem('restaurant-token')}` });
    return this.http.get(singleUrl,{ headers: headers}).toPromise().then(response => response.json() as Employee).catch(this.handleError);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
