
# Repaso de Conceptos Básicos de React con API Pública

## Objetivo

Desarrollar una pequeña aplicación web utilizando React y Vite que permita a los estudiantes repasar los conceptos fundamentales de Componentes Funcionales, Hooks (`useState`, `useEffect`), y el consumo de datos de una API pública.

## Requisitos

### 1. Inicialización del Proyecto
- Crear un nuevo proyecto de React utilizando Vite.
- Limpiar el proyecto para tener una base mínima (borrar el contenido por defecto que no necesiten).


### 2. Estructura de Componentes
Crear al menos los siguientes componentes funcionales, dados como ejemplos:

- **App.jsx**: Componente principal que manejará la lógica de la aplicación y la gestión del estado global (o al menos el estado de los datos principales).
- **Header.jsx**: Componente de encabezado que incluya una barra de navegación.
	- Implementar un ruteador (por ejemplo, React Router) para navegar entre al menos dos secciones diferentes de la aplicación.
	- Ejemplo de secciones: "Lista de Items" y "Acerca de".
- **(opcional) Buscador.jsx**: Un componente que contendrá un campo de texto (`<input>`) para filtrar o buscar información y un botón de acción (opcional).
- **ListaItems.jsx**: Un componente que recibirá una lista de elementos (mediante props) y se encargará de renderizarlos.
- **ItemDetalle.jsx (opcional, pero recomendado)**: Un componente que muestre los detalles individuales de cada elemento de la lista.

Puedes utilizar otros componentes, estos son de modo ejemplificativo.

### 3. Consumo de la API
- Se utilizará una API pública a elección, específicamente el endpoint para obtener una lista de elementos.
- En el componente correspondiente, utilizar el Hook `useEffect` para realizar la llamada a la API solo al montar el componente.
- Opcional y para investigar ⇒ Manejar el estado de la carga de datos (por ejemplo, mostrar un mensaje de "Cargando..." mientras se obtienen los datos).


#### Ejemplos de APIs públicas para practicar

Puedes elegir cualquier API pública para consumir datos. Aquí algunos ejemplos útiles:

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) — Posts, usuarios, comentarios, etc.
- [PokeAPI](https://pokeapi.co/) — Información de Pokémon.
- [Rick and Morty API](https://rickandmortyapi.com/) — Personajes, episodios, etc.
- [OpenWeatherMap](https://openweathermap.org/api) — Datos meteorológicos (requiere registro).

Consulta más opciones o ejemplos en este enlace:
[Búsqueda de APIs públicas en Perplexity](https://www.perplexity.ai/search/fetch-https-jsonplaceholder-ty-OQQkosB7Q52BHIg2yFC82Q#1)

### 4. Gestión del Estado
Utilizar el Hook `useState` para manejar al menos los siguientes estados dentro de la aplicación:

- **data**: Almacenar la lista de Pokémon obtenida de la API. Inicialmente un array vacío.
- **(opcional) loading**: Un booleano para indicar si la solicitud a la API está en curso. (En caso de utilizarse la opción de manejo de carga de datos)

Opción para PROs!!!
- Agregar un **searchTerm** (en App.jsx o Buscador.jsx): La cadena de texto ingresada por el usuario en el componente Buscador. (opcional, si se implementa la funcionalidad de búsqueda/filtro)

### 5. Funcionalidad de Búsqueda/Filtro (Opcional)
- Implementar una función que filtre los elementos mostrados en ListaItems.jsx basándose en el valor del estado searchTerm.
- El componente Buscador.jsx debe actualizar el estado searchTerm en su componente padre (App.jsx) utilizando una función pasada como prop.
- El filtro debe ser sensible a mayúsculas/minúsculas (opcionalmente, convertir ambos a minúsculas antes de la comparación).

### 6. Presentación
- Dar un estilo básico a la aplicación para que sea visualmente presentable utilizando CSS plano, pueden utilizar Tailwind si ya lo conocen.


## Entregables
- El repo con el código fuente del proyecto React/Vite.
- La aplicación debe ser funcional y mostrar la lista de datos consumidos y permitir el filtrado de estos (en caso de implementar este último).

**Fecha de entrega:** 23/03 (aunque sea feriado y no tengamos clases, la entrega se mantiene para ese día).

---

Para registrar el grupo y el repositorio utilizar esta planilla:
[Registro de grupos y repositorios](https://docs.google.com/spreadsheets/d/1jdb7hEwkB8bZTKqvvbP8LKOkBqLj57Mey_ehLzxX01s/edit?usp=sharing)

---

## Clase: Conexión React + NestJS — Consumo de API propia

### Objetivo

Conectar la aplicación de React (frontend) con un servidor desarrollado en NestJS (backend), reemplazando el consumo de una API pública externa por una API propia.

### Contenido visto

#### 1. Configuración de CORS en NestJS
- Se agregó la configuración de **CORS** en el archivo `nestjs/nest-intro/src/main.ts` para permitir peticiones desde el origen del frontend (`http://localhost:5173`).
- Esto es necesario porque el navegador bloquea las peticiones cross-origin por defecto.

```ts
app.enableCors({
  origin: ['http://localhost:5173'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
});
```

#### 2. Nuevo componente `AddUser.tsx`
- Se creó el componente **AddUser** que implementa un formulario controlado con `useState`.
- El formulario permite ingresar **nombre** y **edad** de un usuario.
- Al enviar el formulario, se realiza una petición **POST** al endpoint `http://localhost:3000/usuarios` del servidor NestJS.
- Se utilizó `fetch` con método POST, headers `Content-Type: application/json` y el body serializado como JSON.

#### 3. Cambio de fuente de datos: API pública → API propia
- En el componente **Main.tsx**, se reemplazó la URL de la API pública (`jsonplaceholder.typicode.com/users`) por la URL del servidor local (`http://localhost:3000/usuarios`).
- Se adaptó la interfaz `User` para reflejar la estructura de datos que devuelve nuestro backend (`id`, `name`, `age`).
- Los campos `username`, `email` y `website` se marcaron como opcionales (`?`) para mantener compatibilidad, esto indica que los campos son opcionales.

#### 4. Actualización del componente `Card.tsx`
- Se modificó la interfaz `CardProps` para recibir `age` en lugar de `website`.
- La tarjeta ahora muestra la edad del usuario en lugar de su sitio web.

### Conceptos trabajados

- **CORS**: Configuración del backend para aceptar peticiones desde el frontend.
- **Fetch API (POST)**: Envío de datos a un servidor mediante formularios controlados.
- **useState con formularios**: Manejo de inputs controlados para nombre y edad.
- **Integración frontend-backend**: Comunicación completa entre la app React y el servidor NestJS.

### Requisitos para probar

1. Levantar el servidor NestJS:
   ```bash
   cd nestjs/nest-intro
   npm run start:dev
   ```
2. Levantar la app de React:
   ```bash
   cd repaso-react
   npm run dev
   ```
3. El formulario **AddUser** permitirá crear usuarios y el componente **Main** mostrará la lista obtenida del backend local.
