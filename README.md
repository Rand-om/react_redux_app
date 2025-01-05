# Frontend - React

Este es el frontend del proyecto, desarrollado en React. A continuación se detallan los pasos para descargar, instalar y poner en marcha el frontend.

## Requisitos previos

- [Node.js v18.20.5](https://nodejs.org/en/) (se recomienda esta versión).

## Pasos para ejecutar el Frontend

1. **Clonar el repositorio:**
   Ejecuta el siguiente comando para clonar el repositorio desde GitHub:

   ```bash
   git clone https://github.com/Rand-om/react_redux_app.git
   ```

2. **Crear archivo `.env`:**
   Crea un archivo llamado `.env` en la raíz del proyecto y agrega la siguiente variable de entorno:

   ```
   VITE_API_URL=http://localhost:3000
   ```

   Esta variable establece la URL de la API, que apunta al backend que se está ejecutando en el puerto `3000`. Asegúrate de que el backend esté corriendo en ese puerto.

3. **Instalar dependencias:**
   Una vez que hayas clonado el repositorio, navega al directorio del proyecto:

   ```bash
   cd react_redux_app
   ```

   Luego instala las dependencias necesarias utilizando `npm`:

   ```bash
   npm install
   ```

4. **Iniciar el servidor de desarrollo:**
   Para iniciar el servidor de desarrollo y levantar el proyecto, ejecuta:

   ```bash
   npm run dev
   ```

   El proyecto debería estar corriendo en el puerto especificado en la configuración de Vite (por defecto, `localhost:5173`).

5. **Verificar el funcionamiento:**
   Abre tu navegador y visita `http://localhost:5173` (o el puerto configurado por Vite) para verificar que el frontend está funcionando correctamente.

## Notas

- Si encuentras algún error relacionado con la versión de Node.js, asegúrate de que estás utilizando la versión recomendada (v18.20.5).
- Asegúrate de que el backend esté en funcionamiento en `http://localhost:3000` o en la URL correspondiente.
