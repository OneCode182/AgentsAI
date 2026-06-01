# Guía Técnica: Reglas de UI y TailwindCSS (UI Tailwind Rules)

> **Propósito**: Mantener la coherencia estética del diseño responsivo y premium de TecniPass, optimizando el uso de componentes reutilizables y clases utilitarias de TailwindCSS.

---

## 1. Sistema de Diseño y Estilo General
- **Framework**: TailwindCSS (enfoque utility-first). Queda prohibido escribir estilos CSS tradicionales a menos que sea en archivos globales configurados.
- **Iconografía**: Usar exclusivamente la biblioteca `iconsax-react`. No incrustar código SVG puro dentro de los componentes a menos que no exista alternativa en la librería.
- **Enfoque Responsivo**: Diseñar siempre pensando en dispositivos móviles primero (mobile-first), agregando modificadores para pantallas de escritorio (`md:`, `lg:`).
- **Modo Oscuro (Dark Mode)**: **No implementado** en la versión actual. No agregues clases con el prefijo `dark:`.

---

## 2. Reglas de Estilos Responsivos y Componentes Comunes

### 1. Tablas Responsivas y Paginación
- En pantallas móviles (menores a `768px`), las tablas no deben desbordar horizontalmente. Se debe ocultar la tabla tradicional (`hidden md:table`) y renderizar una lista de tarjetas apiladas verticalmente.
- Utilizar el patrón de paginación adaptativo: botones de página numerados en escritorio, botones de flechas simples "Anterior / Siguiente" en móviles (`MobilePagination`).

### 2. Botones de Acción (Action Buttons)
- Mantener consistencia visual en los estados de interacción (`hover:`, `focus:`, `active:`).
- Evitar apilar botones verticalmente en pantallas móviles si la interfaz se desequilibra. Usar diseño en fila responsiva:
  `className="flex flex-row space-x-2 w-full md:w-auto"`

### 3. Mensajes y Alertas (InfoMessage)
- Reutilizar el componente `<InfoMessage />` para banners de advertencia, errores o éxitos, derivado del módulo de configuración.
- Colores base autorizados:
  - Información: Azules suaves (`bg-blue-50 text-blue-700 border-blue-200`).
  - Advertencia: Amarillos/Naranjas suaves (`bg-amber-50 text-amber-700 border-amber-200`).
  - Error: Rojos suaves (`bg-red-50 text-red-700 border-red-200`).
  - Éxito: Verdes suaves (`bg-emerald-50 text-emerald-700 border-emerald-200`).

### 4. Sugerencias de Búsqueda (Search Suggestions)
- Las listas desplegables de búsqueda en tiempo real deben flotar sobre el contenido y tener sombras de elevación (`shadow-lg rounded-xl border border-gray-100 bg-white`).
- Cada sugerencia debe contener un botón de acción rápida al lado derecho.

---

## 3. Estructuración y Organización de Archivos de Componentes
- **Componentes Locales de Ruta**: Si un componente de React solo es utilizado por una pantalla/ruta específica, guárdalo dentro de la carpeta `components/` de esa ruta:
  `frontend/app/routes/_home.{module}/components/{Component}.tsx`
- **Componentes Compartidos**: Si un componente se usa en 2 o más módulos, muévelo a la carpeta global:
  `frontend/app/components/{Component}.tsx`
- **Estructura Interna**:
  - Cada archivo debe exportar un único componente.
  - La interfaz de propiedades (`Props`) debe estar explícitamente declarada y tipada.
  - No usar declaraciones de funciones inline complejas para manipuladores de eventos si exceden las 10 líneas; extáelas dentro del cuerpo del componente.

---

## 4. Accesibilidad (a11y)
- Usar etiquetas HTML5 semánticas (`<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<button>`).
- Todo botón de icono puro que no tenga texto descriptivo visible debe incluir un atributo `aria-label` descriptivo.
- Asegurar que todos los campos de formularios estén asociados a una etiqueta `<label>`.
