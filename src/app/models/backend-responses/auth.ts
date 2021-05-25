import { UserData } from '../data/user';

export interface LoginUserResponse {
  success: boolean;
  token: string;
  error: string;
}

export interface LogoutUserResponse {
  success: boolean;
  data: unknown;
}

export interface RegisterUserResponse {
  success: boolean;
  token: string;
  error: string;
}

export interface GetLoggedInUserResponse {
  success: boolean;
  data: UserData;
}
