import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrganizedEvent } from 'src/app/models/data/organizedEvents';

@Component({
  selector: 'app-organized-event-card',
  templateUrl: './organized-event-card.component.html',
  styleUrls: ['./organized-event-card.component.scss'],
})
export class OrganizedEventCardComponent implements OnInit {
  @Input() organizedEventDetails: OrganizedEvent = <OrganizedEvent>{};

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.organizedEventDetails = { ...this.organizedEventDetails };
    this.organizedEventDetails.startDate = this.organizedEventDetails.startDate.substring(0, 10);
    this.organizedEventDetails.endDate = this.organizedEventDetails.endDate
      ? this.organizedEventDetails.endDate.substring(0, 10)
      : 'Present';
  }

  routeToEventPage(): void {
    this.router.navigate(['/events/' + this.organizedEventDetails._id]);
  }
}
