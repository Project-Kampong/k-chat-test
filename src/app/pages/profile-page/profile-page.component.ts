import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePage implements OnInit {
  constructor(private profileService: ProfileService, private authService: AuthService) {}

  ngOnInit(): void {
    console.log(this.authService.getUserId());
    this.profileService.getUserProfileById(this.authService.getUserId()).subscribe((res) => {
      console.log(res);
    });
  }
}
