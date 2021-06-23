import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrganizedEvent } from 'src/app/models/data/organizedEvents';
import { AuthService } from 'src/app/services/auth.service';
import { OrganizedEventsService } from 'src/app/services/organized-events.service';

@Component({
  selector: 'app-my-events-page',
  templateUrl: './my-events-page.component.html',
  styleUrls: ['./my-events-page.component.scss'],
})
export class MyEventsPage implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private organizedEventsService: OrganizedEventsService,
    private authService: AuthService,
  ) {}

  currentEventsArr: OrganizedEvent[] = [];
  subscriptions: Subscription[] = [];
  private userId: string = '';

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.organizedEventsService.getAllOrganizedEventsByUser(this.userId).subscribe(
      (res) => {
        console.log(res);
        this.currentEventsArr = res.data.user.events;
      },
      (err) => {
        console.log(err);
      },
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  routeToCreatePage(): void {
    this.router.navigate(['/my-events/create']);
  }
}
