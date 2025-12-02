import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './core/components/topbar/topbar.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    TopbarComponent
  ],
  template: `
    <app-topbar></app-topbar>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.scss']
})
export class App {}
