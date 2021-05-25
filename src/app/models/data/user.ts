export interface UserLogin {
  email: string;
  password: string;
}

export interface UserData {
  email: string;
  username: string;
  is_activated: boolean;
  password: string;
  role: string;
  user_id: string;
}
