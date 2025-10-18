package com.gapsi.suppliers_service.service.impl;

import com.gapsi.suppliers_service.dto.request.PartialUpdateSupplierRequest;
import com.gapsi.suppliers_service.dto.request.SupplierRequest;
import com.gapsi.suppliers_service.dto.response.SupplierResponse;
import com.gapsi.suppliers_service.exception.SupplierAlreadyExistsException;
import com.gapsi.suppliers_service.exception.SupplierNotFoundException;
import com.gapsi.suppliers_service.exception.SupplierServiceException;
import com.gapsi.suppliers_service.mapper.SupplierMapper;
import com.gapsi.suppliers_service.repository.SupplierRepository;
import com.gapsi.suppliers_service.service.SupplierService;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Layer Pattern Implementation
 * 
 * Este patrón separa la lógica de negocio del controlador y centraliza
 * las operaciones complejas manteniendo la cohesión del sistema.
 * 
 * Beneficios:
 * - Separación clara de responsabilidades
 * - Lógica de negocio reutilizable
 * - Facilita testing unitario
 * - Manejo centralizado de transacciones
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class SupplierServiceImpl implements SupplierService {
    private final SupplierRepository repository;
    private final SupplierMapper mapper;

    @Override
    @Transactional(readOnly = true)
    public Page<SupplierResponse> index(Pageable pageable) {
        log.info("Obteniendo proveedores - página: {}, tamaño: {}", pageable.getPageNumber(), pageable.getPageSize());
        try {
            var result = repository.findAll(pageable).map(mapper::toResponse);
            log.info("Proveedores obtenidos exitosamente - total: {}", result.getTotalElements());
            return result;
        } catch (Exception ex) {
            log.error("Error al obtener proveedores: {}", ex.getMessage());
            throw new SupplierServiceException("Error al obtener proveedores: " + ex.getMessage(), ex);
        }
    }

    @Override
    @Transactional
    public SupplierResponse create(SupplierRequest request) {
        log.info("Creando proveedor: {}", request.getName());
        try {
            this.validateCreate(request.getName());
            var supplier = mapper.toModel(request);
            repository.save(supplier);
            log.info("Proveedor creado exitosamente - UUID: {}", supplier.getUuid());
            return mapper.toResponse(supplier);
        } catch (SupplierAlreadyExistsException ex) {
            throw ex;
        } catch (Exception ex) {
            log.error("Error al crear proveedor {}: {}", request.getName(), ex.getMessage());
            throw new SupplierServiceException("Error al crear proveedores: " + ex.getMessage(), ex);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public SupplierResponse show(UUID uuid) {
        log.info("Obteniendo proveedor - UUID: {}", uuid);
        try {
            var supplier = repository.findById(uuid)
                    .orElseThrow(() -> new SupplierNotFoundException(uuid));
            log.info("Proveedor encontrado: {}", supplier.getName());
            return mapper.toResponse(supplier);
        } catch (SupplierNotFoundException ex) {
            log.warn("Proveedor no encontrado - UUID: {}", uuid);
            throw ex; // se relanza la excepción específica
        } catch (Exception ex) {
            log.error("Error al obtener proveedor {}: {}", uuid, ex.getMessage());
            throw new SupplierServiceException("Error al mostrar proveedores: " + ex.getMessage(), ex);
        }
    }

    @Override
    @Transactional
    public SupplierResponse update(UUID uuid, SupplierRequest request) {
        log.info("Actualizando proveedor - UUID: {}, nombre: {}", uuid, request.getName());
        try {
            this.validateUpdate(uuid, request.getName());
            var supplier = repository.findById(uuid)
                    .orElseThrow(() -> new SupplierNotFoundException(uuid));
            mapper.updateModel(request, supplier);
            repository.save(supplier);
            log.info("Proveedor actualizado exitosamente - UUID: {}", uuid);
            return mapper.toResponse(supplier);
        } catch (SupplierNotFoundException ex) {
            log.warn("Proveedor no encontrado para actualizar - UUID: {}", uuid);
            throw ex; // se relanza la excepción específica
        } catch (SupplierAlreadyExistsException ex) {
            throw ex;
        } catch (Exception ex) {
            log.error("Error al actualizar proveedor {}: {}", uuid, ex.getMessage());
            throw new SupplierServiceException("Error al actualizar proveedores: " + ex.getMessage(), ex);
        }
    }

    @Override
    @Transactional
    public SupplierResponse partialUpdate(UUID uuid, PartialUpdateSupplierRequest request) {
        log.info("Actualización parcial proveedor - UUID: {}, nuevo status: {}", uuid, request.getStatus());
        try {
            var supplier = repository.findById(uuid)
                    .orElseThrow(() -> new SupplierNotFoundException(uuid));
            supplier.setStatus(request.getStatus());
            repository.save(supplier);
            log.info("Status actualizado exitosamente - UUID: {}, status: {}", uuid, request.getStatus());
            return mapper.toResponse(supplier);
        } catch (SupplierNotFoundException ex) {
            log.warn("Proveedor no encontrado para actualización parcial - UUID: {}", uuid);
            throw ex; // se relanza la excepción específica
        } catch (Exception ex) {
            log.error("Error al actualizar status proveedor {}: {}", uuid, ex.getMessage());
            throw new SupplierServiceException("Error al actualizar parcialmente proveedores: " + ex.getMessage(), ex);
        }
    }

    @Override
    @Transactional
    public void delete(UUID uuid) {
        log.info("Eliminando proveedor - UUID: {}", uuid);
        try {
            var supplier = repository.findById(uuid)
                    .orElseThrow(() -> new SupplierNotFoundException(uuid));
            repository.delete(supplier);
            log.info("Proveedor eliminado exitosamente - UUID: {}, nombre: {}", uuid, supplier.getName());
        } catch (DataAccessException ex) {
            log.error("Error de acceso a datos al eliminar proveedor {}: {}", uuid, ex.getMessage());
            throw new SupplierServiceException("Error de acceso a datos al eliminar el proveedor con id: " + uuid, ex);
        } catch (SupplierNotFoundException ex) {
            log.warn("Proveedor no encontrado para eliminar - UUID: {}", uuid);
            throw ex; // se relanza la excepción específica
        } catch (Exception ex) {
            log.error("Error al eliminar proveedor {}: {}", uuid, ex.getMessage());
            throw new SupplierServiceException("Error al eliminar proveedores: " + ex.getMessage(), ex);
        }
    }

    private void validateCreate(String name) {
        if (repository.existsByNameIgnoreCase(name)) {
            log.warn("Intento de crear proveedor duplicado: {}", name);
            throw new SupplierAlreadyExistsException(
                    name
            );
        }
    }

    private void validateUpdate(UUID uuid, String name) {
        if (repository.existsByNameIgnoreCaseAndUuidNot(name, uuid)) {
            log.warn("Intento de actualizar con nombre duplicado: {}", name);
            throw new SupplierAlreadyExistsException(
                    name
            );
        }
    }
}
