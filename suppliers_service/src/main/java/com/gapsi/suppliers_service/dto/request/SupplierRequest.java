package com.gapsi.suppliers_service.dto.request;

import com.gapsi.suppliers_service.dto.retention.OnCreate;
import com.gapsi.suppliers_service.dto.retention.OnUpdate;
import com.gapsi.suppliers_service.model.Status;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
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
public class SupplierRequest {

    @NotBlank(message = "El nombre del proveedor es obligatorio", groups = {OnCreate.class, OnUpdate.class})
    @Size(max = 150, message = "El nombre no debe exceder los 150 caracteres.", groups = OnCreate.class)
    private String name;

    @NotBlank(message = "La razón social es obligatoria.", groups = OnCreate.class)
    @Size(max = 200, message = "La razón social no debe exceder los 200 caracteres.", groups = OnCreate.class)
    private String businessName;

    @NotBlank(message = "La dirección es obligatoria.", groups = OnCreate.class)
    @Size(max = 255, message = "La dirección no debe exceder los 255 caracteres.", groups = OnCreate.class)
    private String address;

    @NotBlank(message = "El correo electrónico es obligatorio", groups = OnCreate.class)
    @Email(message = "El correo electrónico no es válido.", groups = OnCreate.class)
    @Size(max = 150, message = "El correo electrónico no debe exceder los 150 caracteres.", groups = OnCreate.class)
    private String email;

    @Pattern(
            regexp = "^[0-9+()\\-\\s]{7,30}$",
            message = "El teléfono solo puede contener números, espacios y los símbolos + - ( )"
    )
    private String phone;
    @Builder.Default
    private Status status = Status.ACTIVE;
}