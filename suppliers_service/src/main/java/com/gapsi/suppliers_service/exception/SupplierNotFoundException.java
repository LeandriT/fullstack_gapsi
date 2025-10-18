package com.gapsi.suppliers_service.exception;

import java.util.UUID;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class SupplierNotFoundException extends RuntimeException {
    public SupplierNotFoundException(final UUID id) {
        super("No se pudo encontrar el proveedor con el id: " + id);
    }
}
