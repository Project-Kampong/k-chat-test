import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { OrganizedEvent } from 'src/app/models/data/organizedEvents';
import { OrganizedEventsService } from 'src/app/services/organized-events.service';

@Component({
  selector: 'app-organized-event-page',
  templateUrl: './organized-event-page.component.html',
  styleUrls: ['./organized-event-page.component.scss'],
})
export class OrganizedEventPage implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  private eventId: string | null = '';
  eventDetails: OrganizedEvent = <OrganizedEvent>{};

  constructor(
    private organizedEventsService: OrganizedEventsService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id') ? this.route.snapshot.paramMap.get('id') : '';
    this.subscriptions.push(
      this.organizedEventsService.getEventById(this.eventId ? this.eventId : '').subscribe(
        (res) => {
          this.eventDetails = { ...res.data.organizedEvent };
          console.log(this.eventDetails);
        },
        (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Something went wrong :(',
            detail: 'Please reload the page again.',
          });
        },
      ),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  routeToQNAPage(): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Q&A Session is closed',
      detail: "Oops! This function isn't available at the moment. :(",
    });
  }

  routeToOrganizerProfile(): void {
    this.router.navigate(['/profile/' + this.eventDetails.organizerId]);
  }
}
