# 🚴‍♂️ BiciApp - Nuestro Proyecto Backend con NestJS

## 🎯 Estado actual del proyecto

### ✅ **Implementado y funcionando:**

- **Base de datos real:** PostgreSQL con Docker
- **Validaciones robustas:** DTOs con class-validator  
- **ORM profesional:** TypeORM con entities
- **Arquitectura modular:** Separation of concerns
- **DevOps básico:** Docker Compose + variables de entorno

### 🏗️ Arquitectura actual

```text
src/
├── main.ts                     # ValidationPipe global configurado
├── app.module.ts              # TypeORM + PostgreSQL configurado  
├── bikes/                     # Módulo completo con DB
│   ├── dto/
│   │   └── create-bike.dto.ts # Validaciones automáticas
│   ├── entities/
│   │   └── bike.entity.ts     # Entity para PostgreSQL
│   ├── bikes.controller.ts    # CRUD con validación
│   ├── bikes.service.ts       # Repository pattern
│   └── bikes.module.ts        # TypeORM configurado
└── stations/                  # Módulo básico (próximo a actualizar)
    ├── stations.controller.ts
    ├── stations.service.ts
    └── stations.module.ts
```

### 🗃️ Infrastructure

```text
docker-compose.yaml            # PostgreSQL containerizada
.env                          # Variables de entorno (crear este archivo)
postgres/                     # Datos persistentes (auto-generado)
```

## 📚 Documentación del Proyecto

### 🎓 **Guías de aprendizaje**

1. **[README.md](./README.md)** - Conceptos básicos que ya dominamos
2. **[CONCEPTOS_AVANZADOS.md](./docs/2da-parte/CONCEPTOS_AVANZADOS.md)** - DTOs, Entities, TypeORM explicados
3. **[PROYECTO_ACTUAL.md](./docs/2da-parte/PROYECTO_ACTUAL.md)** - Estado técnico del proyecto

### 🚀 **Para empezar a trabajar**

```bash
# 1. Levantar la base de datos
docker-compose up

# 2. Instalar dependencias  
bun install

# 3. Ejecutar en modo desarrollo
bun run start:dev

# 4. Probar que todo funciona
# GET http://localhost:3000/bikes
# POST http://localhost:3000/bikes con { "no": 25, "status": "disponible" }
```

### 🎯 **Lo que pueden hacer ahora mismo**

- ✅ Crear bicicletas con validación automática
- ✅ Ver las bicicletas guardadas en PostgreSQL  
- ✅ Modificar el DTO para agregar nuevas validaciones
- ✅ Agregar nuevas columnas a la Entity
- ✅ Experimentar con Docker y PostgreSQL

## 🔧 Configuración Inicial

### 🎮 Controladores - Lo que YA dominamos

#### Ejemplo actual de nuestro Bikes Controller

```typescript
@Controller('bikes')
export class BikesController {
  constructor(private readonly bikesService: BikesService) {}

  @Get()  // GET /bikes - Con datos reales de PostgreSQL
  getAllBikes(): Promise<Bike[]> {
    return this.bikesService.getAllBikes();
  }

  @Post() // POST /bikes - Con validación automática de DTOs
  createBike(@Body() createBikeDto: CreateBikeDto): Promise<Bike> {
    return this.bikesService.createBike(createBikeDto);
  }

  @Delete(':id') // DELETE /bikes/:id - Con UUIDs
  deleteBike(@Param('id') id: string): Promise<void> {
    return this.bikesService.deleteBike(id);
  }
}
```

**¿Qué cambió desde lo básico?**

- 💾 **Datos reales:** Se guardan en PostgreSQL (no en memoria)
- ✅ **Validación automática:** Los DTOs validan automáticamente
- 🆔 **UUIDs:** IDs únicos profesionales (no números)
- 🔄 **Async/Await:** Operaciones asíncronas (base de datos)

#### Lo que aprendimos de Stations Controller

```typescript
@Controller('stations')
export class StationsController {
  @Post()   // POST /stations - Todavía básico (próximo a actualizar)
  create(@Body() { name }: { name: string }) {
    return this.stationsService.create(name);
  }

  @Get()    // GET /stations - Array en memoria (por ahora)
  findAll() {
    return this.stationsService.findAll();
  }
}
```

### 🔧 Servicios - Ahora con Repository Pattern

#### Nuestro Bikes Service actualizado

```typescript
@Injectable()
export class BikesService {
  constructor(
    @InjectRepository(Bike)  // 🔥 Esto es Repository Pattern
    private bikeRepository: Repository<Bike>,
  ) {}

  // Ya no usamos arrays - usamos PostgreSQL
  async getAllBikes(): Promise<Bike[]> {
    return this.bikeRepository.find();  // SELECT * FROM bikes
  }

  async createBike(createBikeDto: CreateBikeDto): Promise<Bike> {
    const bike = this.bikeRepository.create(createBikeDto);
    return this.bikeRepository.save(bike);  // INSERT INTO bikes
  }

  async deleteBike(id: string): Promise<void> {
    await this.bikeRepository.delete(id);  // DELETE FROM bikes WHERE id = ?
  }
}
```

**¿Qué aprendimos aquí?**

- 🗄️ **Repository Pattern:** La forma profesional de manejar datos
- 💉 **Dependency Injection:** `@InjectRepository` nos da acceso a la DB
- ⚡ **Operaciones async:** Todo es asíncrono con la base de datos
- 🔄 **TypeORM methods:** `find()`, `create()`, `save()`, `delete()`

### 📦 Módulos - Ahora con TypeORM Configuration

```typescript
@Module({
  imports: [
    TypeOrmModule.forFeature([Bike])  // 🔥 Registra la Entity para DI
  ],
  providers: [BikesService],      // Service con Repository inyectado
  controllers: [BikesController]  // Controller que maneja HTTP
})
export class BikesModule {}
```

**¿Qué es nuevo aquí?**

- 🔗 **TypeOrmModule.forFeature([Bike]):** Registra nuestra Entity
- 💉 **Dependency Injection:** Permite que el Repository se inyecte
- 🏗️ **Architecture:** Separación limpia de responsabilidades

### 🎯 **Conceptos clave que YA dominamos**

#### ✅ DTOs (Data Transfer Objects)

```typescript
export class CreateBikeDto {
  @IsInt()
  @Min(0)
  @Max(300)
  no: number;

  @IsString()
  @IsIn(['disponible', 'ocupada', 'mantenimiento'])
  status: string;
}
```

#### ✅ Entities (Base de datos)

```typescript
@Entity()
export class Bike {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  no: number;

  @Column()
  status: string;
}
```

#### ✅ Validación automática en `main.ts`

```typescript
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,           // Solo acepta campos definidos en DTO
    forbidNonWhitelisted: true // Rechaza campos extra
  })
);
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

## 📖 Conceptos básicos como referencia

### 🌐 HTTP Methods que usamos

- **GET**: "Dame información" (no cambia nada)
  - `GET /bikes` → "Muéstrame todas las bicicletas"
- **POST**: "Agrega algo nuevo"  
  - `POST /bikes` → "Registra esta bicicleta"
- **DELETE**: "Elimina algo"
  - `DELETE /bikes/uuid` → "Elimina esta bicicleta"

### 🔑 Decoradores importantes

- `@Controller('bikes')`: Define ruta base `/bikes`
- `@Get()`, `@Post()`, `@Delete()`: Métodos HTTP
- `@Body()`: Obtiene datos del body (validados automáticamente)
- `@Param('id')`: Parámetros de URL
- `@Injectable()`: Servicios inyectables
- `@Entity()`: Tablas de PostgreSQL
- `@Column()`: Columnas de la tabla
- `@IsInt()`, `@IsString()`: Validaciones automáticas

## 🔗 Recursos adicionales

- [NestJS Docs](https://docs.nestjs.com) - Documentación oficial
- [TypeORM Docs](https://typeorm.io) - ORM que usamos  
- [class-validator](https://github.com/typestack/class-validator) - Validaciones
- [PostgreSQL Docs](https://www.postgresql.org/docs/) - Base de datos

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

- [HTTP Methods Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
