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

## 4. 📊 Control de Inventarios, Logística & Comercio Exterior (Grupo MGO · Química OB · Overseas)
* **Empresas Integradas:** MGO Industrial, Química OB y Overseas (ORSA).
* **Flujo Operativo End-to-End:**
  1. **Piso / Bodega:** Personal operativo captura entradas y salidas de material en tiempo real mediante **Google Forms** optimizados para dispositivos móviles.
  2. **Oficina / Administración:** Recepción automática en **Google Sheets** estructurados, donde **Google Apps Script** valida folios, calcula costos y sincroniza compras vs. ventas.
  3. **Dirección / BI:** **Google Looker Studio** (3 páginas analíticas) conectado mediante *Data Blending* relacional entre entradas, salidas e inventario consolidado.
* **Escala & Métricas Reales:**
  * **489.3 mil** kg/unidades en Total Entradas.
  * **381.3 mil** kg/unidades en Total Salidas.
  * **108.1 mil** kg/unidades en Existencias Activas.
* **Stack Tecnológico:**
  * **Business Intelligence:** Google Looker Studio (*Página 1: Inventario General*, *Página 2: Ventas por Cliente*, *Página 3: Compras & Aduanas*).
  * **Automatización:** Google Apps Script (triggers de cálculo, conciliación y alertas).
  * **Captura & Repositorio:** Google Forms y Google Sheets (modelado relacional multi-fuente).
  * **Trazabilidad de Comercio Exterior:** Trazabilidad estricta por Lote, Pedimento de importación, Factura transportista y Precios bi-moneda (USD y MXN).
  * **Desarrollo de Portales Web Corporativos Multi-Marca:** Diseño y maquetación frontend de los 3 sitios web del grupo empresarial (MGO Industrial, el sitio comercial del Restaurante y la firma química hermana Química OB) desarrollados con React, TypeScript y Tailwind CSS.
  * **Automatización de Procesos de RRHH (People Operations):** Sistema de autoservicio para solicitud de vacaciones implementado con Google Forms, base de datos en Google Sheets y disparadores basados en eventos con Google Apps Script (`onFormSubmit`, `onEdit` y `GmailApp`) para notificar al jefe inmediato y enviar la confirmación de autorización por correo electrónico al colaborador.

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
* **Ubicación & Período:** Ciudad de México (CDMX) | Noviembre 2025 – Actualidad
* **Control de Versiones & Gobernanza de Código:** **GitLab Corporativo** (administración de ramas, code reviews, control de versiones y flujos de despliegue).
* **Soluciones Entregadas a Producción:**
  1. **📱 Plataforma Web de Onboarding & Registro Móvil:**
     * **Stack:** **React 19**, **Vite**, JavaScript ES6+, ESLint 9, Mobile-First responsive.
     * Plataforma corporativa de registro unificado recién lanzada para dispositivos móviles.
     * Cobertura masiva a escala nacional para colaboradores de corporativo y campo en México.
     * Validación estricta y reactiva de formularios en cliente con interfaz fluida.
  2. **🎮 Ecosistema de Gamificación & Engagement Multi-Servidor:**
     * **Stack:** **TypeScript**, **HTML5 Canvas**, **Framer Motion**, Vanilla JS ES6+, **Node.js / Express**, **Docker Compose**.
     * Dinámicas interactivas y minijuegos web de alto rendimiento garantizando 60 FPS sin dependencias innecesarias.
     * **Arquitecturas Multi-Servidor Heterogéneas:** Código modular adaptado para ejecutarse con total estabilidad en múltiples servidores de producción con distintas configuraciones y sistemas operativos.
  3. **🔍 Motor Reactivo de Búsqueda y Filtrado en Tiempo Real:**
     * **Stack:** **React**, **React Router**, **Vite**, **SCSS**.
     * Motor de búsqueda y filtrado de datos instantáneo en cliente para activaciones corporativas y dinámicas masivas.
     * Diseñado para absorber picos elevados de concurrencia simultánea con latencia cero.
  4. **⚽ Portal Deportivo Institucional & Reportería Dinámica:**
     * **Stack:** **React**, **Axios**, **PDFMake**, **Vite**, **SCSS**.
     * Módulo institucional para seguimiento de torneos deportivos con visualización de tablas, fixtures y estadísticas en vivo.
     * Generación y descarga automática de reportes ejecutivos en PDF directamente en el navegador del usuario.
  5. **📊 Portal Corporativo de Bienestar & Analítica Visual:**
     * **Stack:** **React**, **TypeScript**, **Tailwind CSS**, **ECharts / ECharts-for-React**, **Zod**, **React Hook Form**, **Zustand**, **Vitest**, **Servidores IIS (Windows Server)**.
     * Tableros analíticos interactivos con gráficos avanzados para seguimiento de métricas y rendimiento.
     * Validación tipada estricta de extremo a extremo y especificaciones de despliegue en infraestructura empresarial IIS.
