# BucaraEmprende

Aplicación web para el registro y visualización de ferias de emprendimiento, emprendimientos y sus productos/servicios, desarrollada como parte de un examen práctico.

## ✨ Funcionalidades principales

- Registrar ferias/eventos con nombre, fecha de inicio/fin y horario (hora de inicio y fin).
- Registrar emprendimientos asociados a una feria, con nombre, categoría, descripción y enlace a red social.
- Registrar productos o servicios para cada emprendimiento, con nombre, precio, descripción y foto opcional.
- Visualizar todos los eventos ordenados por fecha de inicio, mostrando sus emprendimientos y productos/servicios.
- Eliminar ferias y emprendimientos individualmente.
- Persistencia de datos en el navegador usando **localStorage**.
- Interfaz amigable, moderna y responsive.
- Menú hamburguesa para navegación en dispositivos móviles/tablets.
- Validaciones realistas y mensajes de éxito/error con SweetAlert2.
- Animaciones de carga al cambiar de sección.

## 🛠️ Tecnologías utilizadas

- **HTML5**
- **CSS3** (Flexbox, media queries, gradientes, animaciones)
- **JavaScript** (ES6+)
- **[SweetAlert2](https://sweetalert2.github.io/)** para alertas y confirmaciones
- **localStorage** para persistencia de datos

## 📁 Estructura del proyecto

```
Examen-JS/
├── index.html         # Página principal y estructura de la app
├── script.js          # Lógica de la aplicación (JS)
├── styles.css         # Estilos modernos y responsive
└── README.md          # (Este archivo)
```

## 🚀 Instrucciones de uso

1. **Descarga o clona el repositorio.**
2. Abre el archivo `index.html` en tu navegador favorito.
3. Usa el menú para registrar ferias, emprendimientos y servicios/productos.
4. Los datos se guardan automáticamente en tu navegador (localStorage).
5. Puedes eliminar ferias o emprendimientos desde la lista de eventos.

## 📱 Responsive y accesibilidad
- El menú de navegación se adapta a móviles/tablets con un menú hamburguesa.
- Los formularios y listas se adaptan a cualquier tamaño de pantalla.
- Los botones y campos tienen buen contraste y son accesibles.

## 💡 Notas adicionales
- No requiere backend ni instalación de dependencias.
- Puedes limpiar los datos borrando el almacenamiento local del navegador.
- El diseño y la experiencia de usuario están pensados para ser claros y modernos.

---

Desarrollado por Santiago Mendoza Rivera