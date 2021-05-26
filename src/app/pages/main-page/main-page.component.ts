import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPage {
  constructor(private router: Router) {}

  routeToLogin(): void {
    this.router.navigate(['/login']);
  }
}
