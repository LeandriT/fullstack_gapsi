import { AxiosError } from 'axios';
import type { ErrorMessage } from '../models/error_message.model';

export class ErrorHandlerService {
  /**
   * Extrae el mensaje de error del backend
   */
  static extractErrorMessage(error: AxiosError): string {
    // Si hay respuesta del servidor
    if (error.response?.data) {
      const errorData = error.response.data as ErrorMessage;
      
      // Si tiene la estructura de ErrorMessage del backend
      if (errorData.message) {
        let message = errorData.message;
        
        // Agregar detalles de validación si existen
        if (errorData.details && Object.keys(errorData.details).length > 0) {
          const details = Object.entries(errorData.details)
            .map(([field, fieldError]) => `${field}: ${fieldError}`)
            .join('; ');
          message += ` (${details})`;
        }
        
        return message;
      }
      
      // Si es un objeto con mensaje directo
      if (typeof errorData === 'object' && 'message' in errorData) {
        return (errorData as any).message;
      }
      
      // Si es un string directo
      if (typeof errorData === 'string') {
        return errorData;
      }
    }
    
    // Si es un error de red
    if (error.code === 'NETWORK_ERROR' || error.message.includes('Network Error')) {
      return 'Error de conexión. Verifique que el servidor esté ejecutándose.';
    }
    
    // Si es un error de timeout
    if (error.code === 'ECONNABORTED') {
      return 'Tiempo de espera agotado. Intente nuevamente.';
    }
    
    // Si es un error 404
    if (error.response?.status === 404) {
      return 'Recurso no encontrado.';
    }
    
    // Si es un error 500
    if (error.response?.status === 500) {
      return 'Error interno del servidor. Contacte al administrador.';
    }
    
    // Si es un error 400 (Bad Request)
    if (error.response?.status === 400) {
      return 'Datos inválidos. Revise la información ingresada.';
    }
    
    // Si es un error 401 (Unauthorized)
    if (error.response?.status === 401) {
      return 'No autorizado. Inicie sesión nuevamente.';
    }
    
    // Si es un error 403 (Forbidden)
    if (error.response?.status === 403) {
      return 'No tiene permisos para realizar esta acción.';
    }
    
    // Mensaje genérico
    return error.message || 'Ocurrió un error inesperado.';
  }
  
  /**
   * Maneja errores de validación específicamente
   */
  static handleValidationError(error: AxiosError): string {
    if (error.response?.status === 400 && error.response.data) {
      const errorData = error.response.data as ErrorMessage;
      
      if (errorData.details) {
        const validationErrors = Object.entries(errorData.details)
          .map(([field, fieldError]) => {
            // Mapear nombres de campos a español
            const fieldNames: Record<string, string> = {
              'name': 'Nombre',
              'business_name': 'Razón Social',
              'address': 'Dirección',
              'email': 'Correo Electrónico',
              'phone': 'Teléfono',
              'status': 'Estado'
            };
            
            const spanishFieldName = fieldNames[field] || field;
            return `${spanishFieldName}: ${fieldError}`;
          })
          .join('; ');
        
        return `Errores de validación: ${validationErrors}`;
      }
      
      if (errorData.message) {
        return errorData.message;
      }
    }
    
    return this.extractErrorMessage(error);
  }
  
  /**
   * Obtiene el código de estado HTTP
   */
  static getStatusCode(error: AxiosError): number | undefined {
    return error.response?.status;
  }
  
  /**
   * Verifica si es un error de validación
   */
  static isValidationError(error: AxiosError): boolean {
    return error.response?.status === 400;
  }
  
  /**
   * Verifica si es un error de red
   */
  static isNetworkError(error: AxiosError): boolean {
    return !error.response && error.request;
  }
}
