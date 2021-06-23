import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { OrganizedEvent } from 'src/app/models/data/organizedEvents';
import { OrganizedEventsService } from 'src/app/services/organized-events.service';

@Component({
  selector: 'app-organized-event-page',
  templateUrl: './organized-event-page.component.html',
  styleUrls: ['./organized-event-page.component.scss'],
})
export class OrganizedEventPage implements OnInit {
  subscriptions: Subscription[] = [];
  private eventId: string | null = '';
  eventDetails: OrganizedEvent = <OrganizedEvent>{};

  constructor(
    private organizedEventsService: OrganizedEventsService,
    private route: ActivatedRoute,
    private messageService: MessageService,
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

  routeToQNAPage(): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Q&A Session is closed',
      detail: "Oops! This function isn't available at the moment. :(",
    });
  }
}
