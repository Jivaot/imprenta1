# EstampadosDigitalPro - Documentación de Instalación

## 🚀 Guía Rápida de Inicio

### Requisitos Previos
- Node.js v18+
- npm v9+
- PostgreSQL 14+
- Redis 6+
- Docker (opcional)

### Opción 1: Instalación Local

#### 1. Configurar Base de Datos PostgreSQL

```bash
# Conectar a PostgreSQL como superuser
psql -U postgres

# Ejecutar el script SQL
\i database/init.sql

# Verificar conexión (desde terminal)
psql -U estampados_user -d estampados_db -h localhost
```

#### 2. Instalar Dependencias Backend

```bash
cd backend
npm install
cp .env.example .env
```

#### 3. Instalar Dependencias Frontend

```bash
cd ../frontend
npm install
cp .env.example .env
```

#### 4. Ejecutar Desarrollo

Opción A: Terminal separadas
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

Opción B: Ambos simultáneamente
```bash
# Desde raíz del proyecto
npm run dev
```

### Opción 2: Instalación con Docker

```bash
docker-compose up -d
```

Acceder a:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- API Docs: http://localhost:5000/api-docs (pendiente)
- PostgreSQL: localhost:5432
- Redis: localhost:6379

## 🔧 Configuración

### Variables de Entorno Backend

Editar `backend/.env`:
```env
# Base de Datos
DATABASE_URL=postgresql://estampados_user:password@localhost:5432/estampados_db

# Stripe (reemplazar con tus keys)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# JWT
JWT_SECRET=tu_super_secret_key_cambiar_en_produccion

# Email (SMTP)
SMTP_USER=tu_email@gmail.com
SMTP_PASSWORD=tu_contraseña_app
```

### Variables de Entorno Frontend

Editar `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_...
```

## 📦 Estructura del Proyecto

```
imprenta-estampados/
├── backend/              # API Node.js + Express
│   ├── src/
│   │   ├── controllers/  # Lógica de solicitudes
│   │   ├── models/       # Esquemas de BD
│   │   ├── routes/       # Rutas API
│   │   ├── middleware/   # Middlewares
│   │   └── index.js      # Punto de entrada
│   └── package.json
├── frontend/             # React + Vite
│   ├── src/
│   │   ├── components/   # Componentes reutilizables
│   │   ├── pages/        # Páginas principales
│   │   ├── store/        # Redux store
│   │   └── main.jsx
│   └── package.json
├── database/             # Scripts SQL
│   └── init.sql
├── docker-compose.yml
└── package.json
```

## 🗄️ Base de Datos

### Tablas Principales
- `users` - Usuarios del sistema
- `products` - Catálogo de productos
- `categories` - Categorías de productos
- `cart_items` - Artículos del carrito
- `orders` - Pedidos
- `order_items` - Ítems de pedidos
- `payments` - Registro de pagos
- `reviews` - Reseñas de productos
- `addresses` - Direcciones de envío
- `notifications` - Notificaciones
- `saved_designs` - Diseños guardados
- `favorites` - Productos favoritos

## API Endpoints Principales

### Autenticación
- `POST /api/auth/register` - Registrarse
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/me` - Obtener usuario actual

### Productos
- `GET /api/products` - Listar productos
- `GET /api/products/:id` - Obtener producto
- `POST /api/products` - Crear producto (admin)

### Carrito
- `GET /api/cart` - Obtener carrito
- `POST /api/cart/items` - Agregar al carrito
- `DELETE /api/cart/items/:id` - Eliminar del carrito

### Pedidos
- `POST /api/orders` - Crear pedido
- `GET /api/orders` - Mis pedidos
- `GET /api/orders/:id` - Detalles del pedido

### Pagos
- `POST /api/payments/create-intent` - Crear intención de pago
- `POST /api/payments/webhook` - Webhook de Stripe

## 🧪 Testing

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

## 📊 Monitoreo

### Health Check
```bash
curl http://localhost:5000/health
```

### Logs
```bash
# Backend en consola
npm run dev

# Ver logs en tiempo real
tail -f backend/logs/app.log
```

## 🚀 Deploy

### Preparar para Producción
```bash
# Backend
npm run build

# Frontend
npm run build
```

### Usando Docker
```bash
docker-compose -f docker-compose.yml up -d
```

## 📞 Soporte

Para reportar problemas o sugerencias, crea un issue en el repositorio.

## 📄 Licencia

MIT License - Ver LICENSE.md

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

---

**Última Actualización:** 29 de Marzo 2024
**Versión:** 1.0.0
