import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {
    constructor(private snackBar: MatSnackBar) { }

    show(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info'): void {
        this.snackBar.open(message, 'Cerrar', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: [`${type}-snackbar`]
        });
      }
    
      success(message: string): void {
        this.show(message, 'success');
      }
    
      error(message: string): void {
        this.show(message, 'error');
      }
    
      warning(message: string): void {
        this.show(message, 'warning');
      }
    
      info(message: string): void {
        this.show(message, 'info');
      }
}