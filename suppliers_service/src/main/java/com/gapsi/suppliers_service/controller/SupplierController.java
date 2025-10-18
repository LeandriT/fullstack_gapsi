package com.gapsi.suppliers_service.controller;

import com.gapsi.suppliers_service.dto.request.PartialUpdateSupplierRequest;
import com.gapsi.suppliers_service.dto.request.SupplierRequest;
import com.gapsi.suppliers_service.dto.response.SupplierResponse;
import com.gapsi.suppliers_service.dto.retention.OnCreate;
import com.gapsi.suppliers_service.dto.retention.OnUpdate;
import com.gapsi.suppliers_service.service.SupplierService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1/suppliers", produces = MediaType.APPLICATION_JSON_VALUE)
@Tag(name = "Suppliers", description = "Operaciones CRUD para proveedores")
public class SupplierController {

    private final SupplierService supplierService;


    @GetMapping
    @Operation(
            summary = "Listar proveedores",
            description = "Obtiene una lista paginada de proveedores.",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Listado de proveedores",
                            content = @Content(
                                    mediaType = "application/json",
                                    array = @ArraySchema(schema = @Schema(implementation = SupplierResponse.class))
                            )
                    )
            }
    )
    public ResponseEntity<Page<SupplierResponse>> index(Pageable pageable) {
        return ResponseEntity.ok(supplierService.index(pageable));
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Crear nuevo proveedor",
            description = "Crea un nuevo proveedor.",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    required = true,
                    description = "Datos del proveedor a crear",
                    content = @Content(schema = @Schema(implementation = SupplierRequest.class))
            ),
            responses = {
                    @ApiResponse(responseCode = "201", description = "Proveedor creado exitosamente",
                            content = @Content(schema = @Schema(implementation = SupplierResponse.class))),
                    @ApiResponse(responseCode = "400", description = "Solicitud inválida", content = @Content)
            }
    )
    public ResponseEntity<SupplierResponse> create(
            @Validated(OnCreate.class) @RequestBody SupplierRequest supplierRequest) {
        return new ResponseEntity<>(supplierService.create(supplierRequest), HttpStatus.CREATED);
    }

    @GetMapping(path = "/{uuid}")
    @Operation(
            summary = "Obtener proveedor por ID",
            parameters = {
                    @Parameter(name = "uuid", description = "UUID del proveedor", required = true)
            },
            responses = {
                    @ApiResponse(responseCode = "200", description = "Proveedor encontrado",
                            content = @Content(schema = @Schema(implementation = SupplierResponse.class))),
                    @ApiResponse(responseCode = "404", description = "Proveedor no encontrado", content = @Content)
            }
    )
    public ResponseEntity<SupplierResponse> show(@PathVariable UUID uuid) {
        return ResponseEntity.ok(supplierService.show(uuid));
    }

    @PutMapping(path = "/{uuid}", consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Actualizar proveedor",
            description = "Actualiza todos los datos de un proveedor existente.",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    required = true,
                    description = "Datos del proveedor a actualizar",
                    content = @Content(schema = @Schema(implementation = SupplierRequest.class))
            ),
            parameters = {
                    @Parameter(name = "uuid", description = "UUID del proveedor", required = true)
            },
            responses = {
                    @ApiResponse(responseCode = "200", description = "Proveedor actualizado exitosamente",
                            content = @Content(schema = @Schema(implementation = SupplierResponse.class))),
                    @ApiResponse(responseCode = "404", description = "Proveedor no encontrado", content = @Content)
            }
    )
    public ResponseEntity<SupplierResponse> update(@PathVariable UUID uuid,
                                                   @Validated(OnUpdate.class) @RequestBody
                                                   SupplierRequest supplierRequest) {
        return ResponseEntity.ok(supplierService.update(uuid, supplierRequest));
    }

    @PatchMapping(path = "/{uuid}", consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Actualización parcial del proveedor",
            description = "Actualiza parcialmente los datos de un proveedor (por ejemplo, estado).",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    required = true,
                    description = "Datos parciales del proveedor a actualizar",
                    content = @Content(schema = @Schema(implementation = PartialUpdateSupplierRequest.class))
            ),
            parameters = {
                    @Parameter(name = "uuid", description = "UUID del proveedor", required = true)
            },
            responses = {
                    @ApiResponse(responseCode = "200", description = "Proveedor actualizado parcialmente",
                            content = @Content(schema = @Schema(implementation = SupplierResponse.class))),
                    @ApiResponse(responseCode = "404", description = "Proveedor no encontrado", content = @Content)
            }
    )
    public ResponseEntity<SupplierResponse> partialUpdate(@PathVariable UUID uuid,
                                                          @Valid @RequestBody
                                                          PartialUpdateSupplierRequest supplierRequest) {
        return ResponseEntity.ok(supplierService.partialUpdate(uuid, supplierRequest));
    }

    @DeleteMapping(path = "/{uuid}")
    @Operation(
            summary = "Eliminar proveedor",
            description = "Elimina un proveedor existente.",
            parameters = {
                    @Parameter(name = "uuid", description = "UUID del proveedor", required = true)
            },
            responses = {
                    @ApiResponse(responseCode = "204", description = "Proveedor eliminado exitosamente"),
                    @ApiResponse(responseCode = "404", description = "Proveedor no encontrado", content = @Content)
            }
    )
    public ResponseEntity<Void> delete(@PathVariable UUID uuid) {
        supplierService.delete(uuid);
        return ResponseEntity.noContent().build();
    }
}