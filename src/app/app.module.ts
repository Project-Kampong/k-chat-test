import en from '@angular/common/locales/en';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChatPage } from './pages/chat-page/chat-page.component';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './pages/home-page/home-page.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { LoginPage } from './pages/login-page/login-page.component';
import { MainPage } from './pages/main-page/main-page.component';
import { MessageService } from 'primeng/api';
import { NgModule } from '@angular/core';
import { OnboardingPage } from './pages/onboarding-page/onboarding-page.component';
import { PasswordModule } from 'primeng/password';
import { QaPageComponent } from './pages/qa-page/qa-page.component';
import { registerLocaleData } from '@angular/common';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { ToastModule } from 'primeng/toast';

registerLocaleData(en);

const config: SocketIoConfig = { url: 'http://localhost:5000', options: {} };
@NgModule({
  declarations: [AppComponent, MainPage, HomePage, ChatPage, LoginPage, OnboardingPage, QaPageComponent],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    ToastModule,
    DialogModule,
    SocketIoModule.forRoot(config),
    DividerModule,
    CardModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
