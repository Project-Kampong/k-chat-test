import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { LoginPage } from './pages/login-page/login-page.component';
import { MainPage } from './pages/main-page/main-page.component';
import { ProfilePage } from './pages/profile-page/profile-page.component';

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
    path: 'profile',
    component: ProfilePage,
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
