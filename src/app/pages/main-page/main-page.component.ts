import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrganizedEvent } from 'src/app/models/data/organizedEvents';
import { OrganizedEventsService } from 'src/app/services/organized-events.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPage implements OnInit, OnDestroy {
  constructor(private organizedEventsService: OrganizedEventsService) {}

  organizedEventsArr: OrganizedEvent[] = [];
  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.organizedEventsService.getAllOrganizedEvents().subscribe((res) => {
      this.organizedEventsArr = res.data.organizedEvents;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
