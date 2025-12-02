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
        return 'accent';
      default:
        return '';
    }
  }
}
