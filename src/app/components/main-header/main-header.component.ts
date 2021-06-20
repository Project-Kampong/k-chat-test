import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  routeToLogin(): void {
    this.router.navigate(['/login']);
  }

  routeToHome(): void {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    console.log(this.authService.getUserId());
  }
}
