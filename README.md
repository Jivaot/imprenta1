# 🎨 ESTAMPADOS DIGITAL PRO - Imprenta de Última Generación

Plataforma e-commerce avanzada para diseño, personalización y compra de estampados profesionales.

## 📋 Características Principales

- ✨ **Diseñador Visual 3D**: Editor de estampados en tiempo real
- 🛒 **Carrito de Compras Inteligente**: Sistema de gestión carrito avanzado
- 👥 **Autenticación de Usuarios**: Login, registro y perfiles
- 💳 **Pasarela de Pago**: Integración con Stripe
- 📦 **Gestión de Pedidos**: Seguimiento y estado de pedidos
- 🖼️ **Catálogo Dinámico**: Productos personalizables
- 📊 **Panel Administrativo**: Dashboard para gestión
- 🎯 **Recomendaciones IA**: Sugerencias personalizadas
- 📱 **Responsive Design**: Mobile first
- 🔔 **Sistema de Notificaciones**: Email y push notifications

## 🏗️ Estructura del Proyecto

```
imprenta-estampados/
├── frontend/           # React.js - Interface de usuario
├── backend/            # Node.js + Express - API REST
├── database/           # Esquemas y migraciones
└── docs/              # Documentación
```

## 🚀 Stack Tecnológico

### Frontend
- React 18.x
- Redux Toolkit
- Fabric.js (Editor vectorial)
- Tailwind CSS
- Three.js (Visualización 3D)

### Backend
- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- Stripe API

### DevOps
- Docker & Docker Compose
- GitHub Actions
- PM2 (Production)

## 📦 Instalación

### Requisitos Previos
- Node.js v18+
- PostgreSQL 14+
- npm o yarn

### Setup Backend
```bash
cd backend
npm install
cp .env.example .env
npm run db:migrate
npm run dev
```

### Setup Frontend
```bash
cd frontend
npm install
npm start
```

## 🔧 Variables de Entorno

Consultar `.env.example` en cada directorio.

## 📚 Documentación

- [API Documentation](./docs/API.md)
- [Database Schema](./docs/DATABASE.md)
- [Guía de Uso](./docs/USER_GUIDE.md)

## 👨‍💼 Equipo

EstampadosDigitalPro - Innovación en impresión digital

## 📄 Licencia

MIT License
