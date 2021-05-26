import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginForm } from '../../forms/login';
import { RegisterForm } from '../../forms/register';
import {
  GetLoggedInUserResponse,
  LoginUserResponse,
  RegisterUserResponse,
} from 'src/app/models/backend-responses/auth';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  loginCredentials: FormGroup = new FormGroup({});
  registerCredentials: FormGroup = new FormGroup({});
  subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.loginCredentials = this.fb.group({ ...LoginForm });
    this.registerCredentials = this.fb.group({ ...RegisterForm });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  fadeCard(): void {
    const loginCardElement: HTMLElement | null = document.getElementById('login-card');
    const registerCardElement: HTMLElement | null = document.getElementById('register-card');
    if (loginCardElement && registerCardElement) {
      loginCardElement?.classList.toggle('fade');
      registerCardElement?.classList.toggle('fade');
    }
  }

  checkSamePassword(): boolean {
    return this.registerCredentials.get('password')?.value === this.registerCredentials.get('confirmPassword')?.value;
  }

  isRegisterFormValid(): boolean {
    return (
      this.registerCredentials.get('username')?.errors === null &&
      this.registerCredentials.get('email')?.errors === null &&
      this.registerCredentials.get('password')?.errors === null &&
      this.checkSamePassword()
    );
  }

  /* For testing purposes, do not delete. */
  registerTest(): void {
    this.router.navigate(['/onboarding']);
  }

  register(): void {
    this.subscriptions.push(
      this.authService.registerUser(this.registerCredentials.value).subscribe(
        (res: RegisterUserResponse) => {
          this.subscriptions.push(
            this.authService.getLoggedInUserDetails().subscribe(
              (res: GetLoggedInUserResponse) => {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Successfully Registered!',
                  detail: 'Welcome to K-Chat!',
                });
                this.router.navigate(['/onboarding']);
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
            summary: 'Oops! Something went wrong!',
            detail: 'Please try again.',
          });
        },
      ),
    );
  }

  login(): void {
    this.subscriptions.push(
      this.authService.loginUser(this.loginCredentials.value).subscribe(
        (res: LoginUserResponse) => {
          this.subscriptions.push(
            this.authService.getLoggedInUserDetails().subscribe(
              (res: GetLoggedInUserResponse) => {
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
