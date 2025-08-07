# 🚀 Nivel Avanzado - DTOs, Entities, TypeORM y Docker

## 🎯 Lo que acabamos de aprender

### ¿Qué son las Entities?

Son como "moldes" que definen cómo se van a guardar los datos en la base de datos.

```typescript
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()  // Le dice a TypeORM: "esto es una tabla"
export class Bike {
  @PrimaryGeneratedColumn('uuid')  // ID único automático
  id: string

  @Column({ type: 'integer' })     // Columna de número entero
  no: number

  @Column({ type: 'text' })        // Columna de texto
  status: string
}
```

### Decoradores importantes de TypeORM

- `@Entity()`: Define que esta clase es una tabla
- `@PrimaryGeneratedColumn('uuid')`: Crea un ID único automáticamente
- `@Column()`: Define una columna normal
- `@Column({ type: 'integer' })`: Especifica el tipo de dato

---

## 📝 DTOs - Validación de Datos

### ¿Qué son los DTOs?

**Data Transfer Objects** = Objetos que definen QUÉ datos puede recibir nuestra API y CÓMO validarlos.

```typescript
import { IsIn, IsInt, IsString, Max, Min } from "class-validator"

export class CreateBikeDto {
  @IsInt()                          // Debe ser un número entero
  @Min(0)                          // Mínimo 0
  @Max(300)                        // Máximo 300
  no: number

  @IsString()                      // Debe ser texto
  @IsIn(['disponible', 'ocupada']) // Solo estos valores permitidos
  status: string
}
```

### Validadores más usados

- `@IsString()`: Debe ser texto
- `@IsInt()`: Debe ser número entero
- `@IsEmail()`: Debe ser email válido
- `@Min(0)`: Valor mínimo
- `@Max(100)`: Valor máximo
- `@IsIn(['opcion1', 'opcion2'])`: Solo valores específicos
- `@Length(5, 50)`: Longitud de texto entre 5 y 50 caracteres

---

## 🔧 Pipes - Validación Automática

### ¿Qué hacen los Pipes?

Son como "filtros" que procesan los datos antes de que lleguen a tu controlador.

### Nuestro ValidationPipe global (en main.ts)

```typescript
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,        // Solo permite propiedades definidas en el DTO
  forbidNonWhitelisted: true  // Rechaza propiedades extra con error
}))
```

**¿Qué significa esto?**

- Si envías `{ "no": 10, "status": "disponible", "extra": "dato" }`
- Solo llegan `no` y `status` al controlador
- `extra` es eliminado o causa error (según configuración)

### Uso en controladores

```typescript
@Post()
createBike(
  @Body() createBikeDto: CreateBikeDto  // Aquí se aplica la validación
) {
  // Si llegamos aquí, los datos YA están validados
  const { no, status } = createBikeDto
  return this.bikesService.createBike(no, status)
}
```

---

## 🗄️ TypeORM - Nuestro ORM

### ¿Qué es TypeORM?

Una herramienta que nos permite hablar con la base de datos usando JavaScript, sin escribir SQL.

### Configuración en AppModule

```typescript
TypeOrmModule.forRoot({
  type: 'postgres',           // Tipo de base de datos
  host: process.env.DB_HOST,  // Dirección del servidor
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  
  autoLoadEntities: true,     // Carga automática de entities
  synchronize: true           // Sincroniza estructura automáticamente
})
```

### En el Service (donde hacemos las consultas)

```typescript
@Injectable()
export class BikesService {
  constructor(
    @InjectRepository(Bike)  // Inyectamos el repositorio de Bike
    private readonly bikeRepository: Repository<Bike>
  ) { }

  // Obtener todas las bicicletas
  async getAllBikes() {
    return await this.bikeRepository.find()
  }

  // Crear una nueva bicicleta
  async createBike(no: number, status: string) {
    const newBike = this.bikeRepository.create({ no, status })
    return await this.bikeRepository.save(newBike)
  }

  // Eliminar por ID
  async deleteOneById(id: string) {
    const bike = await this.bikeRepository.findBy({ id })
    if (bike) {
      return this.bikeRepository.delete({ id })
    }
    throw new Error('Bicicleta no encontrada')
  }
}
```

## 🐳 Docker - Base de Datos Sin Instalaciones

### ¿Por qué Docker?

No queremos instalar PostgreSQL en nuestras máquinas. Docker nos da una base de datos "desechable" y fácil de usar.

### Nuestro docker-compose.yaml

```yaml
version: '3'

services:
  database:
    image: postgres:14.3      # Versión específica de PostgreSQL
    restart: always           # Se reinicia automáticamente
    ports:
      - '${DB_PORT}:5432'    # Puerto expuesto (variable de entorno)
    environment:
      POSTGRES_PASSWORD: ${DB_PASSWORD}  # Contraseña de la DB
      POSTGRES_DB: ${DB_NAME}           # Nombre de la base de datos
    container_name: biciapp_db          # Nombre del contenedor
    volumes:
      - ./postgres:/var/lib/postgresql/data  # Persistencia de datos
```

### Variables de entorno necesarias

Crear archivo `.env` en la raíz:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_password_aqui
DB_NAME=biciapp
```

### Comandos para manejar Docker

```bash
# Iniciar la base de datos
docker-compose up
```

---

## 🧪 Probando nuestro sistema completo

### Flujo completo de una petición

1. **Client envía:** `POST /bikes` con `{ "no": 25, "status": "disponible" }`
2. **ValidationPipe:** Valida usando CreateBikeDto
3. **Controller:** Recibe datos ya validados
4. **Service:** Usa TypeORM para guardar en PostgreSQL
5. **Response:** Devuelve la bicicleta creada con su UUID

### Ejemplos de peticiones

#### ✅ Petición válida

```json
POST /bikes
{
  "no": 15,
  "status": "disponible"
}
```

#### ❌ Petición inválida (número muy alto)

```json
POST /bikes
{
  "no": 500,
  "status": "disponible"
}
```

**Error esperado:** `no must not be greater than 300`

#### ❌ Petición inválida (status incorrecto)

```json
POST /bikes
{
  "no": 15,
  "status": "rota"
}
```

**Error esperado:** `status must be one of the following values: disponible, ocupada`

## 🎊 Próximos pasos

Ahora que dominamos esto, podemos:

1. **Relaciones entre tablas** (Bikes pertenecen a Stations)
2. **Queries avanzadas** (búsquedas, filtros, paginación)
