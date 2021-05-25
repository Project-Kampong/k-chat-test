import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OptionObject } from '../models/system/headers';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { UserLoginData, UserRegisterData } from '../models/data/auth';
import { GetResponse } from '../models/data/api';
import { GetLoggedInUserResponse, LoginUserResponse, LogoutUserResponse, RegisterUserResponse } from '../models/backend-responses/auth';
import { UserData } from '../models/data/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = environment.apiUrl;
  private options: OptionObject = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  private userData: UserData = <UserData>{};
  private isLoggedIn: boolean = false;

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {}

  getUserData(): UserData {
    return this.userData;
  }

  getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  loginUser(data: UserLoginData): Observable<LoginUserResponse> {
    return this.httpClient.post<LoginUserResponse>(this.url + 'api/auth/login', data, this.options).pipe((res) => {
      this.isLoggedIn = true;
      return res;
    });
  }

  registerUser(data: UserRegisterData): Observable<RegisterUserResponse> {
    return this.httpClient
      .post<RegisterUserResponse>(this.url + 'api/auth/register', data, this.options)
      .pipe((res: Observable<RegisterUserResponse>) => {
        this.isLoggedIn = true;
        return res;
      });
  }

  getLoggedInUserDetails(): Observable<GetLoggedInUserResponse> {
    return this.httpClient.get<GetLoggedInUserResponse>(this.url + 'api/auth/me').pipe((res) => {
      this.userData = res['data'];
      return res;
    });
  }

  logoutUser(): Observable<LogoutUserResponse> {
    return this.httpClient.get<GetResponse>(this.url + 'api/auth/logout').pipe((res) => {
      this.isLoggedIn = false;
      this.userData = <UserData>{};
      return res;
    });
  }

  deleteToken(): void {
    this.cookieService.delete('token', '/');
  }

  setToken(token: string): void {
    this.cookieService.set('token', token);
  }
}
