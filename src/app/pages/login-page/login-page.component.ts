import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

const userLoginForm = {
  email: new FormControl(''),
  password: new FormControl(''),
};

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  loginCredentials = new FormGroup({});
  subscriptions: Subscription[] = [];

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginCredentials = this.fb.group({
      ...userLoginForm,
    });
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  login(): void {
    this.subscriptions.push(
      this.authService.loginUser(this.loginCredentials.value).subscribe(
        (res) => {
          console.log('Successful');
        },
        (err) => {
          console.log('Unsuccessful');
        },
      ),
    );
  }
}
