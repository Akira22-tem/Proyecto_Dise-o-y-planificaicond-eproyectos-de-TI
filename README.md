# ExtraEDUC - Plataforma Educativa Extracurricular

Plataforma web educativa para gestión de tareas, refuerzos y evaluaciones fuera del horario de clases.

## 📋 Características

- **Autenticación de usuarios** con roles (Profesor/Estudiante)
- **Panel de Profesor**: Gestión de tareas, clases y seguimiento de estudiantes
- **Panel de Estudiante**: Visualización de tareas, entrega de trabajos y evaluaciones
- **Sistema de evaluación** con preguntas de selección múltiple y temporizador
- **Interfaz responsiva** compatible con web y móvil

## 🚀 Instalación y Ejecución

### Requisitos Previos
- Node.js (versión 14 o superior)
- npm (viene con Node.js)

### Pasos para Ejecutar el Proyecto

1. **Abre el CMD (Símbolo del sistema) en Windows**
   - Presiona `Win + R`
   - Escribe `cmd` y presiona Enter

2. **Navega a la carpeta del proyecto**
   ```bash
   cd ruta/donde/guardaste/extraeduc
   ```
   Ejemplo: `cd C:\Users\TuUsuario\Desktop\extraeduc`

3. **Instala las dependencias**
   ```bash
   npm install
   ```
   Este comando instalará todas las librerías necesarias (React, Tailwind CSS, Lucide Icons, etc.)

4. **Instala Tailwind CSS y sus dependencias**
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   ```

5. **Inicia la aplicación**
   ```bash
   npm start
   ```

6. **Abre tu navegador**
   La aplicación se abrirá automáticamente en `http://localhost:3000`
   Si no se abre, copia esta URL y pégala en tu navegador.

## 🔑 Credenciales de Prueba

### Profesor
- **Email**: profesor@espe.edu.ec
- **Contraseña**: 123456

### Estudiante
- **Email**: estudiante@espe.edu.ec
- **Contraseña**: 123456

## 📁 Estructura del Proyecto

```
extraeduc/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.js              # Encabezado de la aplicación
│   │   ├── Sidebar.js             # Barra lateral de navegación
│   │   ├── Login.js               # Componente de inicio de sesión
│   │   ├── ProfesorDashboard.js   # Dashboard del profesor
│   │   └── EstudianteDashboard.js # Dashboard del estudiante
│   ├── pages/
│   │   ├── ProfesorInicio.js      # Página de inicio del profesor
│   │   ├── ProfesorTareas.js      # Gestión de tareas del profesor
│   │   ├── EstudianteInicio.js    # Página de inicio del estudiante
│   │   ├── EstudianteTareas.js    # Tareas del estudiante
│   │   ├── Clases.js              # Página de clases (compartida)
│   │   └── Evaluacion.js          # Sistema de evaluación
│   ├── data/
│   │   └── mockData.js            # Datos precargados
│   ├── App.js                     # Componente principal
│   ├── App.css                    # Estilos principales
│   ├── index.js                   # Punto de entrada
│   └── index.css                  # Estilos globales
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🎨 Funcionalidades por Rol

### Profesor
- ✅ Ver estadísticas de clases y estudiantes
- ✅ Crear nuevas tareas con tipo y fecha de entrega
- ✅ Gestionar tareas existentes
- ✅ Ver información de clases

### Estudiante
- ✅ Ver resumen de tareas pendientes y completadas
- ✅ Descargar materiales de las tareas
- ✅ Subir archivos como entrega
- ✅ Realizar evaluaciones con temporizador
- ✅ Ver calificaciones inmediatas

## 🛠️ Tecnologías Utilizadas

- **React 18**: Framework principal
- **Tailwind CSS**: Estilos y diseño responsivo
- **Lucide React**: Iconos modernos
- **React Hooks**: Gestión de estado (useState, useEffect)

## 📝 Notas Importantes

- Este es un prototipo con datos precargados (mock data)
- No se conecta a una base de datos real
- Los archivos subidos se simulan pero no se almacenan
- Perfecto para demostración y presentación del proyecto

## 🐛 Solución de Problemas

### Si npm install falla:
```bash
npm cache clean --force
npm install
```

### Si el puerto 3000 está ocupado:
```bash
npm start
# Te preguntará si quieres usar otro puerto, selecciona "Y"
```

### Si hay errores de Tailwind:
```bash
npx tailwindcss init -p
npm start
```

## 👥 Autor

Proyecto desarrollado para la asignatura de Aplicaciones Distribuidas
Universidad de las Fuerzas Armadas ESPE

## 📄 Licencia

Este proyecto es de uso educativo.
