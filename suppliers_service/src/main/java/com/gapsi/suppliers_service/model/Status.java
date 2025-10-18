package com.gapsi.suppliers_service.model;


import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Representa el estado de un proveedor.
 */
@Getter
@AllArgsConstructor
public enum Status {
    ACTIVE("ACTIVO"),
    INACTIVE("INACTIVO");

    private final String label;
}