import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Register } from './register/register';
import { Members } from './members/members';
import { authGuard } from '../guards/auth-guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'register', component: Register },
  { path: 'members', component: Members, canActivate: [authGuard] },
];
