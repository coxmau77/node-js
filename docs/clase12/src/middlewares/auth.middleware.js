import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const authenticateToken = (req, res, next) => {
  // Obtener el token del encabezado de autorización
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (token == null) {
    // No hay token, no autorizado
    return res.sendStatus(401);
  }

  // Verificar el token
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      // Token no es válido o ha expirado
      return res.sendStatus(403);
    }

    // El token es válido, adjuntamos el payload del usuario a la solicitud
    req.user = user;
    next();
  });
};
