import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'onboarding-page',
  templateUrl: './onboarding-page.component.html',
  styleUrls: ['./onboarding-page.component.scss'],
})
export class OnboardingPage {
  isActivateMessageDisplayed: boolean = true;

  constructor(private router: Router) {}

  routeToHome(): void {
    this.router.navigate(['/home']);
  }
}
