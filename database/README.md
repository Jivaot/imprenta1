# Base de Datos

## Configuración PostgreSQL

### Variables de Entorno
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=estampados_db
DB_USER=estampados_user
DB_PASSWORD=estampados_secure_pass
```

### Crear Base de Datos (Manual)

```sql
-- Conectar como superuser
psql -U postgres

-- Crear usuario
CREATE USER estampados_user WITH PASSWORD 'estampados_secure_pass';

-- Crear base de datos
CREATE DATABASE estampados_db OWNER estampados_user;

-- Otorgar permisos
GRANT ALL PRIVILEGES ON DATABASE estampados_db TO estampados_user;
```

## Migraciones

```bash
npm run db:migrate
```

## Estructura de Tablas

### users
- id (UUID Primary Key)
- email (Unique)
- password (Hashed)
- firstName
- lastName
- avatar
- role (user/admin)
- isActive
- createdAt
- updatedAt

### products
- id (UUID)
- name
- description
- price
- quantity
- category
- image
- isFeatured
- isActive
- createdAt
- updatedAt

### cart_items
- id (UUID)
- userId (FK)
- productId (FK)
- quantity
- customization (JSON)
- createdAt
- updatedAt

### orders
- id (UUID)
- userId (FK)
- status
- totalPrice
- shippingAddress (JSON)
- paymentStatus
- createdAt
- updatedAt

### order_items
- id (UUID)
- orderId (FK)
- productId (FK)
- quantity
- price
- customization (JSON)

### payments
- id (UUID)
- orderId (FK)
- stripePaymentIntentId
- amount
- status
- createdAt
- updatedAt

## Seedear Datos

```bash
npm run seed
```
