const jwt = require('jsonwebtoken');

const authMiddleware = {
  async verifyToken(req, res, next) {
    const token = req.cookies.session_id;

    if (!token) {
      return res.status(401).json({ error: 'token não fornecido' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      req.user = decoded;

      next();
    } catch (error) {
      console.error(`${error.message}`);
      res.status(401).json({ error: 'token inválido' });
    }
  }
};

module.exports = authMiddleware;