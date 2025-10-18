package com.gapsi.suppliers_service.service.impl;

import com.gapsi.suppliers_service.dto.request.PartialUpdateSupplierRequest;
import com.gapsi.suppliers_service.dto.request.SupplierRequest;
import com.gapsi.suppliers_service.dto.response.SupplierResponse;
import com.gapsi.suppliers_service.exception.SupplierNotFoundException;
import com.gapsi.suppliers_service.exception.SupplierServiceException;
import com.gapsi.suppliers_service.mapper.SupplierMapper;
import com.gapsi.suppliers_service.model.Status;
import com.gapsi.suppliers_service.model.Supplier;
import com.gapsi.suppliers_service.repository.SupplierRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Pruebas unitarias para SupplierServiceImpl")
class SupplierServiceImplTest {

    @Mock
    private SupplierRepository repository;

    @Mock
    private SupplierMapper mapper;

    @InjectMocks
    private SupplierServiceImpl supplierService;

    private SupplierRequest supplierRequest;
    private Supplier supplier;
    private SupplierResponse supplierResponse;
    private UUID testUuid;

    @BeforeEach
    void setUp() {
        testUuid = UUID.randomUUID();

        supplierRequest = SupplierRequest.builder()
                .name("Proveedor Test")
                .businessName("Empresa Test S.A.")
                .address("Calle Test 123")
                .email("test@test.com")
                .phone("555-1234")
                .status(Status.ACTIVE)
                .build();

        supplier = Supplier.builder()
                .uuid(testUuid)
                .name("Proveedor Test")
                .businessName("Empresa Test S.A.")
                .address("Calle Test 123")
                .email("test@test.com")
                .phone("555-1234")
                .status(Status.ACTIVE)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        supplierResponse = SupplierResponse.builder()
                .uuid(testUuid)
                .name("Proveedor Test")
                .businessName("Empresa Test S.A.")
                .address("Calle Test 123")
                .email("test@test.com")
                .phone("555-1234")
                .status(Status.ACTIVE)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
    }

    @Test
    @DisplayName("Debería obtener lista paginada de proveedores exitosamente")
    void shouldGetPaginatedSuppliersSuccessfully() {
        // Given
        Pageable pageable = PageRequest.of(0, 10);
        Page<Supplier> supplierPage = new PageImpl<>(List.of(supplier));
        Page<SupplierResponse> responsePage = new PageImpl<>(List.of(supplierResponse));

        when(repository.findAll(pageable)).thenReturn(supplierPage);
        when(mapper.toResponse(supplier)).thenReturn(supplierResponse);

        // When
        Page<SupplierResponse> result = supplierService.index(pageable);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getContent()).hasSize(1);
        assertThat(result.getContent().get(0).getName()).isEqualTo("Proveedor Test");

        verify(repository).findAll(pageable);
        verify(mapper).toResponse(supplier);
    }

    @Test
    @DisplayName("Debería crear proveedor exitosamente")
    void shouldCreateSupplierSuccessfully() {
        // Given
        when(repository.existsByNameIgnoreCase(supplierRequest.getName())).thenReturn(false);
        when(mapper.toModel(supplierRequest)).thenReturn(supplier);
        when(repository.save(supplier)).thenReturn(supplier);
        when(mapper.toResponse(supplier)).thenReturn(supplierResponse);

        // When
        SupplierResponse result = supplierService.create(supplierRequest);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getName()).isEqualTo("Proveedor Test");
        assertThat(result.getUuid()).isEqualTo(testUuid);

        verify(repository).existsByNameIgnoreCase(supplierRequest.getName());
        verify(mapper).toModel(supplierRequest);
        verify(repository).save(supplier);
        verify(mapper).toResponse(supplier);
    }

    @Test
    @DisplayName("Debería obtener proveedor por UUID exitosamente")
    void shouldGetSupplierByUuidSuccessfully() {
        // Given
        when(repository.findById(testUuid)).thenReturn(Optional.of(supplier));
        when(mapper.toResponse(supplier)).thenReturn(supplierResponse);

        // When
        SupplierResponse result = supplierService.show(testUuid);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getName()).isEqualTo("Proveedor Test");
        assertThat(result.getUuid()).isEqualTo(testUuid);

        verify(repository).findById(testUuid);
        verify(mapper).toResponse(supplier);
    }

    @Test
    @DisplayName("Debería lanzar SupplierNotFoundException cuando proveedor no existe")
    void shouldThrowSupplierNotFoundExceptionWhenSupplierNotFound() {
        // Given
        when(repository.findById(testUuid)).thenReturn(Optional.empty());

        // When & Then
        assertThatThrownBy(() -> supplierService.show(testUuid))
                .isInstanceOf(SupplierNotFoundException.class)
                .hasMessageContaining(testUuid.toString());

        verify(repository).findById(testUuid);
        verify(mapper, never()).toResponse(any());
    }

    @Test
    @DisplayName("Debería actualizar proveedor exitosamente")
    void shouldUpdateSupplierSuccessfully() {
        // Given
        SupplierRequest updateRequest = SupplierRequest.builder()
                .name("Proveedor Actualizado")
                .businessName("Empresa Actualizada S.A.")
                .address("Calle Actualizada 456")
                .email("actualizado@test.com")
                .phone("555-5678")
                .status(Status.ACTIVE)
                .build();

        when(repository.existsByNameIgnoreCaseAndUuidNot(updateRequest.getName(), testUuid)).thenReturn(false);
        when(repository.findById(testUuid)).thenReturn(Optional.of(supplier));
        when(repository.save(supplier)).thenReturn(supplier);
        when(mapper.toResponse(supplier)).thenReturn(supplierResponse);

        // When
        SupplierResponse result = supplierService.update(testUuid, updateRequest);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getName()).isEqualTo("Proveedor Test");

        verify(repository).existsByNameIgnoreCaseAndUuidNot(updateRequest.getName(), testUuid);
        verify(repository).findById(testUuid);
        verify(mapper).updateModel(updateRequest, supplier);
        verify(repository).save(supplier);
        verify(mapper).toResponse(supplier);
    }

    @Test
    @DisplayName("Debería actualizar parcialmente proveedor exitosamente")
    void shouldPartialUpdateSupplierSuccessfully() {
        // Given
        PartialUpdateSupplierRequest partialRequest = PartialUpdateSupplierRequest.builder()
                .status(Status.INACTIVE)
                .build();

        when(repository.findById(testUuid)).thenReturn(Optional.of(supplier));
        when(repository.save(supplier)).thenReturn(supplier);
        when(mapper.toResponse(supplier)).thenReturn(supplierResponse);

        // When
        SupplierResponse result = supplierService.partialUpdate(testUuid, partialRequest);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getName()).isEqualTo("Proveedor Test");

        verify(repository).findById(testUuid);
        verify(repository).save(supplier);
        verify(mapper).toResponse(supplier);
    }

    @Test
    @DisplayName("Debería eliminar proveedor exitosamente")
    void shouldDeleteSupplierSuccessfully() {
        // Given
        when(repository.findById(testUuid)).thenReturn(Optional.of(supplier));

        // When
        supplierService.delete(testUuid);

        // Then
        verify(repository).findById(testUuid);
        verify(repository).delete(supplier);
    }

    @Test
    @DisplayName("Debería lanzar SupplierServiceException cuando hay error en repositorio")
    void shouldThrowSupplierServiceExceptionWhenRepositoryError() {
        // Given
        when(repository.findAll(any(Pageable.class)))
                .thenThrow(new RuntimeException("Error de base de datos"));

        // When & Then
        assertThatThrownBy(() -> supplierService.index(PageRequest.of(0, 10)))
                .isInstanceOf(SupplierServiceException.class)
                .hasMessageContaining("Error al obtener proveedores");

        verify(repository).findAll(any(Pageable.class));
    }

    @Test
    @DisplayName("Debería manejar error al crear proveedor")
    void shouldHandleErrorWhenCreatingSupplier() {
        // Given
        when(mapper.toModel(supplierRequest)).thenReturn(supplier);
        when(repository.save(supplier)).thenThrow(new RuntimeException("Error de base de datos"));

        // When & Then
        assertThatThrownBy(() -> supplierService.create(supplierRequest))
                .isInstanceOf(SupplierServiceException.class)
                .hasMessageContaining("Error al crear proveedores");

        verify(mapper).toModel(supplierRequest);
        verify(repository).save(supplier);
        verify(mapper, never()).toResponse(any());
    }

    @Test
    @DisplayName("Debería lanzar SupplierServiceException cuando se intenta crear proveedor con nombre duplicado")
    void shouldThrowSupplierServiceExceptionWhenCreatingDuplicateSupplier() {
        // Given
        when(repository.existsByNameIgnoreCase(supplierRequest.getName())).thenReturn(true);

        // When & Then
        assertThatThrownBy(() -> supplierService.create(supplierRequest))
                .isInstanceOf(SupplierServiceException.class)
                .hasMessageContaining("Ya existe un proveedor con el nombre: " + supplierRequest.getName());

        verify(repository).existsByNameIgnoreCase(supplierRequest.getName());
        verify(mapper, never()).toModel(any());
        verify(repository, never()).save(any());
        verify(mapper, never()).toResponse(any());
    }

    @Test
    @DisplayName("Debería lanzar SupplierNotFoundException al actualizar proveedor inexistente")
    void shouldThrowSupplierNotFoundExceptionWhenUpdatingNonExistentSupplier() {
        // Given
        SupplierRequest updateRequest = SupplierRequest.builder()
                .name("Proveedor Actualizado")
                .businessName("Empresa Actualizada S.A.")
                .address("Calle Actualizada 456")
                .email("actualizado@test.com")
                .phone("555-5678")
                .status(Status.ACTIVE)
                .build();

        when(repository.findById(testUuid)).thenReturn(Optional.empty());

        // When & Then
        assertThatThrownBy(() -> supplierService.update(testUuid, updateRequest))
                .isInstanceOf(SupplierNotFoundException.class)
                .hasMessageContaining(testUuid.toString());

        verify(repository).findById(testUuid);
        verify(mapper, never()).updateModel(any(), any());
        verify(repository, never()).save(any());
        verify(mapper, never()).toResponse(any());
    }

    @Test
    @DisplayName("Debería lanzar SupplierServiceException cuando se intenta actualizar con nombre duplicado")
    void shouldThrowSupplierServiceExceptionWhenUpdatingWithDuplicateName() {
        // Given
        SupplierRequest updateRequest = SupplierRequest.builder()
                .name("Proveedor Duplicado")
                .businessName("Empresa Duplicada S.A.")
                .address("Calle Duplicada 456")
                .email("duplicado@test.com")
                .phone("555-5678")
                .status(Status.ACTIVE)
                .build();

        when(repository.existsByNameIgnoreCaseAndUuidNot(updateRequest.getName(), testUuid)).thenReturn(true);

        // When & Then
        assertThatThrownBy(() -> supplierService.update(testUuid, updateRequest))
                .isInstanceOf(SupplierServiceException.class)
                .hasMessageContaining("Ya existe otro proveedor con el nombre: " + updateRequest.getName());

        verify(repository).existsByNameIgnoreCaseAndUuidNot(updateRequest.getName(), testUuid);
        verify(repository, never()).findById(any());
        verify(mapper, never()).updateModel(any(), any());
        verify(repository, never()).save(any());
        verify(mapper, never()).toResponse(any());
    }

    @Test
    @DisplayName("Debería manejar error al actualizar proveedor")
    void shouldHandleErrorWhenUpdatingSupplier() {
        // Given
        SupplierRequest updateRequest = SupplierRequest.builder()
                .name("Proveedor Actualizado")
                .businessName("Empresa Actualizada S.A.")
                .address("Calle Actualizada 456")
                .email("actualizado@test.com")
                .phone("555-5678")
                .status(Status.ACTIVE)
                .build();

        when(repository.findById(testUuid)).thenReturn(Optional.of(supplier));
        when(repository.save(supplier)).thenThrow(new RuntimeException("Error de base de datos"));

        // When & Then
        assertThatThrownBy(() -> supplierService.update(testUuid, updateRequest))
                .isInstanceOf(SupplierServiceException.class)
                .hasMessageContaining("Error al actualizar proveedores");

        verify(repository).findById(testUuid);
        verify(mapper).updateModel(updateRequest, supplier);
        verify(repository).save(supplier);
        verify(mapper, never()).toResponse(any());
    }

    @Test
    @DisplayName("Debería lanzar SupplierNotFoundException al actualizar parcialmente proveedor inexistente")
    void shouldThrowSupplierNotFoundExceptionWhenPartialUpdatingNonExistentSupplier() {
        // Given
        PartialUpdateSupplierRequest partialRequest = PartialUpdateSupplierRequest.builder()
                .status(Status.INACTIVE)
                .build();

        when(repository.findById(testUuid)).thenReturn(Optional.empty());

        // When & Then
        assertThatThrownBy(() -> supplierService.partialUpdate(testUuid, partialRequest))
                .isInstanceOf(SupplierNotFoundException.class)
                .hasMessageContaining(testUuid.toString());

        verify(repository).findById(testUuid);
        verify(repository, never()).save(any());
        verify(mapper, never()).toResponse(any());
    }

    @Test
    @DisplayName("Debería manejar error al actualizar parcialmente proveedor")
    void shouldHandleErrorWhenPartialUpdatingSupplier() {
        // Given
        PartialUpdateSupplierRequest partialRequest = PartialUpdateSupplierRequest.builder()
                .status(Status.INACTIVE)
                .build();

        when(repository.findById(testUuid)).thenReturn(Optional.of(supplier));
        when(repository.save(supplier)).thenThrow(new RuntimeException("Error de base de datos"));

        // When & Then
        assertThatThrownBy(() -> supplierService.partialUpdate(testUuid, partialRequest))
                .isInstanceOf(SupplierServiceException.class)
                .hasMessageContaining("Error al actualizar parcialmente proveedores");

        verify(repository).findById(testUuid);
        verify(repository).save(supplier);
        verify(mapper, never()).toResponse(any());
    }

    @Test
    @DisplayName("Debería lanzar SupplierNotFoundException al eliminar proveedor inexistente")
    void shouldThrowSupplierNotFoundExceptionWhenDeletingNonExistentSupplier() {
        // Given
        when(repository.findById(testUuid)).thenReturn(Optional.empty());

        // When & Then
        assertThatThrownBy(() -> supplierService.delete(testUuid))
                .isInstanceOf(SupplierNotFoundException.class)
                .hasMessageContaining(testUuid.toString());

        verify(repository).findById(testUuid);
        verify(repository, never()).delete(any());
    }

    @Test
    @DisplayName("Debería manejar DataAccessException al eliminar proveedor")
    void shouldHandleDataAccessExceptionWhenDeletingSupplier() {
        // Given
        when(repository.findById(testUuid)).thenReturn(Optional.of(supplier));
        doThrow(new org.springframework.dao.DataAccessException("Error de acceso a datos") {
        })
                .when(repository).delete(supplier);

        // When & Then
        assertThatThrownBy(() -> supplierService.delete(testUuid))
                .isInstanceOf(SupplierServiceException.class)
                .hasMessageContaining("Error de acceso a datos al eliminar el proveedor con id");

        verify(repository).findById(testUuid);
        verify(repository).delete(supplier);
    }

    @Test
    @DisplayName("Debería manejar error genérico al eliminar proveedor")
    void shouldHandleGenericErrorWhenDeletingSupplier() {
        // Given
        when(repository.findById(testUuid)).thenReturn(Optional.of(supplier));
        doThrow(new RuntimeException("Error genérico"))
                .when(repository).delete(supplier);

        // When & Then
        assertThatThrownBy(() -> supplierService.delete(testUuid))
                .isInstanceOf(SupplierServiceException.class)
                .hasMessageContaining("Error al eliminar proveedores");

        verify(repository).findById(testUuid);
        verify(repository).delete(supplier);
    }

    @Test
    @DisplayName("Debería manejar error al obtener proveedor por UUID")
    void shouldHandleErrorWhenGettingSupplierByUuid() {
        // Given
        when(repository.findById(testUuid)).thenThrow(new RuntimeException("Error de base de datos"));

        // When & Then
        assertThatThrownBy(() -> supplierService.show(testUuid))
                .isInstanceOf(SupplierServiceException.class)
                .hasMessageContaining("Error al mostrar proveedores");

        verify(repository).findById(testUuid);
        verify(mapper, never()).toResponse(any());
    }
}
