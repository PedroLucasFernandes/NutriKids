const jwt = require('jsonwebtoken');

const authMiddleware = {
  async verifyToken(req, res, next) {
    console.log("Token verification triggered for:", req.originalUrl, "where:" , req.method);

    const token = req.cookies.session_id;

    if (!token) {
      return res.status(401).json({ error: 'token não fornecido' });
      //401 significa que a requisição não foi autorizada.
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //jwt.verify() verifica se o token é válido e retorna o payload do token.
      
      req.user = decoded;
      //aqui, o payload do token é atribuído à propriedade user do objeto req, para que as rotas que utilizam esse middleware possam acessar o payload do token.

      next();
    } catch (error) {
      console.error(`${error.message}`);
      res.status(401).json({ error: 'token inválido' });
    }
  }
};

module.exports = authMiddleware;