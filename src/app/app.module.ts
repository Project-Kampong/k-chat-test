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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { LoginPage } from './pages/login-page/login-page.component';
import { MainPage } from './pages/main-page/main-page.component';
import { MessageService } from 'primeng/api';
import { NgModule } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { QaPageComponent } from './pages/qa-page/qa-page.component';
import { registerLocaleData } from '@angular/common';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { ToastModule } from 'primeng/toast';
import { AccordionModule } from 'primeng/accordion';
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
import { PublicProfilePage } from './pages/public-profile-page/public-profile-page.component';

registerLocaleData(en);

const config: SocketIoConfig = { url: 'http://localhost:5000', options: {} };
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
    PublicProfilePage,
    QaPageComponent,
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
    SocketIoModule.forRoot(config),
    DividerModule,
    CardModule,
    AccordionModule,
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
