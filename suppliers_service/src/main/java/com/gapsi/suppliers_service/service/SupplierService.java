package com.gapsi.suppliers_service.service;

import com.gapsi.suppliers_service.dto.request.PartialUpdateSupplierRequest;
import com.gapsi.suppliers_service.dto.request.SupplierRequest;
import com.gapsi.suppliers_service.dto.response.SupplierResponse;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SupplierService {
    Page<SupplierResponse> index(Pageable pageable);

    SupplierResponse create(SupplierRequest request);

    SupplierResponse show(UUID uuid);

    SupplierResponse update(UUID uuid, SupplierRequest request);

    SupplierResponse partialUpdate(UUID uuid, PartialUpdateSupplierRequest request);

    void delete(UUID uuid);

}
