import express from 'express';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// POST /api/payments/create-intent
router.post('/create-intent', authMiddleware, (req, res) => {
  try {
    const { amount, currency = 'USD' } = req.body;

    if (!amount) {
      return res.status(400).json({
        error: 'Validación fallida',
        message: 'El monto es requerido'
      });
    }

    // TODO: Crear Payment Intent con Stripe
    // - Generar client secret
    // - Guardar referencia en BD

    res.json({
      clientSecret: 'pi_test_secret_here',
      paymentIntentId: 'pi_test_id_here'
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al crear intención de pago',
      message: error.message
    });
  }
});

// POST /api/payments/webhook
router.post('/webhook', (req, res) => {
  try {
    const event = req.body;

    // TODO: Procesar eventos de webhook de Stripe
    // - payment_intent.succeeded
    // - payment_intent.payment_failed
    // - charge.refunded

    res.json({ received: true });
  } catch (error) {
    res.status(500).json({
      error: 'Error al procesar webhook',
      message: error.message
    });
  }
});

export default router;
