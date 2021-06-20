import { Component, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/models/data/profile';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePage implements OnInit {
  private userId: string = '';
  userProfile: UserProfile = <UserProfile>{};

  constructor(private profileService: ProfileService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.profileService.getUserProfileById(this.userId).subscribe((res) => {
      this.userProfile = res.data.user;
    });
  }
}
