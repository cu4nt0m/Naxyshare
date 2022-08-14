import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Socket, io } from 'socket.io-client';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email!: String;
  password!: String;
  errorMsg = '';

  constructor(
    private authenticationApi: AuthenticationService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  login() {
    let data = {
      email: this.email,
      password: this.password,
    };

    this.authenticationApi
      .login$(data)
      .then((response: any) => {
        console.log(response);
        if (response.status === 'ok') {
          let newUser = {
            id: response._id,
            token: response.token,
            firstName: response.firstName,
            lastName: response.lastName,
          };
          sessionStorage.setItem('user', newUser.token);
          sessionStorage.setItem('userId', newUser.id);
          sessionStorage.setItem('userFn', newUser.firstName);
          sessionStorage.setItem('userLn', newUser.lastName);
          this.toastr.success('Login Successful', 'Login', {
            timeOut: 2500,
          });
          setTimeout(() => {
            window.location.replace('/home');
          }, 500);
        } else if (response.status === 'error') {
          this.errorMsg = response.error;
        }
      })
      .catch((e) => {
        console.log(e);
        this.errorMsg = 'Something went wrong';
      });
  }
}
