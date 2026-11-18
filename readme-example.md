# Next Ride 🚗⚡

Plataforma web moderna para la exploración, filtrado y adquisición de autos seminuevos y garantizados. Diseñada con una arquitectura escalable basada en **Next.js 16 (App Router)**, **React 19**, **TypeScript** y **Redux Toolkit**, ofreciendo una experiencia fluida, reactiva e intuitiva inspirada en los estándares de la industria automotriz digital (como Kavak).

---

## 📌 Tabla de Contenidos

- [Características Principales](#-características-principales)
- [Stack Tecnológico](#-stack-tecnológico)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Flujo de Estado y Filtrado](#-flujo-de-estado-y-filtrado)
- [API REST y Route Handlers](#-api-rest-y-route-handlers)
- [Instalación y Puesta en Marcha](#-instalación-y-puesta-en-marcha)
- [Scripts Disponibles](#-scripts-disponibles)
- [Pruebas Automatizadas (Testing)](#-pruebas-automatizadas-testing)
- [Diseño y Estilos](#-diseño-y-estilos)

---

## 🚀 Características Principales

- **Catálogo de Seminuevos (`/seminuevos`):** Visualización en cuadrícula de vehículos con especificaciones clave (precio, año, kilometraje, transmisión, puertas, color y galería).
- **Sistema de Filtrado Multi-criterio Avanzado:**
  - Filtro por marca, rango de años, cantidad de puertas, tipo de transmisión y color.
  - Sincronización bidireccional en la URL mediante `searchParams` para compartir y persistir búsquedas.
  - Generación dinámica de chips/etiquetas de filtros activos con opción de eliminación individual o reseteo total.
- **Buscador Predictivo y por Palabras Clave:** Búsqueda flexible por texto que analiza marcas, modelos y características de los autos.
- **Ordenamiento Inteligente:** Clasificación dinámica por mayor precio, menor precio, más recientes y más antiguos.
- **Experiencia de Usuario (UX) Optimizada:**
  - Estados de carga animados mediante componentes Skeleton.
  - Manejo robusto de errores y pantallas de "Sin resultados".
  - Navegación responsive con menú móvil lateral y filtros en ventana modal para pantallas táctiles.
  - Página 404 personalizada integrada al diseño de la marca.
- **Carruseles Interactivos:** Sliders táctiles e interactivos implementados con **Swiper.js** para destacar garantías, beneficios y testimonios.
- **Gestión de Imágenes en la Nube:** Optimización y entrega de imágenes de alta resolución mediante **Cloudinary** y el componente `next/image`.

---

## 🛠 Stack Tecnológico

### Frontend & Core
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router & Server Components)
- **Biblioteca UI:** [React 19](https://react.dev/)
- **Lenguaje:** [TypeScript 5](https://www.typescriptlang.org/) (Tipado estricto de extremo a extremo)
- **Gestión de Estado Global:** [@reduxjs/toolkit](https://redux-toolkit.js.org/), [React-Redux](https://react-redux.js.org/) y [Reselect](https://github.com/reduxjs/reselect) para selectores memoizados de alto rendimiento.

### Estilos y Diseño
- **Preprocesador CSS:** [Sass (SCSS)](https://sass-lang.com/) con arquitectura modular (variables globales, mixins, tipografía, componentes BEM y páginas independientes).
- **Iconografía:** [FontAwesome SVG Icons](https://fontawesome.com/) (@fortawesome/react-fontawesome).
- **Componentes Multimedia:** [Swiper 12](https://swiperjs.com/) para sliders responsivos.

### Testing & Calidad de Código
- **Runner de Pruebas:** [Vitest 4](https://vitest.dev/) con entorno virtual `jsdom`.
- **Testing UI:** [@testing-library/react](https://testing-library.com/) y `@testing-library/jest-dom`.

---

## 📂 Arquitectura del Proyecto

```plaintext
RE-Cars/
├── public/                 # Recursos estáticos (imágenes, logos de marcas, iconos SVG)
├── src/
│   ├── app/                # Rutas y páginas (Next.js App Router)
│   │   ├── api/cars/       # Route Handler (API REST interna)
│   │   ├── seminuevos/     # Página del catálogo de vehículos seminuevos
│   │   ├── layout.tsx      # Layout raíz (Providers, Header, Footer, metadatos SEO)
│   │   ├── not-found.tsx   # Página de error 404 personalizada
│   │   └── page.tsx        # Página principal (Landing Page con hero, sliders y sedes)
│   ├── components/         # Componentes reutilizables
│   │   ├── filters/        # Filtros modales, cabecera de ordenamiento y contenedor
│   │   ├── header/         # Barra de navegación, logo dinámico y buscador
│   │   ├── lib/            # Wrappers de librerías externas (Slider Swiper, Spinners)
│   │   └── ui/             # Tarjetas de autos (Car), Skeleton, Error, Footer
│   ├── db/                 # Base de datos simulada en memoria (Mock DB de vehículos)
│   ├── hooks/              # Custom React hooks (useCarsActions, useCarsSelectors)
│   ├── pageComponents/     # Componentes modulares específicos de páginas complejas
│   ├── store/              # Configuración de Redux Store
│   │   ├── cars/           # Slices, reducers y selectores memoizados
│   │   └── utilities/      # Funciones auxiliares de transformación y extracción de datos
│   ├── styles/             # Arquitectura modular de Sass
│   │   ├── components/     # Estilos SCSS por componente
│   │   ├── globals/        # Variables, mixins, normalización y tipografía
│   │   └── pages/          # Estilos específicos de cada vista
│   ├── types/              # Definiciones e interfaces de TypeScript
│   └── utils/              # Constantes globales, URLs de API y sedes físicas
├── tests/                  # Suite integral de pruebas unitarias y de integración
│   ├── components/         # Pruebas de componentes de UI, filtros y navegación
│   ├── pageComponents/     # Pruebas de integración de la página de seminuevos
│   └── setUp.tsx           # Configuración global y mocks para el entorno de pruebas
├── next.config.mjs         # Configuración de Next.js (Cloudinary, Sass, Turbopack)
├── tsconfig.json           # Configuración de TypeScript con alias de rutas (@/*)
├── vitest.config.mts       # Configuración del entorno de pruebas unitarias
└── package.json            # Metadatos del proyecto y dependencias
```

---

## 🔄 Flujo de Estado y Filtrado

El sistema combina el manejo de parámetros de URL con un store global de Redux:

```
[ Usuario interactúa con Filtros / Buscador ]
                     │
                     ▼
       [ Actualización de URL SearchParams ]
                     │
                     ▼
       [ useCarsActions / Redux Slice ]
                     │
                     ▼
       [ Selectores Memoizados (Reselect) ]
                     │
                     ▼
     [ Re-renderizado de Car Grid / Skeletons ]
```

1. **Persistencia en URL:** Los cambios en los filtros se reflejan de inmediato como parámetros (`?brand=bmw-ford&doors=4&order=Menor+precio`).
2. **Acciones Desacopladas:** Mediante los custom hooks `useCarsActions` y `useCarsSelectors`, los componentes no se acoplan directamente a la implementación interna de Redux.
3. **Selectores Reselect:** Optimizan el filtrado en cliente evitando recálculos innecesarios y garantizando un rendimiento de renderizado constante.

---

## 🌐 API REST y Route Handlers

El proyecto incluye una API interna en `/api/cars` construida con Next.js Route Handlers:

### `GET /api/cars`

Retorna la colección de vehículos filtrada u ordenada según los parámetros provistos.

#### Parámetros de Consulta (Query Params) Admitidos:
| Parámetro | Tipo | Descripción | Ejemplo |
|---|---|---|---|
| `keywords` | `string` | Búsqueda libre dividida por guiones (`-`) | `?keywords=mustang-rojo` |
| `brand` | `string` | Filtro por una o múltiples marcas | `?brand=audi-bmw` |
| `year` | `string` | Filtro por modelo/año | `?year=2021-2022` |
| `doors` | `string` | Filtro por número de puertas | `?doors=2-4` |
| `transmission` | `string` | Filtro por tipo de transmisión | `?transmission=automatica` |
| `color` | `string` | Filtro por color de carrocería | `?color=negro-blanco` |
| `order` | `string` | Criterio de ordenación | `?order=Mayor+precio` |

---

## 💻 Instalación y Puesta en Marcha

### Prerrequisitos
- **Node.js:** Versión 18.17.0 o superior (recomendado Node.js 20 LTS o superior).
- **Gestor de paquetes:** `npm`, `pnpm` o `yarn`.

### Pasos de Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/re-cars.git
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configuración de Variables de Entorno:**
   Crear un archivo `.env.local` en la raíz del proyecto (opcional para consumo local):
   ```env
   NEXT_PUBLIC_API=http://localhost:3000/api/cars
   ```

4. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación en vivo.

---

## 📜 Scripts Disponibles

En el `package.json` se encuentran definidos los siguientes comandos:

- `npm run dev`: Inicia el servidor de desarrollo con soporte de Turbopack.
- `npm run build`: Compila y genera la versión optimizada para producción.
- `npm run start`: Inicia el servidor de producción tras haber ejecutado el build.
- `npm run lint`: Ejecuta el análisis estático de código con ESLint.
- `npm test`: Ejecuta la suite completa de pruebas unitarias y de integración con Vitest.

---

## 🧪 Pruebas Automatizadas (Testing)

El proyecto cuenta con una cobertura integral de pruebas unitarias y de integración para garantizar la fiabilidad del catálogo, la navegación y los filtros:

- **Herramientas:** Vitest 4 + React Testing Library + `@testing-library/jest-dom`.
- **Cobertura de suites:**
  - `Header.test.tsx`: Apertura/cierre de menú responsive, links de navegación y comportamiento del logo.
  - `FiltersHeader.test.tsx`: Despliegue de opciones de ordenamiento y reseteo de filtros.
  - `ModalFilters.test.tsx`: Interacción con acordeones de filtros y selección múltiple.
  - `SearchFiltersCont.test.tsx`: Renderizado condicional de componentes y manejo de estados.
  - `PreOwned.test.tsx`: Integración del catálogo, interacción con query params y visualización de resultados.
  - `Car.test.tsx`, `Slider.test.tsx`, `Footer.test.tsx`, `Error.test.tsx`, `Skeleton.test.tsx`.

Para ejecutar las pruebas:
```bash
npm run test
```

---

## 🎨 Diseño y Estilos

- **Modularidad Sass:** Cada componente y página cuenta con su archivo SCSS dedicado, centralizados a través de un archivo `index.scss`.
- **Diseño Mobile-First & Responsive:** Puntos de quiebre (breakpoints) optimizados para dispositivos móviles, tablets y pantallas de escritorio.
- **Identidad Visual:** Esquema de color moderno con contrastes definidos, efectos sutiles de sombreado y tipografías legibles orientadas a comercio electrónico.
- **Recursos Visuales:**
  - Iconos vectoriales de [FontAwesome](https://fontawesome.com/).
  - Sombras CSS de [CSS Scan](https://getcssscan.com/css-box-shadow-examples).
  - Gradientes de [uiGradients](https://uigradients.com/).
