import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { OnboardingGuard } from './helpers/onboarding.guard';
import { ChatPage } from './pages/chat-page/chat-page.component';
import { HomePage } from './pages/home-page/home-page.component';
import { LoginPage } from './pages/login-page/login-page.component';
import { MainPage } from './pages/main-page/main-page.component';
import { OnboardingPage } from './pages/onboarding-page/onboarding-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
  },
  {
    path: 'home',
    component: HomePage,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'chat',
    component: ChatPage,
    canActivate: [AuthGuard],
  },
  {
    path: 'onboarding',
    component: OnboardingPage,
    canActivate: [AuthGuard, OnboardingGuard],
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
