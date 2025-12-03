import { Component, OnInit, effect } from '@angular/core';
import { ProgressService } from '../../core/services/progress.service';
import { NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';

@Component({
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [NgFor, NgIf, MatCardModule, MatProgressSpinnerModule, MatChipsModule, MatSnackBarModule, MatButtonModule, DatePipe]
})
export class ProfileComponent implements OnInit {
  constructor(
    public progressService: ProgressService,
    private snackBar: MatSnackBar
  ) {
    effect(() => {
      this.progressService.progress();
    });
  }

  ngOnInit() {
    this.progressService.myProgress().subscribe({
      next: () => {},
      error: () => {
        this.snackBar.open('Error al cargar el progreso', 'Cerrar', { duration: 3000 });
      }
    });
  }

  getStatusColor(status: string): string {
    switch(status?.toLowerCase()) {
      case 'completed':
      case 'completado':
        return 'primary';
      case 'in_progress':
      case 'en progreso':
      case 'iniciado':
        return 'accent';
      default:
        return '';
    }
  }

  getProgressColor(percentage: number | undefined): string {
    if (percentage === undefined) return '#FFFFFF';
    if (percentage === 0) return '#FFFFFF';
    if (percentage === 100) return '#0A72C7';
    if (percentage <= 20) return '#BBDEFB';
    if (percentage <= 40) return '#90CAF9';
    if (percentage <= 60) return '#64B5F7';
    if (percentage <= 80) return '#38A0F5';
    return '#0D8BF2';
  }

  getChipTextColor(percentage: number | undefined): string {
    if (percentage === undefined || percentage === 0) return '#1e293b';
    if (percentage <= 25) return '#0277BD';
    if (percentage <= 50) return '#00838F';
    if (percentage <= 75) return '#00695C';
    return '#004D40';
  }

  complete(courseId: number) {
    this.progressService.complete(courseId).subscribe({
      next: () => {
        this.snackBar.open('Curso completado correctamente', 'Cerrar', { duration: 2000 });
        this.progressService.refresh().subscribe();
      },
      error: () => {
        this.snackBar.open('Error al completar el curso', 'Cerrar', { duration: 3000 });
      }
    });
  }
}
