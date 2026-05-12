# Ejemplo JWT con NestJS (backend) y React (frontend)

Este repositorio contiene un ejemplo didáctico para la clase sobre autenticación con JWT.
Incluye dos proyectos dentro de la carpeta `jwt_ejemplo`:

- `back-nest-jwt`: API backend en NestJS que genera un JWT al iniciar sesión.
- `front-login`: frontend simple (React + Vite) que solicita el token y lo guarda en `localStorage`.

Las instrucciones siguientes describen qué se implementó en cada proyecto, cómo ejecutar, y cómo probar los JWT (verificación con https://www.jwt.io/). El backend se construyó siguiendo la documentación oficial de NestJS sobre autenticación: https://docs.nestjs.com/security/authentication

**Requisitos**

- Node.js >= 16
- npm
- MySQL

**Estructura relevante**

- `jwt_ejemplo/back-nest-jwt` — proyecto NestJS
- `jwt_ejemplo/front-login` — proyecto React + Vite

**Resumen rápido**

- El backend expone `POST /auth/login` que devuelve un objeto `{ access_token: string }` si las credenciales son correctas.
- El frontend envía las credenciales a `http://localhost:3000/auth/login`, muestra y guarda el token en `localStorage`.

---

**Backend (jwt_ejemplo/back-nest-jwt)**

Descripción: ejemplo mínimo con TypeORM (MySQL) y `@nestjs/jwt` para firmar tokens.

1) Instalación y ejecución

```bash
cd jwt_ejemplo/back-nest-jwt
npm install
# Asegúrate de tener una base de datos MySQL y crear la BD 'jwt_example'

# Ejecutar en modo desarrollo
npm run start:dev
```

El servidor escucha por defecto en el puerto `3000`.

2) Configuración de la base de datos

La conexión TypeORM está en `src/app.module.ts` con configuración por defecto:

```ts
TypeOrmModule.forRoot({
	type: 'mysql',
	host: 'localhost',
	port: 3306,
	username: 'root',
	password: 'root',
	database: 'jwt_example',
	entities: [User],
	synchronize: true,
})
```

Modifica estos valores según tu entorno o usa variables de entorno para mayor seguridad.

3) Endpoints principales implementados

- `POST /users` — crea un usuario (body JSON: `{ "username": "Roberto", "password": "123" }`).
- `POST /auth/login` — inicia sesión (body JSON: `{ "username": "Roberto", "password": "123" }`) y devuelve `{ access_token }`.

Ejemplo para crear un usuario:

```bash
curl -X POST http://localhost:3000/users \
	-H "Content-Type: application/json" \
	-d '{"username":"Roberto","password":"123"}'
```

Ejemplo para iniciar sesión y obtener JWT:

```bash
curl -X POST http://localhost:3000/auth/login \
	-H "Content-Type: application/json" \
	-d '{"username":"Roberto","password":"123"}'

# Respuesta esperada:
# { "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..." }
```

4) Configuración JWT en el ejemplo

- El secreto y opciones están en `src/auth/constants.ts` y `src/auth/auth.module.ts`.
- En el ejemplo el valor por defecto (advertencia: no usar en producción) está hardcodeado en `jwtConstants.secret`:

```ts
// src/auth/constants.ts
export const jwtConstants = {
	secret: 'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
};
```

Y el `JwtModule` se registra así (observa `expiresIn: '60s'` por defecto):

```ts
JwtModule.register({
	global: true,
	secret: jwtConstants.secret,
	signOptions: { expiresIn: '60s' },
});
```

Recomendación: mover el `secret` a una variable de entorno y aumentar `expiresIn` según necesidades:

```bash
export JWT_SECRET="mi_secreto_super_seguro"
```

Y en el código usar `process.env.JWT_SECRET` como fuente.

5) Verificar token con jwt.io

- Copia el `access_token` recibido al iniciar sesión.
- Abre https://www.jwt.io/ y pega el token en la caja "Encoded".
- En la sección "Verify signature" pega el secret (el mismo que usa el servidor) para comprobar la firma.

6) Notas sobre seguridad y mejoras

- Las contraseñas aquí se almacenan en texto plano (ejemplo didáctico). En producción: usa hashing (bcrypt), validación, y políticas seguras.
- Actualmente el ejemplo NO implementa `JwtStrategy` ni `AuthGuard` para proteger rutas. Para proteger endpoints sigue la guía oficial de NestJS (Passport + passport-jwt) y usa `@UseGuards(AuthGuard('jwt'))` en los controladores.
- Considera usar refresh tokens, HTTPS, y configuración adecuada de CORS para entornos reales.

---

**Frontend (jwt_ejemplo/front-login)**

Proyecto: React + Vite. Formulario mínimo que envía `username` y `password` a `http://localhost:3000/auth/login`.

1) Instalación y ejecución

```bash
cd jwt_ejemplo/front-login
npm install
npm run dev
# Abre http://localhost:5173 en el navegador
```

2) Flujo del ejemplo

- La UI inicial (archivo `src/App.tsx`) trae valores por defecto: `username: 'Roberto'` y `password: '123'` para facilitar las pruebas.
- Al enviar el formulario el frontend realiza una petición `POST` a `http://localhost:3000/auth/login` y, si tiene éxito, guarda el token en `localStorage` con clave `token` y lo muestra en pantalla.

3) Código relevante

- Petición que hace el frontend (extracto):

```js
fetch('http://localhost:3000/auth/login', {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify({ username, password }),
})
```

4) Probar manualmente

- Levanta backend y frontend.
- Crea un usuario (si no existe) con `POST /users` y luego usa el formulario del frontend para iniciar sesión.
- Copia el token que aparece y pégalo en https://www.jwt.io/ para inspeccionar el payload.

## La proxima clase continuamos con la implementación de `JwtStrategy` y protección de rutas usando `AuthGuard('jwt')` en el backend, y cómo enviar el token desde el frontend para acceder a rutas protegidas.

5) Uso del token en peticiones

Aunque en este ejemplo las rutas no están protegidas, la forma estándar de enviar el token es mediante el header `Authorization: Bearer <token>`.

Ejemplo con curl:

```bash
curl -H "Authorization: Bearer <TOKEN>" http://localhost:3000/users
```

---

**Recursos y referencias**

- Documentación oficial NestJS — Authentication: https://docs.nestjs.com/security/authentication
- JWT debugger / viewer: https://www.jwt.io/

**Sugerencias para la clase / tareas propuestas**

- Implementar `JwtStrategy` y proteger al menos un endpoint con `AuthGuard('jwt')`.
- Reemplazar el almacenamiento de contraseñas por `bcrypt`.
- Mover configuración sensible (secret, DB credentials) a variables de entorno y/o `@nestjs/config`.
- Añadir tests básicos que verifiquen la emisión del token y la protección de rutas.

---

Si querés que agregue instrucciones para proteger rutas paso a paso (instalación de `passport-jwt`, `JwtStrategy`, examples de `@UseGuards`), lo documento y lo agrego al README.

