-- Insertar datos de ejemplo en la tabla suppliers

INSERT INTO suppliers (
    uuid,
    name,
    business_name,
    address,
    email,
    phone,
    status,
    created_at,
    updated_at
) VALUES
    (RANDOM_UUID(), 'Distribuidora Central', 'Distribuidora Central S.A.', 'Av. Reforma 123, CDMX', 'contacto@distribuidoracentral.com', '555-123-4567', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (RANDOM_UUID(), 'Ferretería Los Andes', 'Ferretería Los Andes Ltda.', 'Cra 45 #12-34, Bogotá', 'ventas@ferreterialosandes.com', '321-654-9870', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (RANDOM_UUID(), 'Importadora del Norte', 'Importadora del Norte SAC', 'Calle Lima 456, Lima', 'info@importadoranorte.pe', '999-888-777', 'INACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- No es necesario reiniciar el contador, ya que el UUID es generado manualmente.