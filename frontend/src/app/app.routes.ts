import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },

  {
    path: 'courses',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/course-list/course-list.component').then(m => m.CourseListComponent)
  },

  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/profile/profile.component').then(m => m.ProfileComponent)
  },

  {
    path: 'admin/courses',
    canActivate: [authGuard, adminGuard],
    loadComponent: () =>
      import('./pages/admin-courses/admin-courses.component').then(m => m.AdminCoursesComponent)
  },

  { path: '**', redirectTo: 'dashboard' }
];
