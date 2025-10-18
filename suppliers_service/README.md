# Suppliers Service

Este microservicio gestiona los datos de proveedores (suppliers) dentro de un sistema empresarial.

## Tecnologías utilizadas

- Java 25
- Spring Boot 4.0.0-SNAPSHOT
- Spring Data JPA
- H2 Database (en memoria)
- MapStruct
- Lombok
- JUnit 5 + Jacoco
- Spring WebMVC

## Endpoints

### `GET /api/v1/suppliers/info`

Obtiene información general del servicio.

### `GET /api/v1/suppliers`

Lista paginada de proveedores.

### `GET /api/v1/suppliers/{uuid}`

Obtiene la información de un proveedor por UUID.

### `POST /api/v1/suppliers`

Crea un nuevo proveedor.

### `PUT /api/v1/suppliers/{uuid}`

Actualiza la información completa de un proveedor.

### `PATCH /api/v1/suppliers/{uuid}`

Actualiza la información parcial de un proveedor (ej: estado).

### `DELETE /api/v1/suppliers/{uuid}`

Elimina un proveedor.

## Estructura de DTOs

### `SupplierRequest`

```json
{
  "name": "Distribuidora Central",
  "business_name": "Distribuidora Central S.A.",
  "address": "Av. Reforma 123, CDMX",
  "email": "contacto@distribuidoracentral.com",
  "phone": "555-123-4567",
  "status": "ACTIVE"
}
```

### `SupplierResponse`

```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Distribuidora Central",
  "business_name": "Distribuidora Central S.A.",
  "address": "Av. Reforma 123, CDMX",
  "email": "contacto@distribuidoracentral.com",
  "phone": "555-123-4567",
  "status": "ACTIVE",
  "created_at": "2024-01-15T10:30:00",
  "updated_at": "2024-01-15T10:30:00"
}
```

### `PartialUpdateSupplierRequest`

```json
{
  "status": "INACTIVE"
}
```

## Estados de Proveedor

- **ACTIVE:** Proveedor activo
- **INACTIVE:** Proveedor inactivo

## Base de datos

Los scripts `schema.sql` y `data.sql` están configurados en `application.yml` para inicializar la base de datos H2 en
memoria.

La consola H2 está disponible en: `http://localhost:8080/h2-console`

- JDBC URL: `jdbc:h2:mem:supplier`
- Usuario: `sa`
- Contraseña: *(vacía)*

## Ejemplos de Uso

### Crear un Proveedor

```bash
curl -X POST http://localhost:8080/api/v1/suppliers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Proveedor Ejemplo",
    "business_name": "Empresa Ejemplo S.A.",
    "address": "Calle Principal 123",
    "email": "contacto@ejemplo.com",
    "phone": "555-1234",
    "status": "ACTIVE"
  }'
```

### Obtener Lista Paginada

```bash
curl -X GET "http://localhost:8080/api/v1/suppliers?page=0&size=10&sort=name,asc"
```

### Actualización Parcial (Cambiar Estado)

```bash
curl -X PATCH http://localhost:8080/api/v1/suppliers/{uuid} \
  -H "Content-Type: application/json" \
  -d '{
    "status": "INACTIVE"
  }'
```

## Instalación y Ejecución

### 1. Clonar el Repositorio

```bash
git clone https://github.com/LeandriT/fullstack_gapsi.git
cd suppliers_service
```

### 2. Ejecutar la Aplicación

```bash
# Compilar y ejecutar
./gradlew bootRun

# O compilar primero y luego ejecutar
./gradlew build
java -jar build/libs/suppliers_service-*.jar
```

### 3. Verificar la Aplicación

```bash
# Verificar que la aplicación esté funcionando
curl http://localhost:8080/api/v1/suppliers/info
```

## Pruebas

### Ejecutar Todas las Pruebas

```bash
./gradlew test
```

### Ejecutar Pruebas Específicas

```bash
# Pruebas del servicio
./gradlew test --tests "*SupplierServiceImplTest*"

# Pruebas del controlador
./gradlew test --tests "*SupplierControllerTest*"

# Pruebas de integración
./gradlew test --tests "*SupplierControllerIntegrationTest*"
```

### Generar Reporte de Cobertura

```bash
# Generar reporte JaCoCo
./gradlew jacocoTestReport

# Verificar cobertura mínima (85%)
./gradlew jacocoTestCoverageVerification

# Ver reporte HTML
open build/reports/jacoco/test/html/index.html
```

## Cobertura de pruebas

Jacoco está configurado para verificar una cobertura mínima del 85% en líneas de código de clases clave, excluyendo
DTOs, modelos, validaciones, configuraciones y excepciones.

**Métricas actuales:**

- **Cobertura de Código:** 85%+ (JaCoCo)
- **Pruebas Unitarias:** 17 pruebas para el servicio
- **Pruebas de Integración:** 3 pruebas para el controlador
- **Pruebas de Controlador:** 10 pruebas con MockMvc
- **Total de Pruebas:** 31 pruebas ejecutándose exitosamente

## Manejo de Errores

El servicio incluye manejo centralizado de errores con respuestas HTTP apropiadas:

- **400 Bad Request:** Datos de entrada inválidos
- **404 Not Found:** Proveedor no encontrado
- **500 Internal Server Error:** Errores internos del servidor

### Ejemplo de Respuesta de Error

```json
{
  "message": "No se pudo encontrar el proveedor con el id: 550e8400-e29b-41d4-a716-446655440000",
  "status": 404,
  "timestamp": "2024-01-15T10:30:00",
  "path": "/api/v1/suppliers/550e8400-e29b-41d4-a716-446655440000"
}
```

## Configuración

### Variables de Entorno

- `SERVER_PORT`: Puerto del servidor (default: 8080)
- `SERVLET_CONTEXT_PATH`: Ruta del contexto (default: vacío)
- `TIME_ZONE`: Zona horaria (default: UTC)

### Propiedades de la Aplicación

```yaml
app:
  info:
    message: Bienvenido Candidato 01
    version: 1.0.0
    author: Gandhy Cuasapas
```

## Estructura del Proyecto

```
suppliers_service/
├── src/
│   ├── main/
│   │   ├── java/com/gapsi/suppliers_service/
│   │   │   ├── config/           # Configuraciones
│   │   │   ├── controller/       # Controladores REST
│   │   │   ├── dto/             # Data Transfer Objects
│   │   │   ├── exception/       # Manejo de excepciones
│   │   │   ├── mapper/          # Mappers MapStruct
│   │   │   ├── model/           # Entidades JPA
│   │   │   ├── repository/      # Repositorios Spring Data
│   │   │   └── service/         # Lógica de negocio
│   │   └── resources/
│   │       ├── application.yml  # Configuración de la aplicación
│   │       ├── data.sql         # Datos de ejemplo
│   │       └── schema.sql       # Esquema de base de datos
│   └── test/                    # Pruebas unitarias e integración
├── build.gradle                 # Configuración de Gradle
└── README.md                   # Este archivo
```

## Logging

El servicio utiliza SLF4J con Lombok para logging estructurado:

- **INFO:** Operaciones exitosas
- **WARN:** Situaciones de advertencia (proveedor no encontrado)
- **ERROR:** Errores del sistema

---

Desarrollado por **Gandhy Cuasapas**
