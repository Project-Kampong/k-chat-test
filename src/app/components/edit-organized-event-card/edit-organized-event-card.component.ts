import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrganizedEvent } from 'src/app/models/data/organizedEvents';

@Component({
  selector: 'app-edit-organized-event-card',
  templateUrl: './edit-organized-event-card.component.html',
  styleUrls: ['./edit-organized-event-card.component.scss'],
})
export class EditOrganizedEventCardComponent implements OnInit {
  @Input() organizedEventDetails: OrganizedEvent = <OrganizedEvent>{};

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.organizedEventDetails = { ...this.organizedEventDetails };
    this.organizedEventDetails.startDate = this.organizedEventDetails.startDate.substring(0, 10);
    this.organizedEventDetails.endDate = this.organizedEventDetails.endDate
      ? this.organizedEventDetails.endDate.substring(0, 10)
      : 'Present';
  }

  routeToEditEventPage(): void {
    this.router.navigate(['/my-events/edit/' + this.organizedEventDetails._id]);
  }
}
