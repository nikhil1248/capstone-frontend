import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formError: string = '';
  Swal:any=  require('sweetalert2');
  public credentials = {
    username: '',
    password: ''
  };
  constructor(private router: Router, private authenticationService: AuthenticationService) { }
  ngOnInit() {
  }
  public onLoginSubmit(): void {
    this.formError = '';
    if (!this.credentials.username || !this.credentials.password) {
      this.formError = 'All fields are required, please try again';
    } else {
      this.doLogin();
    }
  }


  private doLogin(): void {
    this.authenticationService.login(this.credentials)
      .then(() => this.router.navigateByUrl('/home'))
      .catch((message) => {
        //this.formError = message
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Enter Correct Credentials'
        })
      });
  }
}
