import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { LogoutUserResponse } from 'src/app/models/backend-responses/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  routeToChat(): void {
    this.router.navigate(['/chat']);
  }

  logout(): void {
    this.subscriptions.push(
      this.authService.logoutUser().subscribe(
        (res: LogoutUserResponse) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successfully logged out',
          });
          this.router.navigate(['/main']);
        },
        (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Oops! Unable to log out safely',
            detail: 'Please try again.',
          });
        },
      ),
    );
  }
}
