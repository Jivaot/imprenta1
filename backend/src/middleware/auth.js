import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        error: 'Token no proporcionado',
        message: 'Por favor proporciona un token de autenticación'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      error: 'Token inválido',
      message: error.message
    });
  }
};

export const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      error: 'Acceso denegado',
      message: 'Solo los administradores pueden acceder a este recurso'
    });
  }
  next();
};

export const designerMiddleware = (req, res, next) => {
  if (!req.user || (req.user.role !== 'designer' && req.user.role !== 'admin')) {
    return res.status(403).json({
      error: 'Acceso denegado',
      message: 'No tienes permisos para esta acción'
    });
  }
  next();
};

export default authMiddleware;
