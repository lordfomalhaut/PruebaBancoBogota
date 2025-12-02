import { Component, OnInit, effect } from '@angular/core';
import { CoursesService } from '../../core/services/courses.service';
import { ProgressService } from '../../core/services/progress.service';
import { MatCardModule } from '@angular/material/card';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  standalone: true,
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  imports: [NgFor, NgIf, MatCardModule, MatButtonModule, MatProgressSpinnerModule, MatSnackBarModule]
})
export class CourseListComponent implements OnInit {
  constructor(
    public coursesService: CoursesService,
    private progressService: ProgressService,
    private snackBar: MatSnackBar
  ) {
    effect(() => {
      this.coursesService.courses();
    });
  }

  ngOnInit() {
    this.coursesService.list().subscribe({
      next: () => {},
      error: (err) => {
        this.snackBar.open('Error al cargar los cursos', 'Cerrar', { duration: 3000 });
      }
    });
  }

  start(id: number) {
    this.progressService.start(id).subscribe({
      next: () => {
        this.snackBar.open('Curso iniciado correctamente', 'Cerrar', { duration: 2000 });
        this.coursesService.refresh().subscribe();
      },
      error: () => {
        this.snackBar.open('Error al iniciar el curso', 'Cerrar', { duration: 3000 });
      }
    });
  }

  complete(id: number) {
    this.progressService.complete(id).subscribe({
      next: () => {
        this.snackBar.open('Curso completado correctamente', 'Cerrar', { duration: 2000 });
        this.coursesService.refresh().subscribe();
        this.progressService.refresh().subscribe();
      },
      error: () => {
        this.snackBar.open('Error al completar el curso', 'Cerrar', { duration: 3000 });
      }
    });
  }
}
