package com.gapsi.suppliers_service.exception;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class SupplierAlreadyExistsException extends RuntimeException {
    public SupplierAlreadyExistsException(final String name) {
        super("El proveedor ya existe con el nombre: " + name);
    }
}
