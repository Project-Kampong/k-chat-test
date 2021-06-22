import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-events-page',
  templateUrl: './my-events-page.component.html',
  styleUrls: ['./my-events-page.component.scss'],
})
export class MyEventsPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  routeToCreatePage(): void {
    this.router.navigate(['/my-events/create']);
  }
}
