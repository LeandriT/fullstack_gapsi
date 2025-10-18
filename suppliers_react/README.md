# 🏢 Gestión de Proveedores - Frontend React

## 📋 Descripción

Aplicación web desarrollada en **React 18+ con TypeScript** para la gestión completa de proveedores. Esta aplicación
replica la funcionalidad del frontend Angular y se conecta con el backend Spring Boot para realizar operaciones CRUD (
Crear, Leer, Actualizar, Eliminar) sobre proveedores.

## 🚀 Características

### ✨ Funcionalidades Principales

- **📝 Gestión de Proveedores**: Crear, editar y eliminar proveedores
- **📊 Lista Paginada**: Visualización de proveedores con paginación
- **🔍 Filtros y Búsqueda**: Filtros por estado y paginación configurable
- **📱 Responsive Design**: Interfaz adaptativa para diferentes dispositivos
- **🌐 Material Design**: Componentes modernos con Material UI
- **⚡ React Query**: Caching inteligente y gestión de estado del servidor

### 🛠️ Tecnologías Utilizadas

- **React 18+** - Framework principal
- **TypeScript** - Lenguaje de programación tipado
- **Vite** - Build tool y servidor de desarrollo
- **Material UI (MUI)** - Componentes UI
- **React Router v6** - Enrutamiento
- **React Hook Form + Zod** - Formularios y validaciones
- **Axios** - Cliente HTTP
- **React Query** - Gestión de estado del servidor
- **Notistack** - Notificaciones toast

## 📁 Estructura del Proyecto

```
suppliers_react/
├── src/
│   ├── core/                    # Servicios y modelos centrales
│   │   ├── api/                # Configuración de axios
│   │   ├── enums/              # Enumeraciones (Status)
│   │   ├── models/             # Interfaces TypeScript
│   │   └── services/           # Servicios de API
│   ├── features/               # Módulos de funcionalidades
│   │   ├── suppliers/          # Módulo de proveedores
│   │   │   ├── components/     # Componentes específicos
│   │   │   │   ├── SupplierForm.tsx
│   │   │   │   └── SupplierList.tsx
│   │   │   └── SuppliersPage.tsx
│   │   └── welcome/            # Página de bienvenida
│   │       └── WelcomePage.tsx
│   ├── layout/                 # Componentes de layout
│   │   ├── Layout.tsx          # Layout principal
│   │   ├── Header.tsx          # Cabecera
│   │   ├── Footer.tsx          # Pie de página
│   │   └── layout.scss         # Estilos del layout
│   ├── config/                 # Configuraciones
│   │   └── environment.ts      # Variables de entorno
│   ├── App.tsx                 # Componente principal
│   ├── main.tsx                # Punto de entrada
│   └── index.css               # Estilos globales
├── public/                     # Archivos estáticos
├── package.json                # Dependencias del proyecto
└── README.md                   # Este archivo
```

## 🏗️ Arquitectura

### 📦 Componentes Principales

- **Layout**: Layout global con Header y Footer
- **WelcomePage**: Página de bienvenida con información del sistema
- **SuppliersPage**: Página principal de gestión de proveedores
- **SupplierList**: Lista paginada de proveedores
- **SupplierForm**: Formulario para crear/editar proveedores

### 🔄 Servicios

- **SupplierService**: Comunicación con API de proveedores
- **Axios**: Cliente HTTP configurado con interceptores

### 📊 Modelos de Datos

- **SupplierRequest**: DTO para crear/actualizar proveedores
- **SupplierResponse**: DTO de respuesta de proveedores
- **PageResponse**: Modelo de paginación
- **VersionResponse**: Modelo de información de versión
- **ErrorMessage**: Modelo de errores del backend

## 🚀 Instalación y Configuración

### 📋 Prerrequisitos

- **Node.js** (versión 18 o superior)
- **npm** o **yarn**

### 🔧 Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/LeandriT/fullstack_gapsi.git
   cd suppliers_react
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Configurar variables de entorno**

   Crear archivo `.env.local`:
   ```bash
   VITE_API_URL=http://localhost:8080/api/v1
   ```

4. **Ejecutar la aplicación**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

## 🔗 Configuración del Backend

### ⚙️ Requisitos del Backend

- **Spring Boot 4.0.0-SNAPSHOT**
- **Puerto**: 8080 (configurable)
- **CORS**: Habilitado para `http://localhost:5173`

### 🌐 Endpoints Requeridos

```
GET    /api/v1/suppliers?page={page}&size={size}     # Lista paginada
GET    /api/v1/suppliers/{uuid}                       # Obtener por ID
POST   /api/v1/suppliers                              # Crear proveedor
PUT    /api/v1/suppliers/{uuid}                       # Actualizar proveedor
PATCH  /api/v1/suppliers/{uuid}                       # Actualización parcial
DELETE /api/v1/suppliers/{uuid}                       # Eliminar proveedor
GET    /api/v1/version/info                           # Información de versión
```

## 📱 Uso de la Aplicación

### 🏠 Página Principal

- **URL**: `http://localhost:5173`
- **Descripción**: Página de bienvenida con información del sistema

### 📋 Gestión de Proveedores

- **URL**: `http://localhost:5173/suppliers`
- **Funcionalidades**:
    - Ver lista de proveedores con paginación
    - Crear nuevo proveedor
    - Editar proveedor existente
    - Cambiar estado (Activo/Inactivo)
    - Eliminar proveedor

### 📝 Formulario de Proveedores

- **Crear**: Modal desde la lista de proveedores
- **Editar**: Modal desde la lista de proveedores

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

## 🔧 Comandos de Desarrollo

### 🚀 Desarrollo

```bash
# Servidor de desarrollo
npm run dev

# Servidor con recarga automática
npm run dev -- --host
```

### 🏗️ Construcción

```bash
# Build de desarrollo
npm run build

# Build de producción
npm run build -- --mode production

# Preview del build
npm run preview
```

### 🧪 Testing

```bash
# Ejecutar tests unitarios
npm run test

# Ejecutar tests con coverage
npm run test:coverage

# Ejecutar tests en modo watch
npm run test:watch
```

### 🔍 Linting y Formateo

```bash
# Linting
npm run lint

# Linting con fix automático
npm run lint:fix

# Formateo de código
npm run format
```

## 🐛 Solución de Problemas

### ❌ Problemas Comunes

1. **Error de CORS**
   ```
   Solución: Verificar que el backend tenga CORS habilitado para localhost:5173
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

- **DevTools**: Usar React DevTools para debugging
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
  email?: string | null;
  phone?: string | null;
  status: 'ACTIVE' | 'INACTIVE';
  created_at?: string;
  updated_at?: string;
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
- **Validación**: Validación de formularios con Zod
- **Sanitización**: React sanitiza automáticamente el HTML
- **HTTPS**: Recomendado para producción

## 🚀 Despliegue

### 🌐 Producción

1. **Build de producción**
   ```bash
   npm run build
   ```

2. **Configurar variables de entorno**
   ```bash
   VITE_API_URL=https://your-api-domain.com/api/v1
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

- [Documentación de React](https://react.dev/)
- [Material UI](https://mui.com/)
- [React Router](https://reactrouter.com/)
- [React Query](https://tanstack.com/query/latest)
- [TypeScript](https://www.typescriptlang.org/)

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

**🎉 ¡Gracias por usar la aplicación de Gestión de Proveedores!**