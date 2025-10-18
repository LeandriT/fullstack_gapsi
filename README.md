# 🏢 Fullstack Gapsi - Sistema de Gestión de Proveedores

Un sistema completo de gestión de proveedores desarrollado con tecnologías modernas, incluyendo backend Spring Boot y dos frontends (Angular y React) para demostrar diferentes enfoques de desarrollo.

## 📋 Tabla de Contenidos

- [🎯 Descripción General](#-descripción-general)
- [🏗️ Arquitectura del Sistema](#️-arquitectura-del-sistema)
- [🛠️ Tecnologías Utilizadas](#️-tecnologías-utilizadas)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [🚀 Instalación y Configuración](#-instalación-y-configuración)
- [🌐 Endpoints de la API](#-endpoints-de-la-api)
- [📱 Características de los Frontends](#-características-de-los-frontends)
- [🧪 Testing](#-testing)
- [📊 Cobertura de Código](#-cobertura-de-código)
- [🔧 Comandos Útiles](#-comandos-útiles)
- [🐛 Troubleshooting](#-troubleshooting)
- [📈 Próximas Mejoras](#-próximas-mejoras)

## 🎯 Descripción General

Este proyecto implementa un sistema completo de gestión de proveedores que incluye:

- **Backend REST API** con Spring Boot 4.0.0-SNAPSHOT
- **Base de datos H2** en memoria para desarrollo
- **Frontend Angular 17+** con Material Design
- **Frontend React 18+** con Material UI
- **Scroll infinito** y paginación optimizada
- **Manejo de errores** centralizado
- **Validaciones** robustas
- **Testing** completo con cobertura >85%

## 🏗️ Arquitectura del Sistema

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Frontend       │    │   Backend       │
│   Angular 17+   │    │   React 18+      │    │   Spring Boot   │
│                 │    │                 │    │   4.0.0-SNAPSHOT │
│ • Material UI   │    │ • Material UI   │    │                 │
│ • Routing       │    │ • React Router  │    │ • REST API      │
│ • Forms         │    │ • React Hook    │    │ • JPA/Hibernate │
│ • Services      │    │   Form + Zod    │    │ • H2 Database   │
│ • Components    │    │ • Components    │    │ • MapStruct     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Base de       │
                    │   Datos H2      │
                    │   (In-Memory)   │
                    └─────────────────┘
```

## 🛠️ Tecnologías Utilizadas

### Backend (Spring Boot)
- **Java 25** con Spring Boot 4.0.0-SNAPSHOT
- **Spring Web MVC** para REST API
- **Spring Data JPA** con Hibernate 7.1.4.Final
- **H2 Database** en memoria
- **MapStruct** para mapeo de DTOs
- **Lombok** para reducir boilerplate
- **Gradle** como build tool
- **JUnit 5** y **Mockito** para testing
- **JaCoCo** para cobertura de código

### Frontend Angular
- **Angular 17+** con TypeScript
- **Angular Material** para componentes UI
- **Angular Router** para navegación
- **RxJS** para programación reactiva
- **Angular Forms** (Reactive Forms)
- **Angular CLI** para desarrollo

### Frontend React
- **React 18+** con TypeScript
- **Vite** como build tool
- **Material UI (MUI)** para componentes
- **React Router v6** para navegación
- **React Hook Form + Zod** para formularios
- **Axios** para HTTP requests
- **Notistack** para notificaciones
- **React Query** para gestión de estado

## 🏗️ Patrones de Diseño Implementados

### Backend (Spring Boot)

#### 1. **Repository Pattern** 📁
```java
// suppliers_service/src/main/java/com/gapsi/suppliers_service/repository/SupplierRepository.java
@Repository
public interface SupplierRepository extends JpaRepository<Supplier, UUID> {
    // Patrón Repository: Abstrae el acceso a datos
    // Encapsula la lógica de persistencia y proporciona una interfaz limpia
    boolean existsByNameIgnoreCase(String name);
    boolean existsByNameIgnoreCaseAndUuidNot(String name, UUID uuid);
}
```

#### 2. **Service Layer Pattern** ⚙️
```java
// suppliers_service/src/main/java/com/gapsi/suppliers_service/service/impl/SupplierServiceImpl.java
@Service
@Transactional
public class SupplierServiceImpl implements SupplierService {
    // Patrón Service Layer: Separa la lógica de negocio del controlador
    // Centraliza operaciones complejas y mantiene la cohesión
    private final SupplierRepository repository;
    private final SupplierMapper mapper;
    
    @Override
    public SupplierResponse create(SupplierRequest request) {
        // Lógica de negocio encapsulada en el servicio
        validateCreate(request);
        var supplier = mapper.toModel(request);
        repository.save(supplier);
        return mapper.toResponse(supplier);
    }
}
```

### Frontend Angular

#### 1. **Service Pattern** 🔧
```typescript
// suppliers_angular/src/app/features/suppliers/services/supplier.ts
@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  // Patrón Service: Centraliza la lógica de comunicación con APIs
  // Proporciona una interfaz consistente para operaciones HTTP
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  getSuppliers(page: number = 0, size: number = 10): Observable<PageResponse<SupplierResponse>> {
    // Encapsula la lógica de peticiones HTTP y manejo de errores
    return this.http.get<PageResponse<SupplierResponse>>(`${this.apiUrl}/suppliers`, {
      params: { page: page.toString(), size: size.toString() }
    }).pipe(
      catchError(error => this.errorHandler.handleError(error))
    );
  }
}
```

#### 2. **Observer Pattern con RxJS** 👁️
```typescript
// suppliers_angular/src/app/features/suppliers/pages/supplier-list/supplier-list.ts
export class SupplierList implements OnInit {
  // Patrón Observer: Implementado con RxJS para programación reactiva
  // Permite suscribirse a cambios de estado y reaccionar automáticamente
  ngOnInit(): void {
    // Observable que emite cambios en la paginación
    this.loadSuppliers();
    
    // Suscripción reactiva a cambios de datos
    this.supplierService.getSuppliers(this.page, this.size)
      .pipe(
        tap(response => this.pageResponse = response),
        catchError(error => this.handleError(error))
      )
      .subscribe();
  }
}
```

### Frontend React

#### 1. **Custom Hooks Pattern** 🎣
```typescript
// suppliers_react/src/core/hooks/useErrorHandler.ts
export const useErrorHandler = () => {
  // Patrón Custom Hook: Encapsula lógica reutilizable de manejo de errores
  // Proporciona una interfaz consistente para notificaciones y errores
  const { enqueueSnackbar } = useSnackbar();

  const handleError = (
    error: AxiosError,
    defaultMessage: string = 'Ocurrió un error inesperado.',
    options?: HandleErrorOptions
  ) => {
    // Lógica centralizada de manejo de errores
    const message = ErrorHandlerService.extractErrorMessage(error, defaultMessage);
    enqueueSnackbar(message, { variant: 'error' });
  };

  return { handleError, handleSuccess, handleInfo, handleWarning };
};
```

#### 2. **Compound Component Pattern** 🧩
```typescript
// suppliers_react/src/features/suppliers/components/VirtualSupplierList.tsx
export default function VirtualSupplierList({
  onEdit,
  onToggleStatus,
  onDelete,
}: VirtualSupplierListProps) {
  // Patrón Compound Component: Componente compuesto que maneja múltiples responsabilidades
  // Combina lista virtual, scroll infinito y acciones en una interfaz cohesiva
  
  // Componente interno que maneja el scroll infinito
  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    if (scrollHeight - scrollTop - clientHeight < threshold) {
      loadMoreData(); // Carga automática de más datos
    }
  }, [loadMoreData]);

  return (
    <Box>
      {/* Header compuesto con título y contador */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4">Lista Virtual de Proveedores</Typography>
        <Typography>{suppliers.length} proveedores cargados</Typography>
      </Box>
      
      {/* Lista virtual con scroll infinito */}
      <Box onScroll={handleScroll}>
        <List>
          {suppliers.map((supplier) => (
            <ListItem key={supplier.uuid}>
              {/* Contenido del item con acciones */}
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}
```

## 📁 Estructura del Proyecto

```
fullstack_gapsi/
├── suppliers_service/                 # Backend Spring Boot
│   ├── src/main/java/com/gapsi/
│   │   └── suppliers_service/
│   │       ├── config/               # Configuraciones
│   │       ├── controller/           # Controladores REST
│   │       ├── dto/                  # Data Transfer Objects
│   │       ├── exception/            # Manejo de excepciones
│   │       ├── mapper/               # MapStruct mappers
│   │       ├── model/                # Entidades JPA
│   │       ├── repository/           # Repositorios JPA
│   │       └── service/              # Lógica de negocio
│   ├── src/main/resources/
│   │   ├── application.yml           # Configuración
│   │   ├── schema.sql               # Esquema de BD
│   │   └── data.sql                 # Datos iniciales
│   ├── src/test/                    # Tests unitarios e integración
│   └── build.gradle                 # Dependencias Gradle
│
├── suppliers_angular/               # Frontend Angular
│   ├── src/app/
│   │   ├── core/                    # Servicios y modelos
│   │   ├── features/                # Módulos de funcionalidades
│   │   │   ├── welcome/             # Página de bienvenida
│   │   │   └── suppliers/           # Gestión de proveedores
│   │   ├── layout/                  # Layout principal
│   │   └── shared/                  # Componentes compartidos
│   └── package.json
│
├── suppliers_react/                 # Frontend React
│   ├── src/
│   │   ├── core/                    # Servicios, modelos y hooks
│   │   ├── features/                # Componentes de funcionalidades
│   │   │   ├── welcome/             # Página de bienvenida
│   │   │   └── suppliers/           # Gestión de proveedores
│   │   ├── layout/                  # Layout principal
│   │   └── config/                  # Configuraciones
│   └── package.json
│
└── resources/                       # Recursos compartidos
    ├── logo.png                     # Logo de la aplicación
    └── icon.png                     # Icono de la aplicación
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- **Java 25** o superior
- **Node.js 18+** y **npm**
- **Git**

### 1. Clonar el Repositorio

```bash
git clone https://github.com/LeandriT/fullstack_gapsi.git
cd fullstack_gapsi
```

### 2. Backend (Spring Boot)

```bash
# Navegar al directorio del backend
cd suppliers_service

# Ejecutar la aplicación
./gradlew bootRun

# O en Windows
gradlew.bat bootRun
```

**El backend estará disponible en:** `http://localhost:8080`

**Consola H2:** `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:testdb`
- Usuario: `sa`
- Contraseña: (vacía)

### 3. Frontend Angular

```bash
# Navegar al directorio de Angular
cd suppliers_angular

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
ng serve

# O con puerto específico
ng serve --port 4200
```

**El frontend Angular estará disponible en:** `http://localhost:4200`

### 4. Frontend React

```bash
# Navegar al directorio de React
cd suppliers_react

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# O con puerto específico
npm run dev -- --port 5173
```

**El frontend React estará disponible en:** `http://localhost:5173`

## 🌐 Endpoints de la API

### Base URL: `http://localhost:8080/api/v1`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/suppliers/info` | Información de versión |
| `GET` | `/suppliers` | Listar proveedores (paginado) |
| `GET` | `/suppliers/{uuid}` | Obtener proveedor por ID |
| `POST` | `/suppliers` | Crear nuevo proveedor |
| `PUT` | `/suppliers/{uuid}` | Actualizar proveedor |
| `PATCH` | `/suppliers/{uuid}` | Actualización parcial |
| `DELETE` | `/suppliers/{uuid}` | Eliminar proveedor |

### Parámetros de Paginación

- `page`: Número de página (0-based)
- `size`: Tamaño de página (default: 10)

### Ejemplo de Request/Response

**POST /suppliers**
```json
{
  "name": "Proveedor Ejemplo",
  "business_name": "Proveedor Ejemplo S.A.",
  "address": "Calle Principal 123",
  "email": "contacto@proveedor.com",
  "phone": "555-0123",
  "status": "ACTIVE"
}
```

**Response**
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Proveedor Ejemplo",
  "business_name": "Proveedor Ejemplo S.A.",
  "address": "Calle Principal 123",
  "email": "contacto@proveedor.com",
  "phone": "555-0123",
  "status": "ACTIVE",
  "created_at": "2025-01-18T10:30:00Z",
  "updated_at": "2025-01-18T10:30:00Z"
}
```

## 📱 Características de los Frontends

### Angular Frontend
- ✅ **Página de bienvenida** con información de versión
- ✅ **Lista paginada** de proveedores con Material Table
- ✅ **Formulario reactivo** para crear/editar proveedores
- ✅ **Validaciones** en tiempo real
- ✅ **Manejo de errores** centralizado
- ✅ **Navegación** con Angular Router
- ✅ **Internacionalización** en español
- ✅ **Responsive design**

### React Frontend
- ✅ **Página de bienvenida** con información de versión
- ✅ **Lista paginada** tradicional de proveedores
- ✅ **Lista virtual** con scroll infinito (10 en 10)
- ✅ **Formularios** con React Hook Form + Zod
- ✅ **Notificaciones** con Notistack
- ✅ **Manejo de estado** con React Query
- ✅ **Navegación** con React Router
- ✅ **Diseño moderno** con Material UI

## 🧪 Testing

### Backend Testing

```bash
cd suppliers_service

# Ejecutar todos los tests
./gradlew test

# Ejecutar tests con cobertura
./gradlew jacocoTestReport

# Verificar cobertura mínima (85%)
./gradlew jacocoTestCoverageVerification
```

**Cobertura mínima requerida:** 85% de líneas cubiertas

### Frontend Testing

#### Angular
```bash
cd suppliers_angular

# Ejecutar tests unitarios
ng test

# Ejecutar tests e2e
ng e2e
```

#### React
```bash
cd suppliers_react

# Ejecutar tests
npm test

# Ejecutar tests en modo watch
npm run test:watch
```

## 📊 Cobertura de Código

El proyecto mantiene una cobertura de código superior al 85% en el backend:

- **SupplierServiceImpl**: 100% cobertura
- **SupplierController**: 95% cobertura
- **GlobalExceptionHandler**: 90% cobertura
- **SupplierMapper**: 100% cobertura

## 🔧 Comandos Útiles

### Backend (Spring Boot)

```bash
# Limpiar y construir
./gradlew clean build

# Ejecutar aplicación
./gradlew bootRun

# Generar reporte de cobertura
./gradlew jacocoTestReport

# Verificar cobertura
./gradlew jacocoTestCoverageVerification

# Ejecutar tests específicos
./gradlew test --tests "SupplierServiceImplTest"
```

### Frontend Angular

```bash
# Desarrollo
ng serve

# Construcción para producción
ng build --prod

# Linting
ng lint

# Testing
ng test

# Generar componente
ng generate component nombre-componente
```

### Frontend React

```bash
# Desarrollo
npm run dev

# Construcción para producción
npm run build

# Linting
npm run lint

# Linting con fix
npm run lint:fix

# Formateo de código
npm run format

# Testing
npm test

# Preview de build
npm run preview
```

## 🐛 Troubleshooting

### Problemas Comunes

#### Backend no inicia
```bash
# Verificar Java version
java -version

# Limpiar cache de Gradle
./gradlew clean

# Verificar puerto disponible
netstat -an | grep 8080
```

#### Frontend no conecta con Backend
- Verificar que el backend esté ejecutándose en `http://localhost:8080`
- Revisar configuración de CORS
- Verificar URLs en `environment.ts` (Angular) o `environment.ts` (React)

#### Problemas de Base de Datos H2
- Acceder a `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:testdb`
- Usuario: `sa`, Contraseña: (vacía)

#### Errores de Compilación
```bash
# Angular
rm -rf node_modules package-lock.json
npm install

# React
rm -rf node_modules package-lock.json
npm install
```

### Logs Útiles

#### Backend
Los logs se muestran en consola con diferentes niveles:
- `INFO`: Operaciones normales
- `WARN`: Advertencias
- `ERROR`: Errores críticos

#### Frontend
- **Angular**: Logs en DevTools del navegador
- **React**: Logs en consola del navegador y terminal

## 📈 Próximas Mejoras

### Backend
- [ ] Implementar autenticación JWT
- [ ] Agregar auditoría de cambios
- [ ] Implementar cache con Redis
- [ ] Agregar métricas con Micrometer
- [ ] Implementar rate limiting

### Frontend Angular
- [ ] Implementar PWA
- [ ] Agregar notificaciones push
- [ ] Implementar lazy loading
- [ ] Agregar tests e2e con Cypress
- [ ] Implementar dark mode

### Frontend React
- [ ] Implementar PWA
- [ ] Agregar notificaciones push
- [ ] Implementar lazy loading
- [ ] Agregar tests con Testing Library
- [ ] Implementar dark mode
- [ ] Optimizar bundle size

### General
- [ ] Implementar CI/CD con GitHub Actions
- [ ] Agregar Docker containers
- [ ] Implementar monitoreo con APM
- [ ] Agregar documentación API con Swagger
- [ ] Implementar logging centralizado

## 📞 Soporte

Para soporte técnico o preguntas sobre el proyecto:

- **Issues**: Crear un issue en el repositorio
- **Documentación**: Revisar este README y la documentación específica de cada proyecto
- **Logs**: Revisar logs de aplicación para debugging

---

**Desarrollado con ❤️ para Gapsi**

*Sistema de gestión de proveedores - Versión 1.0.0*