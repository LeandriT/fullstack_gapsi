import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { AxiosError } from 'axios';
import { ErrorHandlerService } from '../services/error-handler.service';

/**
 * Custom Hooks Pattern Implementation
 * 
 * Este patrón encapsula lógica reutilizable de manejo de errores en un hook personalizado.
 * Proporciona una interfaz consistente para notificaciones y manejo de errores en toda la app.
 * 
 * Beneficios:
 * - Lógica reutilizable entre componentes
 * - Encapsulación de estado y efectos
 * - Interfaz consistente para manejo de errores
 * - Facilita testing y mantenimiento
 */
export function useErrorHandler() {
  const { enqueueSnackbar } = useSnackbar();

  const handleError = useCallback((
    error: AxiosError, 
    defaultMessage: string,
    options?: {
      showValidationDetails?: boolean;
      autoHideDuration?: number;
    }
  ) => {
    const { showValidationDetails = true, autoHideDuration = 6000 } = options || {};
    
    let message: string;
    
    if (ErrorHandlerService.isValidationError(error) && showValidationDetails) {
      message = ErrorHandlerService.handleValidationError(error);
    } else {
      message = ErrorHandlerService.extractErrorMessage(error);
    }
    
    enqueueSnackbar(`${defaultMessage}: ${message}`, {
      variant: 'error',
      autoHideDuration,
    });
    
    console.error(`${defaultMessage}:`, error);
  }, [enqueueSnackbar]);

  const handleSuccess = useCallback((message: string) => {
    enqueueSnackbar(message, { variant: 'success' });
  }, [enqueueSnackbar]);

  const handleInfo = useCallback((message: string) => {
    enqueueSnackbar(message, { variant: 'info' });
  }, [enqueueSnackbar]);

  const handleWarning = useCallback((message: string) => {
    enqueueSnackbar(message, { variant: 'warning' });
  }, [enqueueSnackbar]);

  return {
    handleError,
    handleSuccess,
    handleInfo,
    handleWarning,
  };
}
