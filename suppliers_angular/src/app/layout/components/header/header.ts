import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  currentRoute = '';

  constructor(private router: Router) {
    // Suscribirse a los cambios de ruta para mostrar el estado activo
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
      });
  }

  navigateToWelcome(): void {
    this.router.navigate(['/']);
  }

  navigateToSuppliers(): void {
    this.router.navigate(['/suppliers']);
  }

  isActive(route: string): boolean {
    if (route === '/' && this.currentRoute === '/') {
      return true;
    }
    if (route === '/suppliers' && this.currentRoute.startsWith('/suppliers')) {
      return true;
    }
    return false;
  }
}
