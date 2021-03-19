import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FrameworkComponent } from './framework/framework.component';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { HomeComponent } from './home/home.component';
import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { RoleguardService as RoleGuard } from './roleguard.service';
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbdModalBasic} from './modal-basic';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { AdminUpdateComponent } from './admin-update/admin-update.component';
import { ProfileComponent } from './profile/profile.component';
import { AppPasswordDirective } from './app-password.directive';
import { MostRecentFirstPipe } from './most-recent-first.pipe';
import { HtmlLineBreaksPipe } from './html-line-breaks.pipe';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ViewscheduleComponent } from './viewschedule/viewschedule.component';
import { ScheduleEmployeeComponent } from './schedule-employee/schedule-employee.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    
    LoginComponent,
    FrameworkComponent,
    NgbdModalBasic,
    
    HomeComponent,
    AddemployeeComponent,
    EmployeeListComponent,
    EmployeeDetailsComponent,
    AdminUpdateComponent,
    ProfileComponent,
    AppPasswordDirective,
    MostRecentFirstPipe,
    HtmlLineBreaksPipe,
    ViewscheduleComponent,
    ScheduleEmployeeComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,ReactiveFormsModule,NgbModule,OwlDateTimeModule,
    OwlNativeDateTimeModule,FullCalendarModule,NgxPaginationModule,BrowserAnimationsModule,HttpClientModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger'
    }),
    AppRoutingModule,
    RouterModule.forRoot([
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'employee/:employeeId',
        component: EmployeeDetailsComponent,
        canActivate: [AuthGuard]
      },
      
      {
        
        path: 'ScheduleEmployee',
        component: ScheduleEmployeeComponent,
        canActivate: [AuthGuard],
        data: {
          expectedRole: 'ROLE_MANAGER'
     }
      },
      {
        path: 'ViewSchedule',
        component: ViewscheduleComponent,
        canActivate: [AuthGuard]
        
      },
      {
        path: 'about',
        component: AboutComponent
        
      },
      {
        path:'AddEmployee',
        component:AddemployeeComponent,
        canActivate:[RoleGuard],
        data: {
             expectedRole: 'ROLE_ADMIN'
        }
      },
        {
        
        path:'GetEmployees',
          component:EmployeeListComponent,
          canActivate:[RoleGuard],
          data: { 
               expectedRole: 'ROLE_ADMIN'
          }

      },
      {
          path:'myProfile',
          component:ProfileComponent,
          canActivate: [AuthGuard]
      }
      // { 
        // I commited
        
      //   path: 'admin', 
      //   component: AdminComponent, 
      //   canActivate: [RoleGuard], 
      //   data: { 
      //     expectedRole: 'ROLE_ADMIN'
      //   }
      // },
      // {
      //   path: 'manager',
      //   component: ManagerComponent,
      //   canActivate: [RoleGuard],
      //   data: {
      //     expectedRole: 'ROLE_MANAGER'
      //   }
      // },
      // {
      //   path: 'employee',
      //   component: EmployeeComponent,
      //   canActivate: [RoleGuard],
      //   data: {
      //     expectedRole: 'ROLE_EMPLOYEE'
      //   }
      // }
    ]),
    FormsModule,
    HttpModule
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
  JwtHelperService],
  bootstrap: [FrameworkComponent]
})
export class AppModule { }
