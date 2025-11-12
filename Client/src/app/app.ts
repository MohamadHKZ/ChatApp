import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { Nav } from './nav/nav';
import { RouterOutlet } from '@angular/router';
import { Content } from './shared/content/content';
import { InitService } from '../services/init.service';

@Component({
  selector: 'app-root',
  imports: [Nav, RouterOutlet, Content],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  InitService = inject(InitService);
}
