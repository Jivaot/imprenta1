# Backend - EstampadosDigitalPro

## Configuración

Crear archivo `.env`:

```env
NODE_ENV=development
PORT=5000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/estampados_db
DB_HOST=localhost
DB_PORT=5432
DB_NAME=estampados_db
DB_USER=estampados_user
DB_PASSWORD=estampados_secure_pass

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_in_production_2024
JWT_EXPIRE=7d

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu_email@gmail.com
SMTP_PASSWORD=tu_password
SMTP_FROM=noreply@estampados.com

# AWS S3 (for images)
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_REGION=us-east-1
AWS_BUCKET=estampados-uploads

# CORS
FRONTEND_URL=http://localhost:3000
```

## Estructura de Carpetas

```
backend/
├── src/
│   ├── index.js              # Punto de entrada
│   ├── config/              # Configuraciones
│   ├── controllers/         # Controladores
│   ├── models/             # Modelos de datos
│   ├── routes/             # Rutas de API
│   ├── middleware/         # Middlewares personalizados
│   ├── services/           # Lógica de negocio
│   ├── utils/              # Utilidades
│   ├── validators/         # Validadores de entrada
│   └── database/           # Migraciones y seeds
├── tests/
├── .env.example
└── Dockerfile
```

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

## Base de Datos

### Ejecutar migraciones
```bash
npm run db:migrate
```

### Seedear datos
```bash
npm run seed
```

## Testing

```bash
npm test
```

## API Endpoints

### Usuarios
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Login
- `GET /api/users/:id` - Obtener perfil
- `PUT /api/users/:id` - Actualizar perfil

### Productos
- `GET /api/products` - Listar productos
- `GET /api/products/:id` - Obtener producto
- `POST /api/products` - Crear producto (admin)
- `PUT /api/products/:id` - Actualizar producto (admin)

### Carrito
- `GET /api/cart` - Obtener carrito
- `POST /api/cart/items` - Agregar al carrito
- `PUT /api/cart/items/:id` - Actualizar item
- `DELETE /api/cart/items/:id` - Eliminar del carrito

### Pedidos
- `POST /api/orders` - Crear pedido
- `GET /api/orders` - Listar pedidos del usuario
- `GET /api/orders/:id` - Obtener detalles del pedido

### Pagos
- `POST /api/payments/create-intent` - Crear intención de pago
- `POST /api/payments/webhook` - Webhook de Stripe

## Documentación Completa

Ver `docs/API.md` para documentación detallada de todos los endpoints.
