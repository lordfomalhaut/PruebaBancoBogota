import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-topbar',
  template: `
    <mat-toolbar color="primary" class="topbar">
      <span class="brand" routerLink="/">Portal Capacitaciones</span>

      <span class="spacer"></span>

      <a mat-button routerLink="/courses" *ngIf="auth.isLogged()">Cursos</a>
      <a mat-button routerLink="/profile" *ngIf="auth.isLogged()">Mi Progreso</a>
      <a mat-button routerLink="/admin/courses" *ngIf="auth.isLogged() && auth.isAdmin()">Administración</a>

      <button mat-stroked-button color="accent" *ngIf="!auth.isLogged()" routerLink="/login">Login</button>
      <button mat-flat-button color="warn" *ngIf="auth.isLogged()" (click)="logout()">Logout</button>
    </mat-toolbar>
  `,
  styles: [`
    .topbar { 
      position: sticky; 
      top: 0; 
      z-index: 10; 
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important;
    }
    .brand { 
      cursor: pointer; 
      font-weight: 700; 
      font-size: 1.3rem;
      transition: all 0.3s ease;
      color: white !important;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
    .brand:hover {
      transform: scale(1.05);
      text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }
    .spacer { flex: 1 1 auto; }
    a[mat-button] {
      color: rgba(255, 255, 255, 0.9) !important;
      font-weight: 500;
      transition: all 0.2s ease;
    }
    a[mat-button]:hover {
      background: rgba(255, 255, 255, 0.1) !important;
      color: white !important;
    }
    button[mat-stroked-button], button[mat-flat-button] {
      font-weight: 500;
    }
  `],
  imports: [MatToolbarModule, MatButtonModule, NgIf, RouterLink]
})
export class TopbarComponent {
  constructor(public auth: AuthService, private router: Router) {}
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
