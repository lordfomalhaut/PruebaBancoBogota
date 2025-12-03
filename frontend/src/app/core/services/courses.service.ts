import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../models/course';
import { catchError, tap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CoursesService {
  private readonly api = 'http://localhost:3000/api/courses';

  private coursesSignal = signal<Course[]>([]);
  private loadingSignal = signal<boolean>(false);
  private errorSignal = signal<string | null>(null);

  courses = computed(() => this.coursesSignal());
  loading = computed(() => this.loadingSignal());
  error = computed(() => this.errorSignal());

  constructor(private http: HttpClient) {
    const cached = localStorage.getItem('courses_cache');
    if (cached) {
      try {
        const courses = JSON.parse(cached);
        this.coursesSignal.set(courses);
      } catch (e) {
        console.error('Error loading cached courses', e);
      }
    }
  }

  list(forceRefresh = false) {
    if (!forceRefresh && this.coursesSignal().length > 0) {
      return of(this.coursesSignal());
    }

    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    return this.http.get<Course[]>(this.api).pipe(
      tap(courses => {
        this.coursesSignal.set(courses);
        this.loadingSignal.set(false);
        localStorage.setItem('courses_cache', JSON.stringify(courses));
      }),
      catchError(error => {
        this.loadingSignal.set(false);
        this.errorSignal.set('Error al cargar los cursos');
        console.error('Error loading courses', error);
        return throwError(() => error);
      })
    );
  }

  get(id: number) {
    const cached = this.coursesSignal().find(c => c.id === id);
    if (cached) {
      return of(cached);
    }

    return this.http.get<Course>(`${this.api}/${id}`).pipe(
      catchError(error => {
        this.errorSignal.set('Error al cargar el curso');
        return throwError(() => error);
      })
    );
  }

  create(course: Partial<Course>) {
    return this.http.post<Course>(this.api, course).pipe(
      tap(newCourse => {
        const current = this.coursesSignal();
        this.coursesSignal.set([...current, newCourse]);
        localStorage.setItem('courses_cache', JSON.stringify(this.coursesSignal()));
      }),
      catchError(error => {
        this.errorSignal.set('Error al crear el curso');
        return throwError(() => error);
      })
    );
  }

  update(id: number, course: Partial<Course>) {
    return this.http.put<Course>(`${this.api}/${id}`, course).pipe(
      tap(updatedCourse => {
        const current = this.coursesSignal();
        const index = current.findIndex(c => c.id === id);
        if (index !== -1) {
          current[index] = updatedCourse;
          this.coursesSignal.set([...current]);
          localStorage.setItem('courses_cache', JSON.stringify(this.coursesSignal()));
        }
      }),
      catchError(error => {
        this.errorSignal.set('Error al actualizar el curso');
        return throwError(() => error);
      })
    );
  }

  delete(id: number) {
    return this.http.delete(`${this.api}/${id}`).pipe(
      tap(() => {
        const current = this.coursesSignal();
        this.coursesSignal.set(current.filter(c => c.id !== id));
        localStorage.setItem('courses_cache', JSON.stringify(this.coursesSignal()));
      }),
      catchError(error => {
        this.errorSignal.set('Error al eliminar el curso');
        return throwError(() => error);
      })
    );
  }

  refresh() {
    return this.list(true);
  }

  clearCourses() {
    this.coursesSignal.set([]);
    this.errorSignal.set(null);
    localStorage.removeItem('courses_cache');
  }
}
