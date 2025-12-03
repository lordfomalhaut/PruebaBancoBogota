import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { ProgressService } from './progress.service';
import { CoursesService } from './courses.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = '/api/auth';

  private tokenSignal = signal<string | null>(localStorage.getItem('token'));
  private userSignal = signal<User | null>(
    JSON.parse(localStorage.getItem('user') || 'null')
  );

  token = computed(() => this.tokenSignal());
  user = computed(() => this.userSignal());
  isLogged = computed(() => !!this.tokenSignal());
  isAdmin = computed(() => this.userSignal()?.role === 'admin');

  private progressService = inject(ProgressService);
  private coursesService = inject(CoursesService);

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<{ token: string; user: User }>(
      `${this.api}/login`,
      { username, password }
    );
  }

  setSession(token: string, user: User) {
    this.tokenSignal.set(token);
    this.userSignal.set(user);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.progressService.clearProgress();
    this.coursesService.clearCourses();
  }

  logout() {
    this.tokenSignal.set(null);
    this.userSignal.set(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('courses_cache');
    localStorage.removeItem('progress_cache');
  }
}
