# 🛠️ NestJS CLI - Cheat Sheet

## 📋 Comandos Básicos

### Crear un nuevo proyecto

```bash
# Crear proyecto con npm
nest new mi-proyecto

# Crear proyecto con pnpm
nest new mi-proyecto --package-manager pnpm

# Crear proyecto con yarn
nest new mi-proyecto --package-manager yarn
```

### Generar recursos completos (CRUD)

```bash
# Genera controller, service, module, DTOs y entity
nest generate resource users
nest g res users

# Con opciones específicas
nest g res users --no-spec  # Sin archivos de test
nest g res users --dry-run  # Solo mostrar qué se creará
```

## 🎯 Generar Componentes Individuales

### Controladores

```bash
nest generate controller users
nest g co users

# En una subcarpeta específica
nest g co admin/users
```

### Servicios

```bash
nest generate service users
nest g s users

# En una subcarpeta específica
nest g s auth/users
```

### Módulos

```bash
nest generate module users
nest g mo users

# Con routing automático
nest g mo users --routing
```

### Interfaces

```bash
nest generate interface interfaces/user
nest g itf interfaces/user
```

## 🏗️ Estructura que Genera `nest g res`

Cuando ejecutas `nest g res users`, se crean:

```text
src/users/
├── dto/ # Aun no lo hemos visto
│   ├── create-user.dto.ts
│   └── update-user.dto.ts
├── entities/ # Aun no lo hemos visto
│   └── user.entity.ts
├── users.controller.spec.ts # podemos eliminar
├── users.controller.ts
├── users.module.ts
├── users.service.spec.ts # Podemos eliminar
└── users.service.ts
```

## 🎨 Opciones Avanzadas

### Flags útiles

```bash
--no-spec          # No genera archivos de test (.spec.ts)
```

### Ejemplos con flags

```bash
# Sin tests y ver qué se creará
nest g res products --no-spec 

# En una subcarpeta específica
nest g co admin/products
```

## 📦 Comandos de Proyecto

### Ejecutar

```bash
nest start
nest start --watch     # Modo desarrollo
nest start --debug     # Con debug
```

### Información del proyecto

```bash
nest info  # Muestra información del sistema y dependencias
```

## 🔄 Ejemplos Prácticos

### Crear un módulo de autenticación completo

```bash
# 1. Crear el módulo auth
nest g mo auth

# 2. Crear el servicio auth
nest g s auth

# 3. Crear el controlador auth
nest g co auth
```

### Crear un módulo de usuarios con validación

```bash
# 1. Generar el resource completo
nest g res users
```

### Crear módulo de productos con subcategorías

```bash
# 1. Crear módulo principal
nest g mo products

# 2. Crear submódulos
nest g mo products/categories
nest g mo products/reviews

# 3. Crear servicios especializados
nest g s products/products
nest g s products/categories/categories
nest g s products/reviews/reviews
```

## 🗂️ Organización por Funcionalidades

### Estructura recomendada para un e-commerce

```bash
# Crear módulos principales
nest g res users
nest g res products
nest g res orders
nest g res categories
nest g res auth

# Crear submódulos
nest g mo users/profile
nest g mo products/inventory
nest g mo orders/payment

# Crear servicios utilitarios
nest g s common/email
nest g s common/storage
nest g s common/notification
```

## 💡 Tips y Mejores Prácticas

### 1. Usar nombres descriptivos

```bash
# ❌ Malo
nest g co user

# ✅ Bueno
nest g co users
nest g co user-profile
nest g co admin/user-management
```

### 2. Organizar por funcionalidad

```bash
# ✅ Estructura por funcionalidad
src/
├── auth/
├── users/
├── products/
├── orders/
└── common/
```

### 4. Combinar generadores

```bash
# Generar todo el módulo de una vez
nest g res api/v1/users

# Luego agregar componentes específicos
nest g gu api/v1/users/ownership
nest g in api/v1/users/transform
```

## 🚀 Workflow Recomendado

### Para una nueva funcionalidad

1. `nest g res feature-name --dry-run` (verificar)
2. `nest g res feature-name` (crear)
3. Implementar lógica de negocio
4. Documentar endpoints

---
