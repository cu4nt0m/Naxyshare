import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  email!: String;
  password!: String;
  firstName!: String;
  lastName!: String;
  errorMsg = '';

  constructor(
    private authenticationApi: AuthenticationService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  submit() {
    let data = {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password,
    };

    this.authenticationApi
      .register$(data)
      .then((response: any) => {
        console.log(response);
        if (!response.error) {
          this.toastr.success(
            'User created successfully',
            'Registration Success',
            {
              timeOut: 2500,
            }
          );
          this.router.navigate(['/login']);
        } else if (response.error === 'Invalid email') {
          this.errorMsg = response.error;
        } else if (
          response.error ===
          'Password too small. Should be atleast 6 characters'
        ) {
          this.errorMsg = response.error;
        } else if (response.error === 'email is not valid') {
          this.errorMsg = 'Email is not valid';
        } else if ((response.status = 11000)) {
          this.errorMsg = 'Email already in use';
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
