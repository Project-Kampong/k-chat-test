import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

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

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
  ) {}

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
          this.subscriptions.push(
            this.authService.getLoggedInUserDetails().subscribe(
              (res) => {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Successfully logged in',
                  detail: 'Welcome back to K-Chat!',
                });
                this.router.navigate(['/home']);
              },
              (err) => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Oops! Server currently having problems',
                  detail: 'Please try again later.',
                });
              },
            ),
          );
        },
        (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Wrong username/password',
            detail: 'Please try again.',
          });
        },
      ),
    );
  }
}
