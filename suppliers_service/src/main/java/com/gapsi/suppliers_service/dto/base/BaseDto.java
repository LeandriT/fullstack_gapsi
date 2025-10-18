package com.gapsi.suppliers_service.dto.base;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

/**
 * Clase base para todos los DTOs.
 * Provee los campos comunes de auditoría y el identificador UUID.
 */
@Getter
@Setter
@ToString(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public abstract class BaseDto implements Serializable {


    @ToString.Include
    private UUID uuid;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}