import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginForm } from '../../forms/login';
import { RegisterForm } from '../../forms/register';
import { LoginUserResponse, RegisterUserResponse } from 'src/app/models/backend-responses/auth';

@Component({
  selector: 'app-login-page',
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

  registerUser(): void {
    this.subscriptions.push(
      this.authService.registerUser(this.registerCredentials.value).subscribe(
        (res: RegisterUserResponse) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successfully Registered!',
            detail: 'Welcome to Kampong!',
          });
          this.router.navigate(['/']);
        },
        (err) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Username/Email taken already :(',
            detail: 'Please try again',
          });
        },
      ),
    );
  }

  loginUser(): void {
    this.subscriptions.push(
      this.authService.loginUser(this.loginCredentials.value).subscribe(
        (res: LoginUserResponse) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successfully logged in',
            detail: 'Welcome back to Kampong!',
          });
          this.router.navigate(['/']);
        },
        (err) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Wrong Username/Password',
            detail: 'Please try again.',
          });
        },
      ),
    );
  }
}
