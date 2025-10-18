import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorMessage } from '../models/error-message.model';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private notificationService: NotificationService) { }

  /**
   * Maneja errores HTTP y extrae el mensaje apropiado
   * @param error - Error HTTP recibido
   * @param defaultMessage - Mensaje por defecto si no se puede extraer el error
   */
  handleError(error: HttpErrorResponse, defaultMessage: string = 'Ocurrió un error inesperado'): void {
    let errorMessage = defaultMessage;

    if (error.error && typeof error.error === 'object') {
      // El backend devuelve un ErrorMessage estructurado
      const backendError = error.error as ErrorMessage;
      
      if (backendError.message) {
        errorMessage = backendError.message;
      } else if (backendError.error) {
        errorMessage = backendError.error;
      }
    } else if (error.error && typeof error.error === 'string') {
      // El backend devuelve un string simple
      errorMessage = error.error;
    } else if (error.message) {
      // Usar el mensaje del error HTTP
      errorMessage = error.message;
    }

    // Mostrar el error usando el servicio de notificaciones
    this.notificationService.error(errorMessage);
  }

  /**
   * Extrae solo el mensaje de error sin mostrarlo
   * @param error - Error HTTP recibido
   * @param defaultMessage - Mensaje por defecto
   * @returns El mensaje de error extraído
   */
  extractErrorMessage(error: HttpErrorResponse, defaultMessage: string = 'Ocurrió un error inesperado'): string {
    if (error.error && typeof error.error === 'object') {
      const backendError = error.error as ErrorMessage;
      return backendError.message || backendError.error || defaultMessage;
    } else if (error.error && typeof error.error === 'string') {
      return error.error;
    } else if (error.message) {
      return error.message;
    }
    return defaultMessage;
  }

  /**
   * Maneja errores de validación específicos
   * @param error - Error HTTP recibido
   */
  handleValidationError(error: HttpErrorResponse): void {
    if (error.error && typeof error.error === 'object') {
      const backendError = error.error as ErrorMessage;
      
      if (backendError.details && Object.keys(backendError.details).length > 0) {
        // Mostrar errores de validación específicos
        const validationErrors = Object.values(backendError.details).join(', ');
        this.notificationService.error(`Errores de validación: ${validationErrors}`);
      } else if (backendError.message) {
        this.notificationService.error(backendError.message);
      }
    } else {
      this.handleError(error, 'Error de validación');
    }
  }
}
