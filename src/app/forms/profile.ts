import { FormControl } from '@angular/forms';

export const ProfileDetailsForm = {
  name: new FormControl(''),
  gender: new FormControl(''),
  profilePicture: new FormControl(''),
  dob: new FormControl(''),
  occupation: new FormControl(''),
};
