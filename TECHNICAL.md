# 🎨 EstampadosDigitalPro - Documentación Técnica

## Descripción General

EstampadosDigitalPro es una plataforma e-commerce moderna para diseño y compra de estampados personalizados de última generación. Implementa un flujo completo desde diseño hasta compra y entrega.

## Stack Tecnológico

### Backend
- **Runtime**: Node.js v18+
- **Framework**: Express.js
- **Base de Datos**: PostgreSQL 14+
- **Cache**: Redis
- **Autenticación**: JWT
- **Pagos**: Stripe API
- **Almacenamiento**: AWS S3 (opcional)

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Estado**: Redux Toolkit
- **Estilos**: Tailwind CSS
- **Editor**: Fabric.js, Three.js
- **Formularios**: Formik + Yup
- **HTTP Client**: Axios

### DevOps
- **Containerización**: Docker & Docker Compose
- **CI/CD**: GitHub Actions (configurar)
- **Servidor**: PM2 para producción

## Flujo de Negocio

```
Usuario → Explora Productos
         ↓
    Selecciona Producto
         ↓
    Personaliza con Diseñador
         ↓
    Agrega al Carrito
         ↓
    Realiza Checkout
         ↓
    Procesa Pago (Stripe)
         ↓
    Crea Orden
         ↓
    Se Envía Producto
```

## Características Principales

### 1. Diseñador 3D Avanzado
- Editor vectorial compatible con Fabric.js
- Visualización 3D con Three.js
- Personalización de:
  - Texto (fuentes, tamaños, colores)
  - Imágenes (upload, escala, rotación)
  - Formas geométricas
  - Colores y gradientes

### 2. Gestión de Productos
- Catálogo dinámico
- Categorización
- Opciones de personalización
- Galería de imágenes
- Sistema de reseñas

### 3. Sistema de Carrito
- Persistencia en localStorage
- Cálculo automático de totales
- Gestión de cantidades
- Guardado de personalizaciones

### 4. Pasarela de Pago
- Integración Stripe
- Payment Intent para seguridad
- Webhook handling
- Confirmación de pago

### 5. Gestión de Pedidos
- Creación automática tras pago
- Seguimiento en tiempo real
- Historial de compras
- Gestión de direcciones

### 6. Sistema de Usuarios
- Registro y login
- Perfiles de usuario
- Múltiples direcciones
- Historial de diseños
- Lista de favoritos

## Modelos de Datos

### User
```javascript
{
  id: UUID,
  email: String,
  password: String (hashed),
  firstName: String,
  lastName: String,
  role: "user" | "admin" | "designer",
  isActive: Boolean,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Product
```javascript
{
  id: UUID,
  name: String,
  description: String,
  price: Decimal,
  quantity: Integer,
  category: String,
  images: String[],
  customizationOptions: JSON,
  rating: Decimal,
  isActive: Boolean,
  createdAt: Timestamp
}
```

### Order
```javascript
{
  id: UUID,
  userId: UUID,
  items: OrderItem[],
  status: "pending" | "processing" | "shipped" | "delivered",
  totalPrice: Decimal,
  shippingAddress: JSON,
  paymentStatus: "pending" | "paid" | "failed",
  createdAt: Timestamp
}
```

## Rutas de API

### Autenticación
```
POST   /api/auth/register      # Registrarse
POST   /api/auth/login         # Iniciar sesión
POST   /api/auth/logout        # Cerrar sesión
GET    /api/auth/me            # Obtener usuario actual
```

### Productos
```
GET    /api/products           # Listar con filtros
GET    /api/products/:id       # Detalles
POST   /api/products           # Crear (admin)
PUT    /api/products/:id       # Actualizar (admin)
DELETE /api/products/:id       # Eliminar (admin)
```

### Carrito
```
GET    /api/cart               # Obtener carrito
POST   /api/cart/items         # Agregar item
PUT    /api/cart/items/:id     # Actualizar item
DELETE /api/cart/items/:id     # Eliminar item
DELETE /api/cart/clear         # Vaciar carrito
```

### Pedidos
```
POST   /api/orders             # Crear pedido
GET    /api/orders             # Mis pedidos
GET    /api/orders/:id         # Detalles pedido
PUT    /api/orders/:id/cancel  # Cancelar pedido
```

### Pagos
```
POST   /api/payments/create-intent    # Crear Payment Intent
POST   /api/payments/webhook          # Webhook Stripe
```

### Usuarios
```
GET    /api/users/:id                 # Perfil
PUT    /api/users/:id                 # Actualizar
POST   /api/users/:id/addresses       # Agregar dirección
GET    /api/users/:id/addresses       # Obtener direcciones
```

## Rutas Frontend

```
/                          # Inicio
/productos                 # Catálogo
/producto/:id              # Detalles producto
/designer                  # Editor
/carrito                   # Carrito
/checkout                  # Compra
/login                     # Iniciar sesión
/register                  # Registrarse
/cuenta                    # Mi cuenta
/pedidos                   # Mis pedidos
/admin                     # Panel admin (futuro)
```

## Seguridad

### Autenticación
- JWT con refresh tokens
- Contraseñas hash con bcrypt
- HTTPS recomendado

### Autorización
- Middleware de autenticación
- Roles: user, admin, designer
- Verificación de propiedad en recursos

### Validación
- Esquemas con Yup
- Sanitización de inputs
- CORS configurado

### Protección de Pagos
- Stripe Payment Intent
- Webhooks verificados
- No se almacenan tokens

## Variables de Entorno

### Backend
```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
JWT_SECRET=tu_super_secret_key
STRIPE_SECRET_KEY=sk_test_...
SMTP_USER=email@gmail.com
FRONTEND_URL=http://localhost:3000
```

### Frontend
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_...
```

## Scripts de Desarrollo

### Backend
```bash
npm run dev              # Desarrollo
npm start              # Producción
npm test               # Tests
npm run db:migrate     # Migraciones
npm run seed           # Seedear datos
```

### Frontend
```bash
npm run dev            # Desarrollo
npm run build          # Producción
npm run lint           # Linter
```

## Performance

### Optimizaciones
- Código splitting en React
- Lazy loading de componentes
- Caché con Redis
- Compresión de imágenes
- CDN para assets estáticos

### Monitoreo
- Logs en Backend
- Error tracking
- Performance monitoring
- Database indexing

## Testing

### Backend
- Unit tests (Jest)
- Integration tests
- API tests

### Frontend
- Component tests (React Testing Library)
- Integration tests
- E2E tests (Cypress)

## Próximos Pasos

1. **Autenticación Completa**: Implementar todos los servicios
2. **Base de Datos**: Conectar models a BD real
3. **Editor 3D**: Integrar Fabric.js y Three.js
4. **Stripe Integration**: Configurar webhooks
5. **Email**: Sistema de notificaciones
6. **AWS S3**: Almacenamiento de imágenes
7. **Testing**: Cobertura completa
8. **Admin Panel**: Dashboard administrativo
9. **Recomendaciones**: IA para sugerencias
10. **Analytics**: Seguimiento de usuario

---

**Versión**: 1.0.0  
**Última actualización**: 29 de Marzo 2024
