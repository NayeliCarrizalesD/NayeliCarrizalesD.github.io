# Tecnologías Utilizadas en los Proyectos

Este documento recopila la arquitectura técnica y el conjunto de tecnologías, librerías e infraestructura utilizadas en los proyectos **Reloj Checador**, **Taller de Mar** y **Punto de Venta**.

---

## 1. 🕒 Reloj Checador (*Kronos Safe*)
* **Ubicación:** `../RELOJ-CHECADOR/kronos-safe`
* **Descripción:** Sistema empresarial para control de asistencia laboral, gestión de empleados, registro de incidencias, cálculo de horas extras y exportación de reportes operativos.

### Stack Tecnológico:
* **Frontend:**
  * **Next.js 16** (App Router)
  * **React 19**
  * **Reactstrap** / CSS Modules
  * **FontAwesome** (`@fortawesome/react-fontawesome`, `@fortawesome/free-solid-svg-icons`)
* **Backend & API:**
  * **Next.js API Routes** (`/api/kiosco/checar`, `/api/empleados`, `/api/incidencias`, `/api/reportes/asistencia`)
  * Servidor auxiliar **Express.js** con utilidades de seguridad (**Helmet**, **CORS**, **Morgan**)
  * **Auth0** (`@auth0/nextjs-auth0`, `express-jwt`, `jwks-rsa`) para autenticación y control de accesos
* **Base de Datos & Almacenamiento:**
  * **PostgreSQL Serverless** provisto por **Neon** (`@neondatabase/serverless`)
  * **Drizzle ORM** & **Drizzle Kit** (modelado, consultas y migraciones)
  * **Vercel Blob** (`@vercel/blob`) para persistencia de archivos multimedia
  * **XLSX** (`xlsx`) para generación y descarga de hojas de cálculo de asistencias
* **Pruebas y Calidad de Código:**
  * **Vitest**, **Jest** y **@testing-library/react** (pruebas unitarias y de integración)
  * **Cypress** (pruebas end-to-end)
  * **ESLint** (`eslint-config-next`) y **Prettier**

---

## 2. 🌊 Taller de Mar (*Sistema de Citas y Talleres*)
* **Ubicación:** `../TALLER-DE-MAR/taller-de-mar`
* **Demo Activo en Producción:** [https://taller-de-mar-green.vercel.app/](https://taller-de-mar-green.vercel.app/)
* **Descripción:** Plataforma web para la gestión de servicios y citas, inscripción a talleres, galería interactiva de trabajos y sistema de reseñas/valoraciones.

### Stack Tecnológico:
* **Frontend:**
  * **Next.js 16** (App Router)
  * **React 19**
  * **Tailwind CSS v3** con **PostCSS** y **Autoprefixer**
  * **Lucide React** & **FontAwesome** para iconografía
  * **Reactstrap**
  * **browser-image-compression** (optimización y reducción de peso de imágenes antes de su carga)
* **Backend & Servicios:**
  * **Next.js API Routes** (`/api/appointments`, `/api/workshops`, `/api/gallery`, `/api/reviews`)
  * **Auth0** (`@auth0/nextjs-auth0`, `express-jwt`, `jwks-rsa`) para gestión de perfiles y roles de usuario
  * **Resend** (`resend`) para envío automatizado de correos de confirmación y recordatorios de citas
* **Base de Datos & Almacenamiento:**
  * **PostgreSQL Serverless** con **Neon** y `@vercel/postgres`
  * **Vercel Blob** (`@vercel/blob`) para almacenamiento en la nube de imágenes del taller
* **Pruebas y Herramientas:**
  * **Vitest**, **Jest**, **@testing-library/react**
  * **Cypress** para pruebas E2E
  * **ESLint** y **Prettier**

---

## 3. 🐙🍺 Punto de Venta (*El Pulpo Chelero - POS & Cocina*)
* **Ubicación:** `../PUNTO-DE-VENTA-RESTAURANTE`
* **Descripción:** Sistema integral de Punto de Venta (POS) y Comandas diseñado para restaurantes y bares. Incluye mapa interactivo de mesas, venta en mostrador/takeaway, KDS (Kitchen Display System / pantalla para cocina y bar), arqueo/corte de caja (X y Z) e impresión de tickets térmicos.

### Stack Tecnológico:
* **Frontend & Build:**
  * **React 19**
  * **TypeScript**
  * **Vite 8** (`@vitejs/plugin-react`)
  * **Tailwind CSS v4** (`@tailwindcss/vite`)
  * **React Router DOM v7** para enrutamiento modular (Salón, Mostrador, KDS, Caja)
  * **Lucide React** para interfaz táctil
* **Gestión de Estado:**
  * **Zustand** (control reactivo en memoria para comandas activas, mesas, pedidos de cocina y corte de caja)
* **Integraciones y APIs:**
  * **Janus API**: Autenticación centralizada mediante tokens JWT (`/badge` y `/sentry`)
  * **Octopus API**: Gestión y sincronización de usuarios, meseros y personal (`/usuarios/`, `/usuarios_list/`)
  * **Web Audio API**: Señales auditivas en tiempo real para alertar al personal de cocina ante nuevas comandas
* **Despliegue y Contenedores:**
  * **Docker** (construcción multi-stage optimizada)
  * **Docker Compose**
  * **Nginx Alpine** (servidor web ultraligero para producción)
  * Script PowerShell para despliegue automatizado por FTP (`scripts/deploy-ftp.ps1`)

---

## 4. 📦📑 Tablero de Control de Bodega & Trazabilidad de Facturas
* **Descripción:** Solución corporativa para gestión de almacén, logística e inventarios. Automatiza el registro de entradas y salidas de materiales mediante Google Apps Script y genera tableros analíticos en tiempo real con Google Looker Studio.
* **Stack Tecnológico:**
  * **Business Intelligence & Visualización:** Google Looker Studio (dashboards interactivos, métricas de inventario, stock crítico).
  * **Automatización & Scripting:** Google Apps Script (JavaScript moderno para validaciones, generación de IDs y triggers de actualización).
  * **Almacenamiento & Modelado de Datos:** Google Sheets / Google Sheets API (estructuración relacional de hojas para entradas, salidas y catálogo).
  * **Trazabilidad:** Rastreo operativo detallado vinculado por número de factura y proveedor.

---

## 5. 📡📊 Pipeline ETL de Redes Sociales & Métricas Automatizadas
* **Descripción:** Pipeline automatizado de extracción, transformación y carga (ETL) que consume APIs REST de diversas plataformas de redes sociales periódicamente para consolidar métricas de alcance, interacción y conversiones.
* **Stack Tecnológico:**
  * **Automatización & ETL:** Google Apps Script con Time-driven Triggers para ejecución periódica desatendida.
  * **Integraciones & Consumo de APIs:** APIs REST externas mediante `UrlFetchApp`, autenticación con tokens/headers HTTP y normalización de JSON.
  * **Modelado & Almacenamiento:** Google Sheets como repositorio de datos estructurado.
  * **Visualización:** Google Looker Studio conectado como capa de presentación para reportes ejecutivos.

---

## 6. 🏢 Grupo Salinas – Sistemas Web Corporativos en Producción
* **Empresa:** Grupo Salinas
* **Control de Versiones & Gestión de Código:** **GitLab Corporativo** (administración de ramas, code reviews, control de versiones y flujos de despliegue).
* **Soluciones Entregadas a Producción (4 Proyectos Estratégicos):**
  1. **📱 Registro Único (Móvil & Geografía):**
     * Plataforma corporativa de registro unificado recién lanzada para dispositivos móviles.
     * Alcance nacional: da servicio a todos los colaboradores del corporativo y red geográfica en México.
     * Arquitectura frontend optimizada para alta concurrencia, interfaces responsivas y validación de datos en tiempo real.
  2. **🎮 Rally Mundialista (Juegos Web Multi-Servidor en Vanilla JS):**
     * Desarrollo de minijuegos interactivos de alto rendimiento construidos en **Vanilla JavaScript (ES6+), HTML5 Canvas y CSS3** sin dependencias pesadas para asegurar fluidez a 60 FPS.
     * **Arquitecturas Multi-Servidor Heterogéneas:** Cada juego se desplegó en servidores con configuraciones y sistemas operativos distintos; se diseñó y adaptó la arquitectura de archivos, rutas y assets de la versión original a los requerimientos específicos de cada servidor de destino.
  3. **🔍 Buscador Dinámico de Ganadores:**
     * Motor de búsqueda y filtrado de datos en tiempo real para localizar ganadores de dinámicas y activaciones corporativas masivas.
     * Optimizado para búsquedas instantáneas sobre grandes conjuntos de datos con tiempos de respuesta en milisegundos.
  4. **⚽ Módulo Copa Socio (Torneo Deportivo Interno):**
     * Módulo interactivo de visualización deportiva para el torneo institucional de fútbol.
     * Despliegue de plantillas de equipos, estadísticas de partidos, calendarios y tablas de posiciones actualizadas en tiempo real.


