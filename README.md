# Next Loot 🎮⚡

Plataforma web moderna orientada a la exploración, compra, venta y actualización de hardware para PC, componentes gaming y setups completos con trato directo peer-to-peer. Diseñada con una arquitectura frontend robusta, reactiva y escalable basada en **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4** y **Redux Toolkit**, ofreciendo una experiencia inmersiva e intuitiva inspirada en la estética tecnológica y gamer de alto rendimiento.

> [!NOTE]
> **Proyecto optimizado y modernizado con IA Antigravity:** El diseño visual, la arquitectura frontend, la suite de pruebas unitarias y la experiencia de usuario de este proyecto fueron mejorados, refactorizados y actualizados con la asistencia de la IA agéntica **Antigravity** (Google DeepMind).

---

## 📌 Tabla de Contenidos

- [Características Principales](#-características-principales)
- [Categorías de Hardware](#-categorías-de-hardware)
- [Stack Tecnológico del Frontend](#-stack-tecnológico-del-frontend)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Flujo de Estado y Autenticación](#-flujo-de-estado-y-autenticación)
- [Capa de Datos y Base Simulada (Mock DB)](#-capa-de-datos-y-base-simulada-mock-db)
- [Modernización con IA Antigravity](#-modernización-con-ia-antigravity)
- [Instalación y Puesta en Marcha](#-instalación-y-puesta-en-marcha)
- [Scripts Disponibles](#-scripts-disponibles)
- [Pruebas Automatizadas (Testing)](#-pruebas-automatizadas-testing)
- [Diseño y Estilos](#-diseño-y-estilos)

---

## 🚀 Características Principales

- **Catálogo de Hardware y Componentes (`/marketplace`):**
  - Cuadrícula adaptable protegida contra desbordamientos con alturas fijas de imagen y truncado inteligente de especificaciones (`ProductCard` y `SkeletonProductCard`).
  - Artículos categorizados con badges de disponibilidad en tiempo real (`DISPONIBLE`, `AGOTADO`, `PROXIMAMENTE`).
- **Detalle de Producto (`/product/[id]`):**
  - Vista individual de cada artículo del marketplace con galería principal, precio, ubicación, estado de disponibilidad, especificaciones completas, perfil del vendedor verificado y estado de carga mediante `SkeletonProduct`.
  - Navegación breadcrumb directa de regreso a `/marketplace`.
- **Sistema de Filtrado Multi-criterio Avanzado:**
  - Modal flotante con efecto *glassmorphism* y resplandor neón decorativo.
  - Búsqueda por palabra clave o modelo (GPU, CPU, periféricos, etc.).
  - Filtro por categoría específica de hardware con selectores dinámicos.
  - Selector de rango de precio con límites inferior (`Precio Mínimo`) y superior (`Precio Máximo`).
- **Autenticación con Roles y Tipos de Cuenta (`/login`, `/register`):**
  - Sistema de roles: **Cliente** (comprador/entusiasta) y **Proveedor** (vendedor/ensamblador).
  - Tipos de usuario: **Particular** (gamer individual) y **Empresa** (tienda de hardware / taller de modding).
  - Formularios en cascada optimizados con diseño dividido en 2 columnas para pantallas de escritorio (título y beneficios a la izquierda, formulario interactivo arriba a la derecha).
- **Perfiles de Vendedor Enriquecidos (`/user/[id]`):**
  - Banner de portada, avatar personalizable e indicador de vendedor verificado.
  - Métricas de reputación comunitaria con estrellas, tiempo de respuesta promedio y métodos de entrega (*Trato en mano con prueba de rendimiento* / *Envío asegurado*).
  - Pestaña de inventario activo con listado de todos los productos publicados por el proveedor enlazados a `/product/[id]`.
  - Sección de reseñas y comentarios de compradores.
- **Gestión Integral de Publicaciones / CRUD (`/my-products`, `/create-product`, `/edit-product/[id]`):**
  - Creación de publicaciones con selector de imagen interactivo mediante **React Dropzone**.
  - Tabla de administración (`TableProducts`), edición (`EditProduct`) y eliminación de publicaciones con diálogos modales de confirmación.
  - Rutas privadas y protegidas según sesión activa y rol de proveedor.
- **Base de Datos Simulada (Mock DB) Integrada:**
  - 15 artículos de hardware de última generación y 5 perfiles de proveedores completos para desarrollo, pruebas y demostración inmediata sin dependencias externas.

---

## 🖥 Categorías de Hardware

El catálogo está optimizado para las necesidades específicas de la comunidad de PC Gaming y entusiastas del hardware:

| Categoría | Clave Enum | Artículos Destacados |
| :--- | :--- | :--- |
| **Tarjetas Gráficas** | `TARJETAS_GRAFICAS` | NVIDIA RTX 4070 Ti, AMD Radeon RX 7900 XTX |
| **Procesadores y CPUs** | `PROCESADORES_Y_CPUS` | Intel Core i7-14700K, AMD Ryzen 7 7800X3D |
| **PCs Gaming Completas** | `PCS_GAMING_COMPLETAS` | Rigs Mini-ITX, Ensambles personalizados con refrigeración líquida |
| **Monitores y Pantallas** | `MONITORES_Y_PANTALLAS` | Paneles OLED 240Hz, Monitores Ultrawide 34" |
| **Periféricos y Accesorios** | `PERIFERICOS_Y_ACCESORIOS` | Teclados mecánicos custom, ratones ultraligeros, auriculares wireless |
| **Consolas y Videojuegos** | `CONSOLAS_Y_VIDEOJUEGOS` | PS5 Slim, Steam Deck OLED, Nintendo Switch OLED |
| **Componentes y Almacenamiento** | `COMPONENTES_Y_ALMACENAMIENTO` | Memorias RAM DDR5 6000MHz, SSDs NVMe PCIe 4.0, gabinetes y fuentes |
| **Otros** | `OTROS` | Herramientas de modding, pasta térmica, capturadoras y accesorios |

---

## 🛠 Stack Tecnológico del Frontend

### Core & Framework
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Server Actions, Server Components & Turbopack).
- **Biblioteca UI:** [React 19](https://react.dev/) (Hooks modernos, transiciones y renderizado concurrente).
- **Lenguaje:** [TypeScript 5](https://www.typescriptlang.org/) (Tipado estricto en modelos, props, enums y acciones).
- **Gestión de Estado Global:** [@reduxjs/toolkit](https://redux-toolkit.js.org/) y [React-Redux](https://react-redux.js.org/) para hidratación de sesión, tokens de autenticación y perfil del usuario autenticado.
- **Formularios y Validaciones:** [React Hook Form](https://react-hook-form.com/).
- **Carga de Archivos Multimedia:** [React Dropzone](https://react-dropzone.js.org/) para subida drag-and-drop de imágenes.
- **Procesamiento de Imágenes y Metadatos:** [Sharp](https://sharp.pixelplumbing.com/) para generación de favicons e iconos Apple Touch pixel-perfect.

### Estilos e Identidad Visual
- **Framework de Estilos:** [Tailwind CSS v4](https://tailwindcss.com/) con arquitectura temática nativa y PostCSS.
- **Iconografía:** [FontAwesome SVG Icons](https://fontawesome.com/) (`@fortawesome/react-fontawesome` y `@fortawesome/free-solid-svg-icons`).
- **Paleta Temática:** Gradientes gamer con violeta profundo (`#512fad`), magenta neón (`rgb(247, 52, 94)`) y cian eléctrico (`#22c8e5`).

### Testing & Calidad de Código
- **Runner de Pruebas:** [Vitest 4](https://vitest.dev/) con entorno virtual `jsdom`.
- **Testing UI:** [@testing-library/react](https://testing-library.com/), `@testing-library/jest-dom` y `@testing-library/user-event`.
- **Linter:** [ESLint](https://eslint.org/) con configuración oficial de Next.js.

---

## 📂 Arquitectura del Proyecto

```plaintext
General-services/
├── public/                 # Recursos estáticos y metadatos del sitio
│   ├── icons/              # Favicons y Apple Touch icons (180x180, 32x32, 16x16)
│   ├── img/                # Gráficos y recursos visuales locales
│   └── uploads/            # Archivos temporales de carga
├── src/
│   ├── app/                # Rutas y páginas (Next.js 16 App Router)
│   │   ├── (private)/      # Rutas protegidas (create-product, edit-product/[id], my-products, edit-profile)
│   │   ├── login/          # Ruta pública de inicio de sesión
│   │   ├── register/       # Ruta pública de registro de usuarios
│   │   ├── marketplace/    # Catálogo general de productos con modal de filtros
│   │   ├── product/[id]/   # Vista de detalle de producto individual
│   │   ├── user/[id]/      # Vista de perfil público de vendedor / usuario
│   │   ├── globals.css     # Directivas de Tailwind CSS v4 y tokens de tema
│   │   ├── layout.tsx      # Layout raíz (Providers, Header, Footer, Metadatos)
│   │   └── page.tsx        # Landing Page principal de Next Loot
│   ├── components/         # Componentes modulares y reutilizables
│   │   ├── layout/         # Header (con autocierre responsivo en >= 1024px), Footer, Warning
│   │   ├── no-ssr/         # NavMobile (drawer móvil cargado sin SSR)
│   │   ├── page/           # Vistas de página (Marketplace, Product, User, LoginAndRegister, EditProduct)
│   │   └── ui/             # Componentes atómicos (Avatar, Error, Dropzone, FormLayout, Loader)
│   ├── hooks/              # Custom React hooks (useGetData, useFormStatus)
│   ├── mockDB/             # Base de datos simulada (15 artículos de hardware y 5 vendedores)
│   ├── server-actions/     # Server Actions de Next.js preparadas para integración
│   ├── store/              # Configuración de Redux Store (AuthSlice, Hooks tipados)
│   ├── types/              # Definiciones e interfaces TypeScript (Forms, Models, Props, Store)
│   └── utils/              # Mensajes de error, constantes y utilidades
├── tests/                  # Suite integral de pruebas unitarias y de integración
│   ├── app/                # Pruebas de rutas de página y redirecciones
│   ├── components/         # Pruebas de componentes de UI, autenticación, marketplace y producto
│   └── setup.tsx           # Configuración de Vitest, mocks y renderizador con Providers
├── next.config.ts          # Configuración de Next.js (patrones remotos de imágenes)
├── tailwind.config.ts      # Paleta de colores y temas de Tailwind
├── tsconfig.json           # Configuración de TypeScript con alias de rutas (@/*)
├── vitest.config.mts       # Configuración del entorno de pruebas unitarias
└── package.json            # Metadatos del proyecto y dependencias
```

---

## 🔄 Flujo de Estado y Autenticación

El frontend gestiona la persistencia de sesión y los datos del usuario de forma reactiva combinando almacenamiento local con Redux Toolkit:

```plaintext
[ Usuario interactúa con la UI (Login / Registro / Filtros) ]
                            │
                            ▼
           [ Custom Hooks & Form Handlers ]
                            │
                            ▼
          [ Redux Toolkit Store (AuthSlice) ]
                            │
           ┌────────────────┴────────────────┐
           ▼                                 ▼
   [ Sesión Persistente (Token) ]    [ Estado Reactivo de la UI ]
           │                                 │
           ▼                                 ▼
   [ Acceso a Rutas Protegidas ]     [ Navbar / Dropdown / Perfil ]
   (create-product, my-products)     (Mi perfil, Mis productos, Logout)
```

1. **Gestión Reactiva con Redux:** Toda la información del usuario autenticado (`userData`, `token`, `authLoading`) se gestiona centralizadamente mediante hooks personalizados (`useAuthActions`, `useAuthSelectors`).
2. **Hidratación Automática:** Al cargar cualquier vista, el componente `Header` despacha `validateSessionAction()` para restaurar la sesión a partir del token guardado en el cliente.
3. **Protección de Rutas en Cliente:** Vistas como `/create-product`, `/edit-product/[id]` y `/my-products` verifican tanto la existencia de sesión como la pertenencia al rol `proveedor`, redireccionando a la página principal si el usuario no cumple los permisos.

---

## 📦 Capa de Datos y Base Simulada (Mock DB)

Para permitir el desarrollo ágil, pruebas unitarias y navegación completa sin depender de un servidor externo, el proyecto incorpora una base de datos mock exhaustiva en `src/mockDB/index.ts`:

- **15 Artículos de Hardware:** Cobertura de todas las categorías principales (GPUs de última generación, procesadores Intel y AMD, monitores OLED, teclados mecánicos, consolas portátiles y almacenamiento).
- **5 Vendedores Especializados:** Perfiles con nombres, correos de contacto, teléfonos, ubicaciones y roles preconfigurados para asociar con los artículos.
- **Server Actions Listas para Conectar:** La capa en `src/server-actions/index.ts` está estructurada con funciones fuertemente tipadas (`POST_register_login`, `GET_user`, `GET_products`, `POST_create_product`, etc.) que facilitan una integración inmediata en cuanto se disponga de un backend.

---

## 🤖 Modernización con IA Antigravity

Este proyecto experimentó un proceso integral de modernización, refactorización y aseguramiento de calidad asistido por la IA agéntica **Antigravity** (Google DeepMind):

- **Pivote temático y de marca:** Transición arquitectónica y visual desde un concepto genérico hacia la identidad de marca **Next Loot** (Hardware & Gaming Marketplace).
- **Refactorización de rutas y dominio a Marketplace/Product:** Migración de rutas públicas y privadas (`/services` ➔ `/marketplace`, `/service/[id]` ➔ `/product/[id]`, `/create-service` ➔ `/create-product`, `/edit-service/[id]` ➔ `/edit-product/[id]`, `/my-services` ➔ `/my-products`), así como renombrado de vistas, componentes y tipos (`Marketplace`, `Product`, `ProductCard`, `SkeletonProduct`, `SkeletonProductCard`, `TableProducts`, `EditProduct`).
- **Corrección de maquetación, responsividad y navegación:** Solución de fallos de overflow en la cuadrícula de cards en resoluciones intermedias (760px a 1300px) y corrección del menú móvil en `Header` para cerrar automáticamente el drawer al expandir la ventana a escritorio (`>= 1024px`).
- **Rediseño estético y responsivo:** Implementación del modal de filtros flotante con *glassmorphism*, renovación de las vistas de usuario/vendedor (`/user/[id]`) y estructuración de formularios en diseño dividido asimétrico para monitores de escritorio con campos en cascada ordenada.
- **Generación programática de activos:** Creación y exportación de nuevos favicons y Apple Touch icons (180x180, 32x32, 16x16) con transparencias y curvas *squircle* utilizando **Sharp**.
- **Ampliación de datos mock y tipado:** Adición de 10 nuevos artículos de hardware (alcanzando 15 publicaciones completas) asociados a 5 vendedores tecnológicos.
- **Verificación rigurosa de código:** Supervisión continua para mantener el 100% de la suite de pruebas unitarias aprobadas (11 suites / 64 pruebas en Vitest) y 0 errores de compilación en TypeScript.

---

## 💻 Instalación y Puesta en Marcha

### Prerrequisitos
- **Node.js:** Versión 18.18.0 o superior (recomendado Node.js 20 LTS o superior).
- **Gestor de paquetes:** `npm`, `pnpm` o `yarn`.

### Pasos de Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/RubDev666/General-services.git
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver Next Loot en funcionamiento de forma autónoma con recarga rápida de Turbopack.

---

## 📜 Scripts Disponibles

En el `package.json` se encuentran definidos los siguientes comandos:

- `npm run dev`: Inicia el entorno de desarrollo local con soporte de Turbopack (`next dev --turbopack`).
- `npm run build`: Compila la aplicación y genera la versión optimizada para despliegue en producción.
- `npm run start`: Inicia el servidor optimizado tras haber ejecutado el build de producción.
- `npm run lint`: Ejecuta el análisis estático de código mediante ESLint.
- `npm test`: Ejecuta la suite de pruebas unitarias y de integración con Vitest.
- `npm test -- --run`: Corre todas las pruebas una única vez sin modo interactivo.

---

## 🧪 Pruebas Automatizadas (Testing)

El proyecto cuenta con una cobertura integral de pruebas unitarias y de integración mediante **Vitest** y **React Testing Library**:

- **Herramientas:** Vitest 4 + React Testing Library + `@testing-library/jest-dom` + `@testing-library/user-event`.
- **Estado de la Suite:** **11 suites aprobadas (11/11)** y **64 pruebas aprobadas (64/64)**.
- **Detalle de Suites de Prueba:**
  - `LoginAndRegister.test.tsx`: Validación de renderizado, formulario de login, formulario de registro, validación de contraseñas coincidentes, asignación de roles y despacho de acciones.
  - `Marketplace.test.tsx`: Carga del marketplace (`/marketplace`), apertura/cierre de modal de filtros, filtrado interactivo por palabra clave y renderizado de skeletons (`SkeletonProductCard`).
  - `Product.test.tsx`: Renderizado detallado de ficha técnica del producto (`/product/[id]`), información del vendedor, estado de disponibilidad, `SkeletonProduct` de carga y estados de error.
  - `User.test.tsx`: Visualización del perfil de usuario, insignias de reputación y catálogo de publicaciones del proveedor.
  - `Header.test.tsx`: Comportamiento de navegación, menú desplegable, botón de apertura en móviles y cierre automático al redimensionar a escritorio (`>= 1024px`).
  - `NavItemsInitial.test.tsx` y `NavItemsSession.test.tsx`: Renderizado condicional de elementos de menú según el estado de la sesión y roles de usuario.
  - `create-product/page.test.tsx`: Protección de rutas para usuarios no autenticados o sin rol de proveedor, y validación de formulario de creación.
  - `my-products/page.test.tsx`: Listado de artículos propios, renderizado de tabla (`TableProducts`), diálogo de confirmación y eliminación de publicaciones.
  - `Footer.test.tsx`: Enlaces informativos y créditos de la plataforma.
  - `page.test.tsx`: Renderizado correcto de la landing page principal de Next Loot.

Para ejecutar la suite de pruebas:
```bash
npm test -- --run
```

Para verificar el tipado estricto con TypeScript:
```bash
npx tsc --noEmit
```

---

## 🎨 Diseño y Estilos

- **Tailwind CSS v4 Moderno:** Directivas temáticas nativas con variables CSS para el esquema de colores institucional (`color1` al `color10`).
- **Estética Cyberpunk / Hardware:** Diseñado con fondos oscuros profundos (`#150a33`), acentos púrpuras (`#512fad`), magenta neón (`#f7345e`) y cian eléctrico (`#22c8e5`).
- **Diseño Responsivo Inteligente:**
  - En móviles: Formularios en cascada vertical, navegación con menú drawer y cards compactas.
  - En tablets y escritorios: Cuadrícula de 3 columnas para artículos, cabecera con avatar dropdown y layout dividido en 2 columnas para pantallas de autenticación (título heroico e insignias fijas a la izquierda, formulario interactivo arriba a la derecha).
- **Control de Desbordamiento:** Componentes protegidos con `line-clamp`, `truncate` y contenedores con proporciones fijas para garantizar que títulos largos nunca rompan la alineación de la cuadrícula.

---
