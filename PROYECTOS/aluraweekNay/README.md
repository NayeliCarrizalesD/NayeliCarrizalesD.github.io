# Alura Geek - Proyecto de E-commerce

## 📋 Descripción
Proyecto de tienda en línea con productos de diferentes categorías: Star Wars, Consolas y Diversos.

## 🚀 Cómo iniciar el proyecto

### Prerrequisitos
- Node.js instalado en tu sistema
- Navegador web moderno

### Pasos para ejecutar:

1. **Instalar dependencias** (solo la primera vez):
   ```bash
   npm install
   ```

2. **Iniciar el servidor JSON**:
   
   **Opción A - Usando el script batch (Windows):**
   ```bash
   .\iniciar-servidor.bat
   ```
   
   **Opción B - Usando npm directamente:**
   ```bash
   npm start
   ```

3. **Abrir la aplicación**:
   - El servidor JSON estará corriendo en: `http://localhost:3000`
   - Abre `index.html` en tu navegador

## 📁 Estructura del proyecto

```
├── index.html                 # Página principal
├── db.json                   # Base de datos JSON
├── package.json              # Configuración del proyecto
├── iniciar-servidor.bat      # Script para iniciar servidor (Windows)
├── assets/
│   ├── css/                  # Estilos CSS
│   └── img/                  # Imágenes
├── controller/
│   ├── productos-controllers.js  # Controlador de productos
│   ├── form-validation.js        # Validación de formularios
│   └── search.js                 # Funcionalidad de búsqueda
├── servicios/
│   └── productos-servicios.js    # Servicios para API
└── screens/                      # Páginas adicionales
```

## 🔧 Funcionalidades

### ✅ Implementadas:
- ✅ Mostrar productos por categorías (Star Wars, Consolas, Diversos)
- ✅ Búsqueda de productos
- ✅ Validación de formulario de contacto
- ✅ Diseño responsivo
- ✅ Servidor JSON con base de datos

### 🚧 En desarrollo:
- Carrito de compras
- Página de detalles de producto
- Sistema de administración
- Login de usuarios

## 📊 API Endpoints

Con el servidor JSON corriendo en `http://localhost:3000`:

- `GET /productos` - Obtener todos los productos
- `GET /productos?categoria=StarWars` - Filtrar por categoría
- `GET /productos/{id}` - Obtener producto específico
- `GET /users` - Obtener usuarios
- `GET /categories` - Obtener categorías

## 🎨 Categorías de productos

1. **Star Wars** - Productos relacionados con la saga
2. **Consolas** - Videoconsolas y accesorios
3. **Diversos** - Otros productos tecnológicos

## 🔍 Búsqueda
La búsqueda funciona por:
- Nombre del producto
- Categoría
- Descripción (si está disponible)

## 🐛 Solución de problemas

### El servidor no inicia:
- Verifica que Node.js esté instalado: `node --version`
- Instala las dependencias: `npm install`

### Los productos no se muestran:
- Verifica que el servidor JSON esté corriendo en puerto 3000
- Abre la consola del navegador para ver errores

### Error de CORS:
- Asegúrate de servir el HTML desde un servidor web (no file://)
- Puedes usar Live Server de VS Code

## 📝 Notas
- El proyecto utiliza ES6 modules (import/export)
- Requiere un servidor web para funcionar correctamente
- Los datos se almacenan en `db.json`
