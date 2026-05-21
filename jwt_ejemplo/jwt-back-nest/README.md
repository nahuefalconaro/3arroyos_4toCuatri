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

---

## Guards — Protección global de rutas
esto no lo vimos en clase pero es importante para entender cómo se usan los JWT en NestJS
Les dejo un ejemplo mínimo de cómo implementar un `AuthGuard` segun la docu que verifica el token en cada petición, y cómo marcar ciertas rutas como públicas (sin necesidad de token).

> Ref: https://docs.nestjs.com/security/authentication#enable-authentication-globally

En lugar de proteger cada controlador por separado, NestJS permite registrar un guard **globalmente**: todas las rutas quedan protegidas por defecto y se marca explícitamente qué rutas son **públicas** (login, registro, etc.).

No se necesita instalar `passport` ni ninguna librería extra; el `JwtService` de `@nestjs/jwt` ya provee `verifyAsync`.

---

### Paso 1 — Crear el decorador `@Public()`

Crear el archivo `src/auth/public.decorator.ts`:

```ts
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
```

Este decorador simplemente adjunta metadatos al método/controlador. El guard los leerá para decidir si dejar pasar la petición sin verificar token.

---

### Paso 2 — Crear el `AuthGuard` personalizado

Crear el archivo `src/auth/auth.guard.ts`:

```ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from './public.decorator';
import { jwtConstants } from './constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Si la ruta está marcada con @Public(), se deja pasar sin verificar token
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException();

    try {
      // verifyAsync valida la firma y la expiración usando el secret del JwtModule
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      // Adjuntamos el payload al request para usarlo en los controladores
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] =
      (request.headers as any).authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
```

---

### Paso 3 — Registrar el guard como global en `AuthModule`

Editar `src/auth/auth.module.ts` y agregar `APP_GUARD`:

```ts
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { jwtConstants } from './constants';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard, // <-- protege TODAS las rutas por defecto
    },
  ],
})
export class AuthModule {}
```

---

### Paso 4 — Marcar como públicas las rutas que no requieren token

En `src/auth/auth.controller.ts`, decorar el endpoint de login con `@Public()`:

```ts
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()              // <-- no requiere token
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, string>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
}
```

Lo mismo para `POST /users` (crear usuario):

```ts
// src/users/users.controller.ts
@Public()   // <-- agregar arriba del @Post()
@Post()
create(@Body() createUserDto: CreateUserDto) {
  return this.usersService.create(createUserDto);
}
```

---

### Prueba manual del Guard (verificación en clase)

**1. Levantar el servidor:**

```bash
cd jwt_ejemplo/back-nest-jwt
npm run start:dev
```

**2. Crear un usuario (ruta pública — debe funcionar sin token):**

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"username":"alumno","password":"clave"}'
```

**3. Iniciar sesión y guardar el token:**

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"alumno","password":"clave"}'

# Respuesta: { "access_token": "eyJhbGci..." }
# Copiar el valor de access_token
```

**4. Intentar acceder a una ruta protegida SIN token (debe devolver 401):**

```bash
curl http://localhost:3000/users
# Respuesta esperada: 401 Unauthorized
```

**5. Acceder con token válido (debe funcionar):**

```bash
curl http://localhost:3000/users \
  -H "Authorization: Bearer <TOKEN>"
# Respuesta esperada: lista de usuarios
```

**6. Probar expiración del token:**
- Con `expiresIn: '60s'`, esperar 70 segundos y repetir el paso 5.
- La respuesta debe ser `401 Unauthorized` porque el token expiró.

**7. Verificar el payload en jwt.io:**
- Abrir https://www.jwt.io/
- Pegar el `access_token` en la caja **Encoded**.
- En la sección **Payload** se verán los campos `username`, `sub` e `iat`/`exp`.
- En **Verify Signature** pegar el mismo `secret` definido en `constants.ts` para confirmar la firma.

---

## RBAC básico — Roles de usuario

> Ref: https://docs.nestjs.com/security/authorization#basic-rbac-implementation

Permite restringir el acceso a ciertos endpoints según el rol del usuario (ej: solo `admin` puede ver todos los usuarios).

---

### Paso 1 — Crear el enum de roles

Crear `src/auth/roles.enum.ts`:

```ts
export enum Role {
  User = 'user',
  Admin = 'admin',
}
```

---

### Paso 2 — Crear el decorador `@Roles()`

Crear `src/auth/roles.decorator.ts`:

```ts
import { SetMetadata } from '@nestjs/common';
import { Role } from './roles.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
```

---

### Paso 3 — Crear el `RolesGuard`

Crear `src/auth/roles.guard.ts`:

```ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from './roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Si el endpoint no tiene @Roles(), cualquier usuario autenticado puede acceder
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    // user viene del payload JWT adjuntado por el AuthGuard
    return requiredRoles.some((role) => user?.role === role);
  }
}
```

---

### Paso 4 — Agregar el campo `role` a la entidad `User`

Editar `src/users/entities/user.entity.ts`:

```ts
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from 'src/auth/roles.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: Role.User })
  role: Role;  // <-- nuevo campo
}
```

---

### Paso 5 — Incluir el `role` en el payload del JWT

Editar `src/auth/auth.service.ts` para incluir el rol en el token:

```ts
async signIn(usern: string, pass: string): Promise<any> {
  const user = await this.usersService.findOne(usern);
  if (user?.password !== pass) throw new UnauthorizedException();

  const payload = { username: user.username, sub: user.id, role: user.role };
  return { access_token: await this.jwtService.signAsync(payload) };
}
```

---

### Paso 6 — Registrar el `RolesGuard` y usarlo en el controlador

Agregar `RolesGuard` al `AuthModule`:

```ts
import { RolesGuard } from './roles.guard';

providers: [
  AuthService,
  { provide: APP_GUARD, useClass: AuthGuard },
  { provide: APP_GUARD, useClass: RolesGuard },  // <-- segundo guard global
],
```

Decorar el endpoint que se quiere restringir en `UsersController`:

```ts
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';

// Solo admins pueden ver todos los usuarios
@Roles(Role.Admin)
@Get()
findAll() {
  return this.usersService.findAll();
}
```

---

### Prueba manual del RBAC

**1. Crear un usuario `admin` con rol explícito (directamente en la BD o vía endpoint):**

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123","role":"admin"}'
```

**2. Iniciar sesión como `admin` y obtener token:**

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

**3. Acceder a `GET /users` con token de admin (debe funcionar — rol `admin`):**

```bash
curl http://localhost:3000/users \
  -H "Authorization: Bearer <TOKEN_ADMIN>"
```

**4. Iniciar sesión como usuario normal (`role: user`) y probar:**

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"alumno","password":"clave"}'

curl http://localhost:3000/users \
  -H "Authorization: Bearer <TOKEN_USER>"
# Respuesta esperada: 403 Forbidden
```

**5. Verificar el rol en jwt.io:**
- Pegar el token de admin en https://www.jwt.io/
- En el **Payload** se verá `"role": "admin"` junto con `username` y `sub`.
- Pegar el token del usuario normal y comprobar que tiene `"role": "user"`.

---