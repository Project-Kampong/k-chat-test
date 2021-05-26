import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OptionObject } from '../models/system/headers';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserLoginData, UserRegisterData } from '../models/data/auth';
import { GetResponse } from '../models/data/api';
import { GetLoggedInUserResponse, LoginUserResponse, LogoutUserResponse, RegisterUserResponse } from '../models/backend-responses/auth';
import { UserData } from '../models/data/user';
import { map } from 'rxjs/operators';

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
  private currentUserDataSubject: BehaviorSubject<UserData>;
  private currentUserData: Observable<UserData>;
  private isLoggedIn: boolean = false;

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
    this.currentUserDataSubject = new BehaviorSubject<UserData>(<UserData>{});
    this.currentUserData = this.currentUserDataSubject.asObservable();
  }

  getCurrentUserData(): UserData {
    return this.currentUserDataSubject.value;
  }

  getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  getCurrentUserDataObservable(): Observable<UserData> {
    return this.currentUserData;
  }

  loginUser(data: UserLoginData): Observable<LoginUserResponse> {
    return this.httpClient.post<LoginUserResponse>(this.url + 'api/auth/login', data, this.options).pipe(
      map((res: LoginUserResponse) => {
        this.isLoggedIn = true;
        this.cookieService.set('token', res.token);
        return res;
      }),
    );
  }

  registerUser(data: UserRegisterData): Observable<RegisterUserResponse> {
    return this.httpClient.post<RegisterUserResponse>(this.url + 'api/auth/register', data, this.options).pipe(
      map((res: RegisterUserResponse) => {
        this.isLoggedIn = true;
        this.cookieService.set('token', res.token);
        return res;
      }),
    );
  }

  getLoggedInUserDetails(): Observable<GetLoggedInUserResponse> {
    return this.httpClient.get<GetLoggedInUserResponse>(this.url + 'api/auth/me').pipe(
      map((res: GetLoggedInUserResponse) => {
        this.currentUserDataSubject.next(res.data);
        return res;
      }),
    );
  }

  logoutUser(): Observable<LogoutUserResponse> {
    return this.httpClient.get<GetResponse>(this.url + 'api/auth/logout').pipe(
      map((res: GetResponse) => {
        this.isLoggedIn = false;
        this.cookieService.delete('token');
        this.currentUserDataSubject.next(<UserData>{});
        return res;
      }),
    );
  }
}
