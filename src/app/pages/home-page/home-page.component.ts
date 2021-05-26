import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePage implements OnInit {
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    console.log(this.authService.getCurrentUserData());
  }
}
