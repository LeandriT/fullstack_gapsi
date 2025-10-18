package com.gapsi.suppliers_service.dto.response;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.gapsi.suppliers_service.dto.base.BaseDto;
import com.gapsi.suppliers_service.model.Status;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

/**
 * DTO de salida para representar proveedores.
 */
@JsonPropertyOrder({
        "uuid",
        "name",
        "businessName",
        "address",
        "email",
        "phone",
        "status",
        "createdAt",
        "updatedAt"
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
@SuperBuilder
public class SupplierResponse extends BaseDto {

    private String name;
    private String businessName;
    private String address;
    private String email;
    private String phone;
    private Status status;
}