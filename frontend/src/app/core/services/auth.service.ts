import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = 'http://localhost:3000/api/auth';

  private tokenSignal = signal<string | null>(localStorage.getItem('token'));
  private userSignal = signal<User | null>(
    JSON.parse(localStorage.getItem('user') || 'null')
  );

  token = computed(() => this.tokenSignal());
  user = computed(() => this.userSignal());
  isLogged = computed(() => !!this.tokenSignal());
  isAdmin = computed(() => this.userSignal()?.role === 'admin');

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
