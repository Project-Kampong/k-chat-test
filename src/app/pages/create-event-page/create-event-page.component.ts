import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { CreateEventForm } from 'src/app/forms/organizedEvents';
import { AuthService } from 'src/app/services/auth.service';
import { OrganizedEventsService } from 'src/app/services/organized-events.service';

@Component({
  selector: 'app-create-event-page',
  templateUrl: './create-event-page.component.html',
  styleUrls: ['./create-event-page.component.scss'],
})
export class CreateEventPage implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  private userId: string = '';
  createEventForm: FormGroup = new FormGroup({});
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private organizedEventsService: OrganizedEventsService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.createEventForm = this.fb.group({ ...CreateEventForm });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  routeToMyEventsPage(): void {
    this.router.navigate(['/my-events']);
  }

  createOrganizedEvent(): void {
    this.subscriptions.push(
      this.organizedEventsService.createOrganizedEvent(this.userId, this.createEventForm.value).subscribe(
        (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Event created!',
          });
          this.router.navigate(['/my-events']);
        },
        (err) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Failed to create event',
            detail: 'Please try again.',
          });
        },
      ),
    );
    console.log(this.createEventForm.value);
  }
}
