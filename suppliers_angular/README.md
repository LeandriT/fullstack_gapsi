# 🏢 Gestión de Proveedores - Frontend Angular

## 📋 Descripción

Aplicación web desarrollada en **Angular 17+** para la gestión completa de proveedores. Esta aplicación se conecta con el backend Spring Boot para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre proveedores.

## 🚀 Características

### ✨ Funcionalidades Principales

- **📝 Gestión de Proveedores**: Crear, editar y eliminar proveedores
- **📊 Lista Paginada**: Visualización de proveedores con paginación
- **🔍 Búsqueda y Filtrado**: Filtros por estado y paginación configurable
- **📱 Responsive Design**: Interfaz adaptativa para diferentes dispositivos
- **🌐 Internacionalización**: Interfaz completamente en español
- **⚡ Material Design**: Componentes modernos con Angular Material

### 🛠️ Tecnologías Utilizadas

- **Angular 17+** - Framework principal
- **Angular Material** - Componentes UI
- **RxJS** - Programación reactiva
- **TypeScript** - Lenguaje de programación
- **SCSS** - Estilos con sintaxis avanzada
- **HTTP Client** - Comunicación con API REST

## 📁 Estructura del Proyecto

```
suppliers_angular/
├── src/
│   ├── app/
│   │   ├── core/                    # Servicios y modelos centrales
│   │   │   ├── enums/              # Enumeraciones (Status)
│   │   │   ├── i18n/               # Internacionalización
│   │   │   ├── models/             # Modelos base (PageResponse, ErrorMessage)
│   │   │   └── services/           # Servicios centrales (ErrorHandler, Notification)
│   │   ├── features/               # Módulos de funcionalidades
│   │   │   ├── suppliers/          # Módulo de proveedores
│   │   │   │   ├── models/         # DTOs de proveedores
│   │   │   │   ├── pages/          # Componentes de páginas
│   │   │   │   │   ├── supplier-form/    # Formulario de proveedores
│   │   │   │   │   └── supplier-list/    # Lista de proveedores
│   │   │   │   ├── services/       # Servicio de proveedores
│   │   │   │   └── suppliers-routing.module.ts
│   │   │   └── welcome/            # Página de bienvenida
│   │   ├── layout/                 # Componentes de layout
│   │   │   ├── header/             # Cabecera
│   │   │   ├── footer/             # Pie de página
│   │   │   └── layout/             # Layout principal
│   │   ├── app.routes.ts           # Configuración de rutas
│   │   └── app.config.ts           # Configuración de la aplicación
│   ├── assets/                     # Recursos estáticos
│   ├── environments/               # Configuraciones de entorno
│   └── styles.scss                 # Estilos globales
├── angular.json                    # Configuración de Angular CLI
├── package.json                    # Dependencias del proyecto
└── README.md                       # Este archivo
```

## 🏗️ Arquitectura

### 📦 Módulos

- **AppModule**: Módulo principal de la aplicación
- **SuppliersModule**: Módulo de gestión de proveedores
- **WelcomeModule**: Módulo de página de bienvenida
- **LayoutModule**: Módulo de layout compartido

### 🔄 Servicios

- **SupplierService**: Comunicación con API de proveedores
- **ErrorHandlerService**: Manejo centralizado de errores
- **NotificationService**: Servicio de notificaciones

### 📊 Modelos de Datos

- **SupplierRequest**: DTO para crear/actualizar proveedores
- **SupplierResponse**: DTO de respuesta de proveedores
- **PageResponse**: Modelo de paginación
- **ErrorMessage**: Modelo de errores del backend

## 🚀 Instalación y Configuración

### 📋 Prerrequisitos

- **Node.js** (versión 18 o superior)
- **npm** o **yarn**
- **Angular CLI** (`npm install -g @angular/cli`)

### 🔧 Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/LeandriT/fullstack_gapsi.git
   cd suppliers_angular
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Configurar variables de entorno**

   Editar `src/environments/environment.ts`:
   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:8080/api/v1'  // URL del backend
   };
   ```

4. **Ejecutar la aplicación**
   ```bash
   ng serve
   # o para puerto específico
   ng serve --port 4200
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:4200
   ```

## 🔗 Configuración del Backend

### ⚙️ Requisitos del Backend

- **Spring Boot 4.0.0-SNAPSHOT**
- **Puerto**: 8080 (configurable)
- **CORS**: Habilitado para `http://localhost:4200`

### 🌐 Endpoints Requeridos

```
GET    /api/v1/suppliers?page={page}&size={size}     # Lista paginada
GET    /api/v1/suppliers/{uuid}                       # Obtener por ID
POST   /api/v1/suppliers                              # Crear proveedor
PUT    /api/v1/suppliers/{uuid}                       # Actualizar proveedor
PATCH  /api/v1/suppliers/{uuid}                       # Actualización parcial
DELETE /api/v1/suppliers/{uuid}                       # Eliminar proveedor
```

## 📱 Uso de la Aplicación

### 🏠 Página Principal

- **URL**: `http://localhost:4200`
- **Descripción**: Página de bienvenida con información del sistema

### 📋 Gestión de Proveedores

- **URL**: `http://localhost:4200/suppliers`
- **Funcionalidades**:
  - Ver lista de proveedores con paginación
  - Crear nuevo proveedor
  - Editar proveedor existente
  - Cambiar estado (Activo/Inactivo)
  - Eliminar proveedor

### 📝 Formulario de Proveedores

- **Crear**: `http://localhost:4200/suppliers/form`
- **Editar**: `http://localhost:4200/suppliers/form/{uuid}`

#### Campos del Formulario

- **Nombre** (requerido): Nombre del proveedor
- **Razón Social** (requerido): Razón social de la empresa
- **Dirección** (requerido): Dirección física
- **Email**: Correo electrónico (validación de formato)
- **Teléfono**: Número de teléfono
- **Estado**: Activo/Inactivo (por defecto: Activo)

## 🎨 Características de UI/UX

### 🎯 Material Design

- Componentes modernos y consistentes
- Animaciones suaves
- Iconografía clara
- Colores y tipografía estándar

### 📱 Responsive

- Adaptable a dispositivos móviles
- Tabla responsive con scroll horizontal
- Botones y formularios optimizados para touch

### 🌐 Internacionalización

- Interfaz completamente en español
- Paginación localizada
- Mensajes de error en español
- Formato de fechas y números localizado

## 🔧 Comandos de Desarrollo

### 🚀 Desarrollo

```bash
# Servidor de desarrollo
ng serve

# Servidor en puerto específico
ng serve --port 4200

# Servidor con recarga automática
ng serve --live-reload
```

### 🏗️ Construcción

```bash
# Build de desarrollo
ng build

# Build de producción
ng build --configuration production

# Build con análisis de bundle
ng build --stats-json
```

### 🧪 Testing

```bash
# Ejecutar tests unitarios
ng test

# Ejecutar tests con coverage
ng test --code-coverage

# Ejecutar tests e2e
ng e2e
```

### 🔍 Linting y Formateo

```bash
# Linting
ng lint

# Formateo de código
ng format
```

## 🐛 Solución de Problemas

### ❌ Problemas Comunes

1. **Error de CORS**
   ```
   Solución: Verificar que el backend tenga CORS habilitado para localhost:4200
   ```

2. **Error de conexión al backend**
   ```
   Solución: Verificar que el backend esté ejecutándose en puerto 8080
   ```

3. **Error de compilación**
   ```
   Solución: Limpiar cache y reinstalar dependencias
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Paginación no funciona**
   ```
   Solución: Verificar que el modelo PageResponse coincida con la respuesta del backend
   ```

### 🔍 Debugging

- **DevTools**: Usar Angular DevTools para debugging
- **Console**: Revisar consola del navegador para errores
- **Network**: Verificar requests HTTP en DevTools

## 📊 Estructura de Datos

### 📋 Supplier (Proveedor)

```typescript
interface SupplierResponse {
  uuid: string;
  name: string;
  business_name: string;
  address: string;
  email?: string;
  phone?: string;
  status: 'ACTIVE' | 'INACTIVE';
  created_at: string;
  updated_at: string;
}
```

### 📄 PageResponse (Paginación)

```typescript
interface PageResponse<T> {
  content: T[];
  total_elements: number;
  total_pages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
  // ... más propiedades
}
```

## 🔒 Seguridad

### 🛡️ Consideraciones

- **CORS**: Configurado para desarrollo local
- **Validación**: Validación de formularios en frontend
- **Sanitización**: Angular sanitiza automáticamente el HTML
- **HTTPS**: Recomendado para producción

## 🚀 Despliegue

### 🌐 Producción

1. **Build de producción**
   ```bash
   ng build --configuration production
   ```

2. **Configurar variables de entorno**
   ```typescript
   export const environment = {
     production: true,
     apiUrl: 'https://your-api-domain.com/api/v1'
   };
   ```

3. **Desplegar archivos estáticos**

- Los archivos generados en `dist/` pueden desplegarse en cualquier servidor web
- Recomendado: Nginx, Apache, o servicios como Vercel, Netlify

## 📈 Próximas Mejoras

### 🔮 Funcionalidades Futuras

- **🔍 Búsqueda avanzada**: Filtros por múltiples campos
- **📊 Dashboard**: Estadísticas y gráficos
- **📤 Exportación**: Exportar datos a Excel/PDF
- **🔔 Notificaciones**: Notificaciones push
- **📱 PWA**: Funcionalidades de Progressive Web App
- **🌙 Modo oscuro**: Tema oscuro opcional

## 👥 Contribución

### 🤝 Cómo Contribuir

1. Fork del repositorio
2. Crear rama para feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

### 📝 Estándares de Código

- **TypeScript**: Tipado estricto
- **ESLint**: Seguir reglas de linting
- **Prettier**: Formateo consistente
- **Commits**: Mensajes descriptivos en español

## 📞 Soporte

### 🆘 Contacto

- **Desarrollador**: [Tu nombre]
- **Email**: [tu-email@ejemplo.com]
- **GitHub**: [tu-usuario-github]

### 📚 Recursos Adicionales

- [Documentación de Angular](https://angular.io/docs)
- [Angular Material](https://material.angular.io/)
- [RxJS](https://rxjs.dev/)
- [TypeScript](https://www.typescriptlang.org/)

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

**🎉 ¡Gracias por usar la aplicación de Gestión de Proveedores!**
