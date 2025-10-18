-- ======================================
-- Drop prev tables (útil para H2 en memoria durante el desarrollo)
-- ======================================
DROP TABLE IF EXISTS suppliers;

-- ======================================
-- SUPPLIERS
-- ======================================
CREATE TABLE suppliers (
  uuid CHAR(36) PRIMARY KEY,
  name VARCHAR(150) NOT NULL,               -- Nombre del proveedor
  business_name VARCHAR(200) NOT NULL,      -- Razón social
  address VARCHAR(255) NOT NULL,            -- Dirección
  email VARCHAR(150),                       -- (Opcional) Correo de contacto
  phone VARCHAR(30),                        -- (Opcional) Teléfono de contacto
  status VARCHAR(8) NOT NULL DEFAULT 'ACTIVE',  -- Estado del proveedor
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Evita proveedores duplicados por nombre
ALTER TABLE suppliers
  ADD CONSTRAINT uk_suppliers_name UNIQUE (name);

-- Índices útiles para búsquedas
CREATE INDEX idx_suppliers_name ON suppliers(name);
CREATE INDEX idx_suppliers_business_name ON suppliers(business_name);