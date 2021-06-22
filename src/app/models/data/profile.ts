export interface UserProfile {
  email: string;
  username: string;
  dob: Date | string;
  gender: string;
  name: string;
  occupation: string;
  profilePicture: string;
}

export interface UserProfileDetails {
  name: string;
  gender: string;
  profilePicture: string;
  dob: Date | string;
  occupation: string;
}
