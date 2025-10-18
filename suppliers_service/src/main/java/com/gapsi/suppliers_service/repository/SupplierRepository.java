package com.gapsi.suppliers_service.repository;

import com.gapsi.suppliers_service.model.Supplier;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository Pattern Implementation
 * 
 * Este patrón abstrae el acceso a datos y encapsula la lógica de persistencia.
 * Proporciona una interfaz limpia para operaciones CRUD y consultas específicas.
 * 
 * Beneficios:
 * - Separación de responsabilidades
 * - Facilita testing con mocks
 * - Abstrae la complejidad de JPA/Hibernate
 */
@Repository
public interface SupplierRepository extends JpaRepository<Supplier, UUID> {

    /**
     * Verifica si existe un proveedor con el nombre dado (case insensitive)
     * @param name Nombre del proveedor a verificar
     * @return true si existe, false en caso contrario
     */
    boolean existsByNameIgnoreCase(String name);

    /**
     * Verifica si existe un proveedor con el nombre dado excluyendo el UUID especificado
     * Útil para validaciones en operaciones de actualización
     * @param name Nombre del proveedor a verificar
     * @param uuid UUID a excluir de la búsqueda
     * @return true si existe otro proveedor con ese nombre, false en caso contrario
     */
    boolean existsByNameIgnoreCaseAndUuidNot(String name, UUID uuid);
}
