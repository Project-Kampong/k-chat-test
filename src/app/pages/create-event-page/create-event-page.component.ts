import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event-page',
  templateUrl: './create-event-page.component.html',
  styleUrls: ['./create-event-page.component.scss'],
})
export class CreateEventPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  routeToMyEventsPage(): void {
    this.router.navigate(['/my-events']);
  }
}
