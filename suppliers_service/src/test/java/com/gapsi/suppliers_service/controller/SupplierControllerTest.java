package com.gapsi.suppliers_service.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gapsi.suppliers_service.dto.request.PartialUpdateSupplierRequest;
import com.gapsi.suppliers_service.dto.request.SupplierRequest;
import com.gapsi.suppliers_service.dto.response.SupplierResponse;
import com.gapsi.suppliers_service.exception.GlobalExceptionHandler;
import com.gapsi.suppliers_service.exception.SupplierNotFoundException;
import com.gapsi.suppliers_service.model.Status;
import com.gapsi.suppliers_service.service.SupplierService;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

@ExtendWith(MockitoExtension.class)
@DisplayName("Pruebas unitarias para SupplierController")
class SupplierControllerTest {

    @Mock
    private SupplierService supplierService;

    @InjectMocks
    private SupplierController supplierController;

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        // Inyectar propiedades usando ReflectionTestUtils
        ReflectionTestUtils.setField(supplierController, "message", "Servicio de Proveedores - Modo Prueba");
        ReflectionTestUtils.setField(supplierController, "version", "1.0.0-TEST");
        ReflectionTestUtils.setField(supplierController, "author", "Equipo de Desarrollo - Pruebas");

        mockMvc = MockMvcBuilders.standaloneSetup(supplierController)
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();
        objectMapper = new ObjectMapper();
    }

    private SupplierResponse sampleResponse() {
        UUID testUuid = UUID.randomUUID();
        SupplierResponse response = new SupplierResponse();
        response.setUuid(testUuid);
        response.setName("Proveedor Test");
        response.setBusinessName("Empresa Test S.A.");
        response.setAddress("Calle Test 123");
        response.setEmail("test@test.com");
        response.setPhone("555-1234");
        response.setStatus(Status.ACTIVE);
        response.setCreatedAt(LocalDateTime.now());
        response.setUpdatedAt(LocalDateTime.now());
        return response;
    }

    private SupplierRequest validCreateRequest() {
        SupplierRequest request = new SupplierRequest();
        request.setName("Proveedor Test");
        request.setBusinessName("Empresa Test S.A.");
        request.setAddress("Calle Test 123");
        request.setEmail("test@test.com");
        request.setPhone("555-1234");
        request.setStatus(Status.ACTIVE);
        return request;
    }

    @Test
    @DisplayName("GET /api/v1/suppliers/info -> 200 con información de la aplicación")
    void info_ok() throws Exception {
        mockMvc.perform(get("/api/v1/suppliers/info"))
                .andExpect(status().isOk());
    }

    // @Test
    @DisplayName("GET /api/v1/suppliers -> 200 con página de proveedores")
    void index_ok() throws Exception {
        when(supplierService.index(any()))
                .thenReturn(new PageImpl<>(List.of(sampleResponse()), PageRequest.of(0, 20), 1));

        mockMvc.perform(get("/api/v1/suppliers"))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("GET /api/v1/suppliers/{uuid} -> 200 cuando existe")
    void show_ok() throws Exception {
        UUID testUuid = UUID.randomUUID();
        when(supplierService.show(testUuid)).thenReturn(sampleResponse());

        mockMvc.perform(get("/api/v1/suppliers/{uuid}", testUuid))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("GET /api/v1/suppliers/{uuid} -> 404 cuando no existe")
    void show_notFound() throws Exception {
        UUID testUuid = UUID.randomUUID();
        when(supplierService.show(testUuid))
                .thenThrow(new SupplierNotFoundException(testUuid));

        mockMvc.perform(get("/api/v1/suppliers/{uuid}", testUuid))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("POST /api/v1/suppliers -> 201 con body correcto")
    void create_ok() throws Exception {
        SupplierRequest req = validCreateRequest();
        SupplierResponse res = sampleResponse();

        when(supplierService.create(any(SupplierRequest.class))).thenReturn(res);

        mockMvc.perform(post("/api/v1/suppliers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated());
    }

    @Test
    @DisplayName("POST /api/v1/suppliers -> 400 por validación")
    void create_validationError() throws Exception {
        SupplierRequest bad = validCreateRequest();
        bad.setName(""); // Nombre vacío

        mockMvc.perform(post("/api/v1/suppliers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(bad)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("PUT /api/v1/suppliers/{uuid} -> 200 cuando actualiza")
    void update_ok() throws Exception {
        UUID testUuid = UUID.randomUUID();
        SupplierRequest req = validCreateRequest();
        SupplierResponse res = sampleResponse();
        res.setName("Proveedor Actualizado");

        when(supplierService.update(eq(testUuid), any(SupplierRequest.class))).thenReturn(res);

        mockMvc.perform(put("/api/v1/suppliers/{uuid}", testUuid)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("PUT /api/v1/suppliers/{uuid} -> 404 si no existe")
    void update_notFound() throws Exception {
        UUID testUuid = UUID.randomUUID();
        when(supplierService.update(eq(testUuid), any(SupplierRequest.class)))
                .thenThrow(new SupplierNotFoundException(testUuid));

        mockMvc.perform(put("/api/v1/suppliers/{uuid}", testUuid)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validCreateRequest())))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("PATCH /api/v1/suppliers/{uuid} -> 200 cuando actualiza parcialmente")
    void patch_ok() throws Exception {
        UUID testUuid = UUID.randomUUID();
        PartialUpdateSupplierRequest patch = new PartialUpdateSupplierRequest();
        patch.setStatus(Status.INACTIVE);
        SupplierResponse res = sampleResponse();
        res.setStatus(Status.INACTIVE);

        when(supplierService.partialUpdate(eq(testUuid), any(PartialUpdateSupplierRequest.class)))
                .thenReturn(res);

        mockMvc.perform(patch("/api/v1/suppliers/{uuid}", testUuid)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(patch)))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("DELETE /api/v1/suppliers/{uuid} -> 204")
    void delete_ok() throws Exception {
        UUID testUuid = UUID.randomUUID();

        mockMvc.perform(delete("/api/v1/suppliers/{uuid}", testUuid))
                .andExpect(status().isNoContent());
    }

    @Test
    @DisplayName("DELETE /api/v1/suppliers/{uuid} -> 404 cuando no existe")
    void delete_notFound() throws Exception {
        UUID testUuid = UUID.randomUUID();
        doThrow(new SupplierNotFoundException(testUuid))
                .when(supplierService).delete(testUuid);

        mockMvc.perform(delete("/api/v1/suppliers/{uuid}", testUuid))
                .andExpect(status().isNotFound());
    }
}
