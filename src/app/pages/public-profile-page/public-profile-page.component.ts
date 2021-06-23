import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { UserProfileDetails } from 'src/app/models/data/profile';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-public-profile-page',
  templateUrl: './public-profile-page.component.html',
  styleUrls: ['./public-profile-page.component.scss'],
})
export class PublicProfilePage implements OnInit, OnDestroy {
  private userId: string | null = '';
  subscriptions: Subscription[] = [];
  profileDetails: UserProfileDetails = <UserProfileDetails>{};

  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') ? this.route.snapshot.paramMap.get('id') : '';
    this.subscriptions.push(
      this.profileService.getUserProfileById(this.userId ? this.userId : '').subscribe(
        (res) => {
          this.profileDetails = { ...res.data.user };
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
}
