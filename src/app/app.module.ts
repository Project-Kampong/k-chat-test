import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MainPage } from './pages/main-page/main-page.component';
import { ChatPage } from './pages/chat-page/chat-page.component';
import { LoginPage } from './pages/login-page/login-page.component';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
registerLocaleData(en);
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ChatroomPreviewComponent } from './components/chatroom-preview/chatroom-preview.component';
import { ChatroomWindowComponent } from './components/chatroom-window/chatroom-window.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { ProfilePage } from './pages/profile-page/profile-page.component';
import { GraphQLModule } from './graphql.module';
import { MyEventsPage } from './pages/my-events-page/my-events-page.component';
import { CreateEventPage } from './pages/create-event-page/create-event-page.component';
import { OrganizedEventCardComponent } from './components/organized-event-card/organized-event-card.component';
import { OrganizedEventPage } from './pages/organized-event-page/organized-event-page.component';
import { EditOrganizedEventCardComponent } from './components/edit-organized-event-card/edit-organized-event-card.component';
import { EditEventPage } from './pages/edit-event-page/edit-event-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPage,
    ChatPage,
    LoginPage,
    ChatroomPreviewComponent,
    ChatroomWindowComponent,
    MainHeaderComponent,
    ProfilePage,
    MyEventsPage,
    CreateEventPage,
    OrganizedEventCardComponent,
    OrganizedEventPage,
    EditOrganizedEventCardComponent,
    EditEventPage,
  ],
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
    GraphQLModule,
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
