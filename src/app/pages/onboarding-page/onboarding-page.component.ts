import { Component } from '@angular/core';

@Component({
  selector: 'onboarding-page',
  templateUrl: './onboarding-page.component.html',
  styleUrls: ['./onboarding-page.component.scss'],
})
export class OnboardingPage {
  isActivateMessageDisplayed: boolean = true;
}
