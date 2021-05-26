export interface UserLogin {
  email: string;
  password: string;
}

export interface UserData {
  email: string;
  username: string;
  is_activated: boolean;
  role: string;
  user_id: string;
}
