package com.gapsi.suppliers_service.dto.request;

import com.gapsi.suppliers_service.model.Status;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * DTO de entrada para operaciones de creación o actualización de proveedores.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PartialUpdateSupplierRequest {

    @NotNull(message = "El estado es obligatorio.")
    private Status status;
}