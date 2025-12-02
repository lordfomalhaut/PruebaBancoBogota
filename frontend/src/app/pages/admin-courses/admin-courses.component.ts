import { Component, OnInit, effect } from '@angular/core';
import { CoursesService } from '../../core/services/courses.service';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  standalone: true,
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.scss'],
  imports: [
    FormsModule,
    NgIf, NgFor,
    MatCardModule, MatButtonModule, MatInputModule, MatFormFieldModule,
    MatProgressSpinnerModule, MatSnackBarModule
  ]
})
export class AdminCoursesComponent implements OnInit {
  newCourse: { module?: string; title?: string; description?: string } = {};

  constructor(
    public coursesService: CoursesService,
    private snackBar: MatSnackBar
  ) {
    effect(() => {
      this.coursesService.courses();
    });
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.coursesService.list().subscribe({
      next: () => {},
      error: () => {
        this.snackBar.open('Error al cargar los cursos', 'Cerrar', { duration: 3000 });
      }
    });
  }

  create() {
    if (!this.newCourse.module || !this.newCourse.title || !this.newCourse.description) {
      this.snackBar.open('Por favor completa todos los campos', 'Cerrar', { duration: 3000 });
      return;
    }

    this.coursesService.create(this.newCourse).subscribe({
      next: () => {
        this.newCourse = {};
        this.snackBar.open('Curso creado correctamente', 'Cerrar', { duration: 2000 });
      },
      error: () => {
        this.snackBar.open('Error al crear el curso', 'Cerrar', { duration: 3000 });
      }
    });
  }

  delete(id: number) {
    if (confirm('¿Estás seguro de eliminar este curso?')) {
      this.coursesService.delete(id).subscribe({
        next: () => {
          this.snackBar.open('Curso eliminado correctamente', 'Cerrar', { duration: 2000 });
        },
        error: () => {
          this.snackBar.open('Error al eliminar el curso', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }
}
