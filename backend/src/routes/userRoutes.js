import express from 'express';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// GET /api/users/:id
router.get('/:id', authMiddleware, (req, res) => {
  try {
    const { id } = req.params;

    // TODO: Obtener perfil del usuario
    // - Solo puede acceder al suyo o admin

    res.json({
      user: {
        id,
        email: 'user@example.com',
        firstName: 'Juan',
        lastName: 'García',
        phone: '+34 666 777 888',
        avatar: null
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener usuario',
      message: error.message
    });
  }
});

// PUT /api/users/:id
router.put('/:id', authMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, phone, avatar } = req.body;

    // TODO: Actualizar perfil del usuario

    res.json({
      message: 'Perfil actualizado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al actualizar perfil',
      message: error.message
    });
  }
});

// POST /api/users/:id/addresses
router.post('/:id/addresses', authMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, street, city, postalCode, country, phone } = req.body;

    // TODO: Agregar dirección al usuario

    res.status(201).json({
      message: 'Dirección agregada exitosamente',
      addressId: 'addr-id'
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al agregar dirección',
      message: error.message
    });
  }
});

// GET /api/users/:id/addresses
router.get('/:id/addresses', authMiddleware, (req, res) => {
  try {
    const { id } = req.params;

    res.json({
      addresses: []
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener direcciones',
      message: error.message
    });
  }
});

export default router;
