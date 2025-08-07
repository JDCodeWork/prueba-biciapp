# 🌐 ¡Chicos, aquí están los ejemplos para probar nuestra API

## 🚴‍♂️ Probemos los Endpoints de Bicicletas

### 📋 Ver todas las bicicletas (GET)

```http
GET /bikes
```

**Lo que va a pasar:**

- El servidor te devuelve una lista JSON
- Inicialmente solo hay 1 bicicleta (número 10, disponible)

**Respuesta que vas a ver:**

```json
[
  {
    "no": 10,
    "status": "disponible"
  }
]
```

### ➕ Agregar una nueva bicicleta (POST)

```bash
POST /bikes

Body > Text > JSON
{
  "no": 25,
  "status": "ocupada"
}
```

**Para el nuevo:** Este Content-Type le dice al servidor "hey, te estoy enviando JSON"
**Para el de FastAPI:** Es exactamente igual que enviar un request.json() en Python

## 🏢 Probemos los Endpoints de Estaciones

### 📋 Ver todas las estaciones

```bash
GET /stations
```

Inicialmente va a devolver una lista vacía: `[]`

### ➕ Crear una estación nueva

```bash
POST /stations

Body > Text > JSON
{
  "name": "Estación Central"
}
```

### 🔧 Problemas comunes

1. **"Cannot POST /bikes"** = El servidor no está corriendo
   **Solución:** `pnpm run start:dev`

2. **Puerto 3000 ocupado** = Alguien del equipo ya tiene el servidor corriendo
   **Solución:** Verifica que no halla otro servidor de desarrollo corriendo

3. **No se ve el JSON** = Problemas de parsing
   **Solución:** Verifica que estés enviando JSON válido
