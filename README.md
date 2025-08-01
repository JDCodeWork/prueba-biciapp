# 🏗️ Arquitectura del Proyecto

```text
src/
├── main.ts              # Punto de entrada de la aplicación
├── app.module.ts        # Módulo raíz
├── bikes/               # Módulo de bicicletas
│   ├── bikes.controller.ts
│   ├── bikes.service.ts
│   └── bikes.module.ts
└── stations/            # Módulo de estaciones
    ├── stations.controller.ts
    ├── stations.service.ts
    └── stations.module.ts
```

## 📚 Conceptos Fundamentales de NestJS

### 🎮 Controladores (Controllers)

Los **controladores** manejan las peticiones HTTP y devuelven respuestas. En nuestro proyecto tenemos:

#### Bikes Controller (`src/bikes/bikes.controller.ts`)

```typescript
@Controller('bikes')  // Define la ruta base: /bikes
export class BikesController {
  constructor(private readonly bikesService: BikesService) { }

  @Get()    // GET /bikes - Obtener todas las bicicletas
  getAllBikes(): Bike[] {
    return this.bikesService.getAllBikes()
  }

  @Post()   // POST /bikes - Crear una nueva bicicleta
  createBike(@Body() cuerpo: Bike) {
    return this.bikesService.createBike(cuerpo.no, cuerpo.status)
  }
}
```

#### Stations Controller (`src/stations/stations.controller.ts`)

```typescript
@Controller('stations')  // Define la ruta base: /stations
export class StationsController {
  @Post()   // POST /stations - Crear una nueva estación
  create(@Body() { name }: { name: string }) {
    return this.stationsService.create(name);
  }

  @Get()    // GET /stations - Obtener todas las estaciones
  findAll() {
    return this.stationsService.findAll();
  }
}
```

### 🔧 Servicios (Services)

Los **servicios** contienen la lógica de negocio y pueden ser inyectados en otros componentes:

#### Bikes Service

```typescript
@Injectable()  // Permite que este servicio sea inyectado
export class BikesService {
  bikeList: Bike[] = [{ no: 10, status: 'disponible' }]

  getAllBikes() {
    return this.bikeList  // Retorna todas las bicicletas
  }

  createBike(no: number, status: BikeStatus) {
    this.bikeList.push({ no, status })  // Agrega una nueva bicicleta
  }
}
```

### 📦 Módulos (Modules)

Los **módulos** organizan y agrupan componentes relacionados:

```typescript
@Module({
  providers: [BikesService],      // Servicios disponibles en este módulo
  controllers: [BikesController]  // Controladores de este módulo
})
export class BikesModule {}
```

## 🌐 HTTP Methods

### ¿Qué son los métodos HTTP?

Imagina que tu API es como un restaurante:

- **GET**: "¿Qué hay en el menú?" (solo quieres ver, no cambias nada)
- **POST**: "Quiero ordenar este plato" (agregas algo nuevo)
- **PUT**: "Cambia toda mi orden" (reemplazas todo)
- **DELETE**: "Cancela mi orden" (eliminas algo)

#### GET - "Dame información"

- `GET /bikes` → "Muéstrame todas las bicicletas que tenemos"
- `GET /stations` → "Muéstrame todas las estaciones"

#### POST - "Agrega algo nuevo"

- `POST /bikes` → "Registra esta nueva bicicleta en el sistema"
- `POST /stations` → "Crea una nueva estación"

### 📋 Ejemplos Prácticos

#### Obtener todas las bicicletas

```bash
GET http://localhost:3000/bikes
```

Respuesta:

```json
[
  { "no": 10, "status": "disponible" }
]
```

#### Crear una nueva bicicleta

```bash
POST http://localhost:3000/bikes
Content-Type: application/json

{
  "no": 25,
  "status": "ocupada"
}
```

#### Crear una nueva estación

```bash
POST http://localhost:3000/stations
Content-Type: application/json

{
  "name": "Estación Central"
}
```

## 🛠️ CLI de NestJS - Nuestro Generador de Código Automático

### ¿Por qué usar el CLI?

Porque escribir código repetitivo es aburrido y propenso a errores. El CLI nos genera:

- ✅ La estructura correcta de archivos
- ✅ Imports automáticos
- ✅ Código que sigue las mejores prácticas
- ✅ Tests básicos (que podemos personalizar después)

### Los comandos que MÁS vamos a usar en nuestro proyecto

#### 🚀 Crear un módulo completo de una vez

```bash
# Esto es GOLD - genera todo lo que necesitas
nest g res users
# Te pregunta si quieres REST API, GraphQL, etc. - siempre elige REST API
```

**¿Qué crea?** TODO lo que necesitas:

- Controller con endpoints GET, POST, PUT, DELETE
- Service con métodos básicos
- Module que conecta todo
- DTOs para validación
- Entity para la estructura de datos

#### 🎯 Para nuestro proyecto futuro, probablemente haremos

```bash
nest g res users        # Módulo de usuarios
nest g res products     # Módulo de productos  
nest g res orders       # Módulo de órdenes
nest g res auth         # Módulo de autenticación
```

### 💡 Ejemplo Práctico

Si quisieras agregar un módulo de "usuarios" a este proyecto:

```bash
# Esto crearía automáticamente:
# - src/users/users.controller.ts
# - src/users/users.service.ts
# - src/users/users.module.ts
# - src/users/dto/create-user.dto.ts
# - src/users/dto/update-user.dto.ts
# - src/users/entities/user.entity.ts

nest g res users
```

### 📁 Estructura que Genera el CLI

Cuando usas `nest g res users`, obtienes:

```text
src/users/
├── dto/
│   ├── create-user.dto.ts    # Data Transfer Object para crear
│   └── update-user.dto.ts    # Data Transfer Object para actualizar
├── entities/
│   └── user.entity.ts        # Definición de la entidad
├── users.controller.ts       # Controlador con CRUD completo
├── users.service.ts          # Servicio con métodos CRUD
└── users.module.ts           # Módulo que agrupa todo
```

## 💻 Configuración del Proyecto

### Instalación

```bash
pnpm install
```

### Ejecutar el proyecto

```bash
# modo desarrollo (recompila automáticamente al guardar)
pnpm run start:dev

# modo desarrollo normal
pnpm run start

# modo producción
pnpm run start:prod
```

La aplicación estará disponible en: `http://localhost:3000`

## 📖 Conceptos que NECESITAMOS dominar para el proyecto

### 🔑 Decoradores que vamos a usar TODO el tiempo

**Para el nuevo en backend:** Estos son como "etiquetas" que le dicen a NestJS qué hacer.

**Para el de FastAPI:** Son como los decoradores `@app.get()` que ya conoces, pero más potentes.

- `@Controller('users')`: Define las rutas base (como `/users`)
- `@Get()`, `@Post()`, `@Put()`, `@Delete()`: Los métodos HTTP
- `@Body()`: Para obtener datos del request body (como `request.json()`)
- `@Param('id')`: Para obtener parámetros de la URL (`/users/123`)
- `@Injectable()`: Para servicios que se pueden inyectar

### 🔄 Inyección de Dependencias (DI) - Concepto CLAVE

**¿Por qué nos importa?** Porque vamos a tener servicios que dependen de otros servicios.

```typescript
// En lugar de esto (malo):
export class UsersController {
  constructor() {
    this.usersService = new UsersService(); // ❌ Manual y difícil de testear
    this.emailService = new EmailService(); // ❌ Se vuelve un lío
  }
}

// NestJS hace esto (bueno):
export class UsersController {
  constructor(
    private readonly usersService: UsersService,    // ✅ Auto-inyectado
    private readonly emailService: EmailService,   // ✅ Auto-inyectado
  ) {}
}
```

### 📁 Estructura Recomendada por Funcionalidad

```text
src/
├── common/              # Código compartido
├── config/              # Configuraciones
├── feature-name/        # Cada funcionalidad en su carpeta
│   ├── dto/            # Data Transfer Objects
│   ├── entities/       # Definiciones de entidades
│   ├── feature.controller.ts
│   ├── feature.service.ts
│   └── feature.module.ts
└── main.ts
```

## 🔗 Recursos Útiles

- [Documentación Oficial de NestJS](https://docs.nestjs.com)
- [CLI Commands Reference](https://docs.nestjs.com/cli/overview)
- [HTTP Methods Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
