import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { CreateEventPage } from './pages/create-event-page/create-event-page.component';
import { EditEventPage } from './pages/edit-event-page/edit-event-page.component';
import { LoginPage } from './pages/login-page/login-page.component';
import { MainPage } from './pages/main-page/main-page.component';
import { MyEventsPage } from './pages/my-events-page/my-events-page.component';
import { OrganizedEventPage } from './pages/organized-event-page/organized-event-page.component';
import { ProfilePage } from './pages/profile-page/profile-page.component';
import { PublicProfilePage } from './pages/public-profile-page/public-profile-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
  },
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'events/:id',
    component: OrganizedEventPage,
  },
  {
    path: 'profile/:id',
    component: PublicProfilePage,
  },
  {
    path: 'my-profile',
    component: ProfilePage,
    canActivate: [AuthGuard],
  },
  {
    path: 'my-events',
    component: MyEventsPage,
    canActivate: [AuthGuard],
  },

  {
    path: 'my-events/edit/:id',
    component: EditEventPage,
    canActivate: [AuthGuard],
  },
  {
    path: 'my-events/create',
    component: CreateEventPage,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
