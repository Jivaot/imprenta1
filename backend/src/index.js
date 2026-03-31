import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Cargar variables de entorno
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Importar rutas
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Importar middleware
import errorHandler from './middleware/errorHandler.js';
import logger from './middleware/logger.js';

const app = express();
const PORT = process.env.PORT || 5000;

// ========== SEGURIDAD ==========
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite de 100 requests por ventana
  message: 'Demasiadas solicitudes, por favor intenta más tarde'
});
app.use(limiter);

// ========== CORS ==========
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ========== MIDDLEWARES GLOBALES ==========
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(logger);

// ========== RUTAS ==========
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);

// ========== RUTA DE SALUD ==========
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// ========== MANEJO DE ERRORES ==========
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    path: req.path,
    method: req.method
  });
});

app.use(errorHandler);

// ========== INICIADOR DEL SERVIDOR ==========
const server = app.listen(PORT, () => {
  console.log(`\n🚀 Servidor EstampadosDigitalPro iniciado`);
  console.log(`📍 Puerto: ${PORT}`);
  console.log(`🌍 URL: http://localhost:${PORT}`);
  console.log(`📊 Health Check: http://localhost:${PORT}/health`);
  console.log(`🔐 Modo: ${process.env.NODE_ENV || 'development'}\n`);
});

// Manejo de errores no capturados
process.on('unhandledRejection', (err) => {
  console.error('❌ Rechazo no manejado:', err);
  server.close(() => process.exit(1));
});

process.on('uncaughtException', (err) => {
  console.error('❌ Excepción no capturada:', err);
  server.close(() => process.exit(1));
});

export default app;
