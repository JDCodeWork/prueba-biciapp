# 🚀 Cómo correr el proyecto (Setup completo)

## 1. **Prerequisitos:**

```bash
# Verificar instalaciones
node --version          # v18+ recomendado
pnpm --version          # Package manager
bun --version           # Package manager
docker --version        # Para PostgreSQL
```

### 2. **Configuración:**

```bash
# Clonar e instalar dependencias
git clone <repo>
cd preuba-biciapp
bun install
```

### 3. **Configurar base de datos:**

```bash
# Crear archivo .env en la raíz
touch .env
```

```env
# Contenido del .env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_password_aqui
DB_NAME=biciapp
```

### 4. **Levantar infraestructura:**

```bash
# Iniciar PostgreSQL en Docker
docker-compose up
```

### 5. **Iniciar aplicación:**

```bash
# Modo desarrollo con hot reload
bun run start:dev

# Deberías ver:
# - Conexión exitosa a PostgreSQL
# - Aplicación corriendo en http://localhost:3000
# - Tabla 'bike' creada automáticamente
```

---

## 🧪 Probar el sistema completo

### ✅ **Petición válida:**

```http
POST http://localhost:3000/bikes
Content-Type: application/json

{
  "no": 25,
  "status": "disponible"
}
```

### ❌ **Petición inválida (validación automática):**

```http
POST http://localhost:3000/bikes
Content-Type: application/json

{
  "no": 500,
  "status": "disponible"
}
```

**Error esperado:** `no must not be greater than 300`
