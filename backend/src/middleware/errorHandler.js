export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Errores de validación
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Errores de validación',
      details: err.details || err.message
    });
  }

  // Errores de autenticación
  if (err.name === 'AuthenticationError' || err.status === 401) {
    return res.status(401).json({
      error: 'No autenticado',
      message: 'Por favor inicia sesión'
    });
  }

  // Errores de autorización
  if (err.name === 'AuthorizationError' || err.status === 403) {
    return res.status(403).json({
      error: 'No autorizado',
      message: 'No tienes permisos para esta acción'
    });
  }

  // Errores de entidad no encontrada
  if (err.name === 'NotFoundError' || err.status === 404) {
    return res.status(404).json({
      error: 'No encontrado',
      message: err.message || 'El recurso solicitado no existe'
    });
  }

  // Errores de conflicto
  if (err.name === 'ConflictError' || err.status === 409) {
    return res.status(409).json({
      error: 'Conflicto',
      message: err.message || 'El recurso ya existe'
    });
  }

  // Errores genéricos del servidor
  return res.status(500).json({
    error: 'Error del servidor',
    message: process.env.NODE_ENV === 'production'
      ? 'Algo salió mal'
      : err.message
  });
};

export default errorHandler;
