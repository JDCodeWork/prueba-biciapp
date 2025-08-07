# 📖 Lo que REALMENTE necesitamos saber para nuestro proyecto backend

Esta es nuestra "cheat sheet" de NestJS.

## 🧩 Los 3 Conceptos que SÍ O SÍ necesitamos dominar

### 1. 🎮 Controllers = Nuestras Rutas HTTP

```typescript
// NestJS (lo que vamos a usar)
@Controller('users')  
export class UsersController {
  @Get()
  findAll() {
    return 'Lista de usuarios';
  }

  @Post()
  create(@Body() userData: any) {
    return 'Usuario creado';
  }
}
```

- `@Get()` - Para obtener datos
- `@Post()` - Para crear datos
- `@Put()` - Para actualizar datos completos
- `@Patch()` - Para actualizar datos parciales
- `@Delete()` - Para eliminar datos

### 2. 🔧 Services (Servicios)

**¿Qué hacen?** Contienen la lógica de negocio y pueden ser inyectados en otros componentes.

```typescript
@Injectable()  // Permite inyección de dependencias
export class BikesService {
  private bikes = [];

  findAll() {
    return this.bikes;  // Lógica de negocio
  }

  create(bike: any) {
    this.bikes.push(bike);
    return bike;
  }
}
```

### 3. 📦 Modules (Módulos)

**¿Qué hacen?** Organizan y agrupan componentes relacionados.

```typescript
@Module({
  controllers: [BikesController],  // Controladores del módulo
  providers: [BikesService],       // Servicios disponibles
  exports: [BikesService]          // Qué exponer a otros módulos
})
export class BikesModule {}
```

## 🌐 Métodos HTTP - ¿Cuándo usar cada uno?

| Método | Propósito | Ejemplo de Uso |
|--------|-----------|----------------|
| **GET** | Obtener datos | Listar bicicletas |
| **POST** | Crear datos nuevos | Agregar una bicicleta |
| **PUT** | Actualizar todo el objeto | Cambiar todos los datos de una bicicleta |
| **PATCH** | Actualizar parte del objeto | Cambiar solo el estado de una bicicleta |
| **DELETE** | Eliminar datos | Borrar una bicicleta |

### Ejemplos Prácticos

```typescript
@Controller('bikes')
export class BikesController {
  // GET /bikes - Obtener todas las bicicletas
  @Get()
  findAll() {
    return this.bikesService.findAll();
  }

  // GET /bikes/5 - Obtener bicicleta específica
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bikesService.findOne(id);
  }

  // POST /bikes - Crear nueva bicicleta
  @Post()
  create(@Body() createBikeDto: any) {
    return this.bikesService.create(createBikeDto);
  }

  // PUT /bikes/5 - Actualizar bicicleta completa
  @Put(':id')
  update(@Param('id') id: string, @Body() updateBikeDto: any) {
    return this.bikesService.update(id, updateBikeDto);
  }

  // PATCH /bikes/5 - Actualizar parcialmente
  @Patch(':id')
  updatePartial(@Param('id') id: string, @Body() changes: any) {
    return this.bikesService.updatePartial(id, changes);
  }

  // DELETE /bikes/5 - Eliminar bicicleta
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bikesService.remove(id);
  }
}
```

## 🎯 Decoradores Importantes

### En Controladores

- `@Controller('ruta')` - Define el controlador y su ruta base
- `@Get()`, `@Post()`, etc. - Define el método HTTP
- `@Param('id')` - Obtiene parámetros de la URL (/bikes/5)
- `@Body()` - Obtiene el cuerpo de la petición
- `@Query()` - Obtiene parámetros de consulta (?page=1&limit=10)

### En Servicios

- `@Injectable()` - Permite que el servicio sea inyectado

### En Módulos

- `@Module()` - Define un módulo

## 🔄 Inyección de Dependencias

**¿Qué es?** Un patrón donde NestJS automáticamente "inyecta" las dependencias que necesitas.

```typescript
@Controller('bikes')
export class BikesController {
  // NestJS automáticamente crea una instancia de BikesService
  constructor(private readonly bikesService: BikesService) {}
  
  @Get()
  findAll() {
    // Usamos el servicio inyectado
    return this.bikesService.findAll();
  }
}
```

**¡Sin inyección de dependencias tendrías que hacer esto:**

```typescript
// ❌ Sin DI (malo)
export class BikesController {
  constructor() {
    this.bikesService = new BikesService(); // Manual y difícil de testear
  }
}
```

## 📁 Estructura de Proyecto Recomendada

```text
src/
├── main.ts                 # Punto de entrada
├── app.module.ts          # Módulo raíz
├── common/                # Código compartido
│   ├── filters/
│   ├── guards/
│   └── interceptors/
├── users/                 # Módulo de usuarios
│   ├── dto/
│   ├── entities/
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
└── products/              # Módulo de productos
    ├── dto/
    ├── entities/
    ├── products.controller.ts
    ├── products.service.ts
    └── products.module.ts
```

## 🛠️ Flujo de Desarrollo con CLI

### 1. Crear nuevo recurso

```bash
nest g res products
```

### 2. Lo que se genera automáticamente

- ✅ Controller con CRUD básico
- ✅ Service con métodos básicos
- ✅ Module que los conecta
- ✅ DTOs para validación
- ✅ Entity para definir la estructura
- ✅ Tests básicos

### 3. Lo que debes hacer después

- 📝 Implementar la lógica de negocio en el service
- 🔧 Agregar validaciones en los DTOs
- 🗃️ Conectar a base de datos
- 🧪 Escribir tests específicos

## 💡 Conceptos Avanzados (Para después)

### Guards (Guardias)

Protegen rutas (autenticación, autorización):

```typescript
@UseGuards(AuthGuard)
@Get('protected')
getProtectedData() {
  return 'Solo usuarios autenticados';
}
```

### Pipes (Tuberías)

Transforman o validan datos:

```typescript
@Post()
create(@Body(ValidationPipe) createDto: CreateBikeDto) {
  return this.bikesService.create(createDto);
}
```

### Interceptors (Interceptores)

Modifican requests/responses:

```typescript
@UseInterceptors(LoggingInterceptor)
@Get()
findAll() {
  return this.bikesService.findAll();
}
```

## 🔍 Preguntas Frecuentes

### ¿Cuál es la diferencia entre Service y Controller?

- **Controller**: Maneja HTTP, rutas, request/response
- **Service**: Contiene lógica de negocio, acceso a datos

### ¿Por qué usar inyección de dependencias?

- ✅ Código más testeable
- ✅ Mejor organización
- ✅ Fácil intercambio de implementaciones
- ✅ NestJS maneja el ciclo de vida automáticamente

### ¿Cuándo crear un nuevo módulo?

- ✅ Cuando tienes una funcionalidad independiente
- ✅ Cuando quieres organizar mejor tu código
- ✅ Cuando planeas reutilizar componentes

### ¿Debo crear todo con el CLI?

- ✅ Sí para empezar (consistency + velocidad)
- ✅ Después puedes personalizar
- ✅ El CLI sigue las mejores prácticas

### Pendiente

**Primera clase:** Entender lo básico

- Controllers, Services, Modules
- Hacer funcionar GET y POST
- Que todos podamos correr el proyecto

**Segunda:** Generar código como pros

- Validaciones con DTOs
- Base de datos
