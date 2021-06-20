import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OptionObject } from '../models/system/headers';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { UserLoginData, UserRegisterData } from '../models/data/auth';
import { LoginUserResponse, RegisterUserResponse } from '../models/backend-responses/auth';
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
  private userId: string | null = '';

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
    this.userId = localStorage.getItem('userId') ? localStorage.getItem('userId') : '';
  }

  getUserId(): string {
    return this.userId ? this.userId : '';
  }

  loginUser(data: UserLoginData): Observable<LoginUserResponse> {
    return this.httpClient.post<LoginUserResponse>(this.url + '/auth/login', data, this.options).pipe(
      map((res: LoginUserResponse) => {
        localStorage.setItem('userId', res.userId);
        this.userId = res.userId;
        this.cookieService.set(
          'token',
          res.token,
          res.tokenExpiration ? parseInt(res.tokenExpiration.split('d')[0]) : 30,
        );
        return res;
      }),
    );
  }

  registerUser(data: UserRegisterData): Observable<RegisterUserResponse> {
    return this.httpClient.post<RegisterUserResponse>(this.url + '/auth/register', data, this.options).pipe(
      map((res: RegisterUserResponse) => {
        localStorage.setItem('userId', res.userId);
        this.userId = res.userId;
        this.cookieService.set(
          'token',
          res.token,
          res.tokenExpiration ? parseInt(res.tokenExpiration.split('d')[0]) : 30,
        );
        return res;
      }),
    );
  }

  logoutUser(): void {
    localStorage.removeItem('userId');
    this.userId = '';
    this.cookieService.delete('token');
  }
}
