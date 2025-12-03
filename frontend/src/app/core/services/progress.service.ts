import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Progress } from '../models/progress';
import { catchError, tap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProgressService {
  private readonly api = 'http://localhost:3000/api/progress';

  private progressSignal = signal<Progress[]>([]);
  private loadingSignal = signal<boolean>(false);
  private errorSignal = signal<string | null>(null);

  progress = computed(() => this.progressSignal());
  loading = computed(() => this.loadingSignal());
  error = computed(() => this.errorSignal());

  constructor(private http: HttpClient) {
    this.loadFromCache();
  }

  private getCacheKey(): string {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        return `progress_cache_${user.id}`;
      } catch (e) {
        return 'progress_cache';
      }
    }
    return 'progress_cache';
  }

  private loadFromCache() {
    const cacheKey = this.getCacheKey();
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const progress = JSON.parse(cached);
        this.progressSignal.set(progress);
      } catch (e) {
        console.error('Error loading cached progress', e);
      }
    }
  }

  clearProgress() {
    this.progressSignal.set([]);
    this.errorSignal.set(null);
    const cacheKey = this.getCacheKey();
    localStorage.removeItem(cacheKey);
    localStorage.removeItem('progress_cache');
    this.loadFromCache();
  }

  myProgress(forceRefresh = false) {
    if (!forceRefresh && this.progressSignal().length > 0) {
      return of(this.progressSignal());
    }

    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    return this.http.get<Progress[]>(`${this.api}/me`).pipe(
      tap(progress => {
        this.progressSignal.set(progress);
        this.loadingSignal.set(false);
        const cacheKey = this.getCacheKey();
        localStorage.setItem(cacheKey, JSON.stringify(progress));
      }),
      catchError(error => {
        this.loadingSignal.set(false);
        this.errorSignal.set('Error al cargar el progreso');
        console.error('Error loading progress', error);
        return throwError(() => error);
      })
    );
  }

  start(courseId: number) {
    return this.http.post<Progress>(`${this.api}/start/${courseId}`, {}).pipe(
      tap(newProgress => {
        const current = this.progressSignal();
        const index = current.findIndex(p => p.course_id === courseId);
        if (index !== -1) {
          current[index] = newProgress;
          this.progressSignal.set([...current]);
        } else {
          this.progressSignal.set([...current, newProgress]);
        }
        const cacheKey = this.getCacheKey();
        localStorage.setItem(cacheKey, JSON.stringify(this.progressSignal()));
      }),
      catchError(error => {
        this.errorSignal.set('Error al iniciar el curso');
        return throwError(() => error);
      })
    );
  }

  complete(courseId: number) {
    return this.http.post<Progress>(`${this.api}/complete/${courseId}`, {}).pipe(
      tap(updatedProgress => {
        const current = this.progressSignal();
        const index = current.findIndex(p => p.course_id === courseId);
        if (index !== -1) {
          current[index] = updatedProgress;
          this.progressSignal.set([...current]);
          const cacheKey = this.getCacheKey();
        localStorage.setItem(cacheKey, JSON.stringify(this.progressSignal()));
        }
      }),
      catchError(error => {
        this.errorSignal.set('Error al completar el curso');
        return throwError(() => error);
      })
    );
  }

  refresh() {
    return this.myProgress(true);
  }
}
