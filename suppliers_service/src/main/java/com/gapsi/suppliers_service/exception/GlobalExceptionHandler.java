package com.gapsi.suppliers_service.exception;

import com.gapsi.suppliers_service.exception.dto.ErrorMessage;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorMessage> handleGeneric(Exception ex, HttpServletRequest request) {
        // Excluir errores de H2 console para que funcione correctamente
        if (request.getRequestURI().startsWith("/h2-console")) {
            return null; // Dejar que Spring maneje estos errores
        }

        log.error("Error inesperado en {}: ", request.getRequestURI(), ex);
        return buildErrorResponse("Ocurrió un error inesperado. Inténtelo más tarde.", HttpStatus.INTERNAL_SERVER_ERROR,
                request);
    }

    @ExceptionHandler(SupplierNotFoundException.class)
    public ResponseEntity<ErrorMessage> handlerSupplierNotFoundException(SupplierNotFoundException ex,
                                                                         HttpServletRequest request) {
        log.warn("Proveedor no encontrado: {}", ex.getMessage());
        return buildErrorResponse(ex.getMessage(), HttpStatus.NOT_FOUND, request);
    }

    @ExceptionHandler(SupplierAlreadyExistsException.class)
    public ResponseEntity<ErrorMessage> handlerSupplierAlreadyExistsException(SupplierAlreadyExistsException ex,
                                                                              HttpServletRequest request) {
        log.warn("Proveedor ya existe: {}", ex.getMessage());
        return buildErrorResponse(ex.getMessage(), HttpStatus.FOUND, request);
    }

    @ExceptionHandler(SupplierServiceException.class)
    public ResponseEntity<ErrorMessage> handleSupplierServiceException(SupplierServiceException ex,
                                                                       HttpServletRequest request) {
        log.error("Error en servicio de Supplier: {}", ex.getMessage(), ex);
        return buildErrorResponse(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR,
                request);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorMessage> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                     HttpServletRequest request) {
        return buildErrorResponse("Error de validación", HttpStatus.BAD_REQUEST, extractFieldErrors(ex), request);
    }

    @ExceptionHandler(BindException.class)
    public ResponseEntity<ErrorMessage> handleBindException(BindException ex, HttpServletRequest request) {
        return buildErrorResponse("Error de validación", HttpStatus.BAD_REQUEST, extractFieldErrors(ex), request);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ErrorMessage> handleConstraintViolation(ConstraintViolationException ex,
                                                                  HttpServletRequest request) {
        Map<String, String> violations = new HashMap<>();
        for (ConstraintViolation<?> v : ex.getConstraintViolations()) {
            violations.put(v.getPropertyPath().toString(), v.getMessage());
        }
        return buildErrorResponse("Error de restricción de validación", HttpStatus.BAD_REQUEST, violations, request);
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ErrorMessage> handleTypeMismatch(MethodArgumentTypeMismatchException ex,
                                                           HttpServletRequest request) {
        String expected = ex.getRequiredType() != null ? ex.getRequiredType().getSimpleName() : "Desconocido";
        String msg = String.format("Valor inválido para el parámetro '%s'. Tipo esperado: %s", ex.getName(), expected);
        return buildErrorResponse(msg, HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorMessage> handleNotReadable(HttpMessageNotReadableException ex,
                                                          HttpServletRequest request) {
        return buildErrorResponse("Cuerpo de la solicitud inválido o no legible", HttpStatus.BAD_REQUEST, request);
    }

    // === Métodos auxiliares ===

    private Map<String, String> extractFieldErrors(BindException ex) {
        return ex.getBindingResult().getFieldErrors()
                .stream()
                .collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage, (a, b) -> a,
                        HashMap::new));
    }

    private ResponseEntity<ErrorMessage> buildErrorResponse(String message, HttpStatus status,
                                                            HttpServletRequest request) {
        return buildErrorResponse(message, status, null, request);
    }

    private ResponseEntity<ErrorMessage> buildErrorResponse(String message, HttpStatus status,
                                                            Map<String, String> details, HttpServletRequest request) {
        ErrorMessage errorMessage = ErrorMessage.builder()
                .timestamp(LocalDateTime.now())
                .status(status.value())
                .message(message)
                .details(details)
                .path(request.getRequestURI())
                .build();
        return new ResponseEntity<>(errorMessage, status);
    }
}
