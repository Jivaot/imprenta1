# 🚀 GUÍA RÁPIDA - EstampadosDigitalPro

## Iniciar el Proyecto en 3 Pasos

### Paso 1: Instalar Dependencias
```bash
cd imprenta-estampados
npm install
```

### Paso 2: Configurar Base de Datos
```bash
# Crear BD PostgreSQL (si no existe)
psql -U postgres -f database/init.sql

# O con Docker
docker-compose up postgres redis
```

### Paso 3: Iniciar Desarrollo
```bash
# Desde la carpeta raíz
npm run dev

# O en terminales separadas:
# Terminal 1:
cd backend && npm run dev

# Terminal 2:
cd frontend && npm start
```

## Acceso Rápido

🌐 **Frontend**: http://localhost:3000  
⚙️ **Backend API**: http://localhost:5000  
📊 **Health Check**: http://localhost:5000/health

## Documentación Completa

- [README.md](./README.md) - Descripción general
- [INSTALLATION.md](./INSTALLATION.md) - Instalación detallada
- [TECHNICAL.md](./TECHNICAL.md) - Documentación técnica
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Guía de contribución

## Estructura Carpetas

```
imprenta-estampados/
├── backend/              # Node.js + Express API
│   ├── src/
│   │   ├── routes/       # Rutas API REST
│   │   ├── controllers/  # Lógica de negocio
│   │   ├── middleware/   # Autenticación, validación
│   │   ├── services/     # Servicios (Stripe, Email, etc)
│   │   └── index.js      # Servidor
│   ├── package.json
│   └── Dockerfile
├── frontend/             # React + Vite
│   ├── src/
│   │   ├── components/   # Componentes reutilizables
│   │   ├── pages/        # Páginas principales
│   │   ├── store/        # Redux (estado)
│   │   ├── services/     # Llamadas API
│   │   └── App.jsx
│   ├── package.json
│   └── Dockerfile
├── database/             # Scripts SQL
│   └── init.sql          # Esquema de BD
├── docker-compose.yml    # Configuración Docker
├── package.json
└── docs/                 # Documentación
```

## Configuración de Desarrollo

### Variables de Entorno Backend (`backend/.env`)
```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://estampados_user:password@localhost:5432/estampados_db
REDIS_URL=redis://localhost:6379
JWT_SECRET=tu_secret_key_cambia_esto
STRIPE_SECRET_KEY=sk_test_...
```

### Variables de Entorno Frontend (`frontend/.env`)
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_...
```

## Características Principales

✅ **E-commerce Completo** - Catálogo, carrito, checkout  
✅ **Editor 3D** - Diseña estampados personalizados  
✅ **Autenticación JWT** - Login seguro  
✅ **Pagos Stripe** - Procesamiento seguro  
✅ **Admin Dashboard** - Gestionar productos y pedidos  
✅ **Responsive** - Mobile first  
✅ **Docker Ready** - Fácil deploy  

## Comandos Útiles

```bash
# Backend
npm run dev              # Desarrollo con nodemon
npm test               # Ejecutar tests
npm run db:migrate     # Migraciones BD
npm run seed           # Datos de prueba

# Frontend
npm run dev            # Desarrollo
npm run build          # Build producción
npm run lint           # ESLint

# Raíz del proyecto
npm run install:all    # Instalar todo
npm run dev            # Ejecutar ambos
npm run build          # Build backend y frontend
```

## Próximas Etapas de Desarrollo

1. **Implementar servicios backend** - Conectar con BD real
2. **Editor 3D funcional** - Fabric.js + Three.js
3. **Sistema de pagos** - Integración Stripe
4. **Email notifications** - Confirmaciones automáticas
5. **AWS S3** - Almacenamiento de imágenes
6. **Admin panel** - Dashboard completo
7. **Tests automatizados** - Jest + Cypress
8. **CI/CD** - GitHub Actions
9. **Analytics** - Seguimiento de usuarios
10. **Recomendaciones IA** - Sugerencias personalizadas

## Soporte

📧 Email: soporte@estampados.com  
💬 Discord: [Enlace a servidor]  
🐛 Issues: GitHub Issues  

## Licencia

MIT - Libre para usar y modificar

---

**¡Bienvenido a EstampadosDigitalPro!** 🎨

Empezar es fácil. Solo necesitas Node.js instalado.

```bash
npm run dev
```

Disfruta desarrollando! 🚀
