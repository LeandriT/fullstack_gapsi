package com.gapsi.suppliers_service.model;

import com.gapsi.suppliers_service.model.base.BaseModel;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

/**
 * Entidad que representa un proveedor dentro del sistema Gapsi.
 */
@Entity
@Table(
        name = "suppliers",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_suppliers_name", columnNames = "name")
        },
        indexes = {
                @Index(name = "idx_suppliers_name", columnList = "name"),
                @Index(name = "idx_suppliers_business_name", columnList = "business_name")
        }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class Supplier extends BaseModel {


    @Column(nullable = false, length = 150)
    private String name;

    @Column(name = "business_name", nullable = false, length = 200)
    private String businessName;

    @Column(nullable = false, length = 255)
    private String address;

    @Column(length = 150)
    @Email
    private String email;

    @Column(length = 30)
    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    @Builder.Default
    private Status status = Status.ACTIVE;
}