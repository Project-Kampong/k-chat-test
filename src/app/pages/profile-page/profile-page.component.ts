import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ProfileDetailsForm } from 'src/app/forms/profile';
import { UserProfile } from 'src/app/models/data/profile';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  private userId: string = '';
  userProfile: UserProfile = <UserProfile>{};
  profileDetailsForm: FormGroup = new FormGroup({});

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private fb: FormBuilder,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.profileDetailsForm = this.fb.group({ ...ProfileDetailsForm });
    this.subscriptions.push(
      this.profileService.getUserProfileById(this.userId).subscribe((res) => {
        this.userProfile = { ...res.data.user };
        this.userProfile.dob = res.data.user.dob.toString().substr(0, 10);
        this.profileDetailsForm.patchValue(this.userProfile);
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  saveProfileDetails(): any {
    this.subscriptions.push(
      this.profileService.updateUserProfileById(this.userId, this.profileDetailsForm.value).subscribe(
        (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Details saved successfully',
          });
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
}
