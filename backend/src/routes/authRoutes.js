import express from 'express';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// POST /api/auth/register
router.post('/register', (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Validaciones básicas
    if (!email || !password) {
      return res.status(400).json({
        error: 'Validación fallida',
        message: 'Email y contraseña son requeridos'
      });
    }

    // TODO: Implementar lógica de registro
    // - Hashear contraseña
    // - Crear usuario en BD
    // - Generar JWT

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: {
        email,
        firstName,
        lastName
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al registrar usuario',
      message: error.message
    });
  }
});

// POST /api/auth/login
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Validación fallida',
        message: 'Email y contraseña son requeridos'
      });
    }

    // TODO: Implementar lógica de login
    // - Buscar usuario en BD
    // - Verificar contraseña
    // - Generar JWT

    res.json({
      message: 'Login exitoso',
      token: 'jwt_token_aqui'
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al iniciar sesión',
      message: error.message
    });
  }
});

// POST /api/auth/logout
router.post('/logout', authMiddleware, (req, res) => {
  // TODO: Invalidar token si es necesario
  res.json({
    message: 'Sesión cerrada exitosamente'
  });
});

// GET /api/auth/me
router.get('/me', authMiddleware, (req, res) => {
  res.json({
    user: req.user
  });
});

export default router;
