# ATOM Task Manager - FullStack Challenge

Este proyecto es la solución al desafío técnico para la posición de Sr Full Stack Developer. Se trata de una aplicación de gestión de tareas (To-Do List) diseñada bajo principios de arquitectura limpia, modularidad y las mejores prácticas del ecosistema Angular moderno.

## Vista General

La aplicación permite a los usuarios gestionar sus tareas diarias de forma eficiente, con un flujo de autenticación basado en correo electrónico y una interfaz intuitiva y responsiva.

### Características Principales
- Autenticación: Inicio de sesión solo con correo. Si el usuario no existe, se ofrece la creación de la cuenta.
- Gestión de Tareas (CRUD): Creación, lectura, edición y eliminación de tareas.
- Estado de Tareas: Marcado de tareas como completadas o pendientes mediante casillas de verificación.
- Ordenamiento Automático: Las tareas se presentan ordenadas por su fecha de creación.
- Diseño Responsive: Interfaz adaptada a dispositivos móviles, tablets y escritorio.

## Arquitectura y Decisiones de Diseño

Para este challenge, se implementó una arquitectura modular basada en Core, Shared y Features, facilitando el mantenimiento y la escalabilidad del proyecto.

### Estructura del Proyecto
- Core (/src/app/core): Contiene el motor de la aplicación. Servicios globales (HTTP, Auth), interfaces fundamentales y los Guards de navegación.
- Shared (/src/app/shared): Componentes, constantes y utilitarios reutilizables para evitar duplicación de código.
- Features (/src/app/features): Cada módulo funcional (Auth, Tasks) está encapsulado siguiendo el principio de responsabilidad única.

### Decisiones Técnicas Destacadas
- Angular 17 + Standalone Components: Uso de las últimas funcionalidades para eliminar módulos pesados, optimizando el bundle y la claridad del código. Adicionalmente, por temas de tiempos, se decidió reutilizar el template incluido en el pdf de ATOM.
- Programación Reactiva (RxJS): Manejo del estado y comunicación asíncrona mediante Observables.
- Carga Perezosa (Lazy Loading): Rutas principales cargadas bajo demanda para mejorar el rendimiento inicial.
- Manejo Centralizado de Errores: Servicio HTTP robusto con gestión de errores para mejorar la resiliencia.

## Stack Tecnológico

- Frontend: Angular 17, RxJS, Angular Material, SCSS.
- Backend (API): Node.js con Express y TypeScript.
- Infraestructura: Firebase (Hosting, Cloud Functions y Firestore).

## Configuración y Ejecución

### Requisitos Previos
- Node.js (v18.x o superior)
- Angular CLI (v17.x)

### Instalación Local
1. Clonar el repositorio.
   ```bash
   git clone https://github.com/mlsebcu/atom-fullstack-challenge.git
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Ejecutar el servidor de desarrollo:
   ```bash
   ng serve
   ```
4. Abrir en el navegador: http://localhost:4200/

### Despliegue
El proyecto está configurado para despliegue en Firebase:
```bash
ng build
firebase deploy
```

## Comentarios del Desarrollador

El desarrollo de este challenge se enfocó en un equilibrio entre funcionalidad y calidad técnica. Más allá de cumplir los requisitos, se estableció una base sólida que demuestra una estructura escalable, priorizando la legibilidad, el tipado fuerte y la separación de responsabilidades.

La integración con Firebase Firestore garantiza la persistencia y respuesta en tiempo real, mientras que Angular Material proporciona una experiencia de usuario consistente y profesional.
