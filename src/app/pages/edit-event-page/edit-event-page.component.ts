import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { EditEventForm } from 'src/app/forms/organizedEvents';
import { OrganizedEvent } from 'src/app/models/data/organizedEvents';
import { AuthService } from 'src/app/services/auth.service';
import { OrganizedEventsService } from 'src/app/services/organized-events.service';

@Component({
  selector: 'app-edit-event-page',
  templateUrl: './edit-event-page.component.html',
  styleUrls: ['./edit-event-page.component.scss'],
})
export class EditEventPage implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  private userId: string = '';
  private eventId: string | null = '';
  eventDetails: OrganizedEvent = <OrganizedEvent>{};
  editEventForm: FormGroup = new FormGroup({});
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private organizedEventsService: OrganizedEventsService,
    private messageService: MessageService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.eventId = this.route.snapshot.paramMap.get('id') ? this.route.snapshot.paramMap.get('id') : '';
    this.editEventForm = this.fb.group({ ...EditEventForm });
    this.subscriptions.push(
      this.organizedEventsService.getEventById(this.eventId ? this.eventId : '').subscribe(
        (res) => {
          this.eventDetails = { ...res.data.organizedEvent };
          this.eventDetails.startDate = this.eventDetails.startDate
            ? this.eventDetails.startDate.toString().substr(0, 10)
            : '';
          this.eventDetails.endDate = this.eventDetails.endDate
            ? this.eventDetails.endDate.toString().substr(0, 10)
            : '';
          this.editEventForm.patchValue(this.eventDetails);
        },
        (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Something went wrong :(',
            detail: 'Please refresh to continue.',
          });
        },
      ),
    );
  }

  removeEvent(): void {
    this.subscriptions.push(
      this.organizedEventsService.removeOrganizedEvent(this.userId, this.eventDetails._id).subscribe(
        (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Event deleted successfully',
          });
          this.router.navigate(['/my-events']);
        },
        (err) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Failed to delete event',
            detail: 'Please try again.',
          });
        },
      ),
    );
  }

  updateEvent(): void {
    this.subscriptions.push(
      this.organizedEventsService
        .updateOrganizedEvent(this.userId, this.eventDetails._id, this.editEventForm.value)
        .subscribe(
          (res) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Event saved successfully',
            });
            this.router.navigate(['/my-events']);
          },
          (err) => {
            console.log(err);
            this.messageService.add({
              severity: 'error',
              summary: 'Failed to save details',
              detail: 'Please try again.',
            });
          },
        ),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  routeToMyEventsPage(): void {
    this.router.navigate(['/my-events']);
  }
}
