import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  userId: string | null = '';

  routeToLogin(): void {
    this.router.navigate(['/login']);
  }

  routeToProfile(): void {
    this.router.navigate(['/profile']);
  }

  routeToHome(): void {
    this.router.navigate(['/']);
  }

  logoutUser(): void {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
  }
}
