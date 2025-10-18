package com.gapsi.suppliers_service.integration;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import com.gapsi.suppliers_service.controller.SupplierController;
import com.gapsi.suppliers_service.dto.request.SupplierRequest;
import com.gapsi.suppliers_service.dto.response.SupplierResponse;
import com.gapsi.suppliers_service.model.Status;
import com.gapsi.suppliers_service.service.SupplierService;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest
@TestPropertySource(properties = {
        "app.info.message=Servicio de Proveedores - Modo Prueba",
        "app.info.version=1.0.0-TEST",
        "app.info.author=Equipo de Desarrollo - Pruebas"
})
@DisplayName("Pruebas de integración para SupplierController")
class SupplierControllerIntegrationTest {

    @Autowired
    private SupplierController supplierController;

    @Mock
    private SupplierService supplierService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @DisplayName("Debería manejar endpoint de proveedores")
    void shouldHandleSuppliersEndpoint() {
        // Given
        Page<SupplierResponse> supplierPage = new PageImpl<>(List.of());
        when(supplierService.index(any())).thenReturn(supplierPage);

        // When
        ResponseEntity<Page<SupplierResponse>> response = supplierController.index(PageRequest.of(0, 10));

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
    }

    @Test
    @DisplayName("Debería crear proveedor exitosamente")
    void shouldCreateSupplierSuccessfully() {
        // Given
        SupplierRequest request = SupplierRequest.builder()
                .name("Proveedor Integración")
                .businessName("Empresa Integración S.A.")
                .address("Calle Integración 123")
                .email("integracion@test.com")
                .phone("555-0000")
                .status(Status.ACTIVE)
                .build();

        SupplierResponse response = SupplierResponse.builder()
                .uuid(UUID.randomUUID())
                .name("Proveedor Integración")
                .businessName("Empresa Integración S.A.")
                .address("Calle Integración 123")
                .email("integracion@test.com")
                .phone("555-0000")
                .status(Status.ACTIVE)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        when(supplierService.create(any(SupplierRequest.class))).thenReturn(response);

        // When
        ResponseEntity<SupplierResponse> result = supplierController.create(request);

        // Then
        assertThat(result.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(result.getBody()).isNotNull();
        assertThat(result.getBody().getName()).isEqualTo("Proveedor Integración");
    }
}
