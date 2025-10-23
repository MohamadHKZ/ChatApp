import { Component, OnInit, signal, Signal } from '@angular/core';
import { UsersService } from '../services/users.service';
import { User } from '../models/user.model';
import { Nav } from './nav/nav';
import { Register } from './register/register';
import { Home } from './home/home';

@Component({
  selector: 'app-root',
  imports: [Nav, Home],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
