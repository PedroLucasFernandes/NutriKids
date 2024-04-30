const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const adminService = require('../services/adminService.js');

const adminController = {
  async loginAdmin(req, res) {
    const { username, password } = req.body;

    try {
      const foundAdmin = await adminService.getAdminByUsername(username);

      if (!foundAdmin || !foundAdmin.password) {
        return res.status(401).json({ error: 'admin não encontrado ou senha não disponível' });
      }

      const passwordIsValid = await bcrypt.compare(password, foundAdmin.password);

      if (!passwordIsValid) {
        return res.status(401).json({ error: 'senha inválida' });
      }

      const token = jwt.sign(
        { username: foundAdmin.login },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.cookie('session_id', token, { httpOnly: true, maxAge: 3600000 });

      res.status(200).json({ success: true });
    } catch (error) {
      console.error(`${error.message}`);
      res.status(500).json({ error: 'erro ao tentar fazer login' });
    }
  },

  async confirmLogin(req, res) {
    const token = req.cookies.session_id;

    if (!token) {
      return res.status(401).json({ error: 'token não fornecido' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const foundAdmin = await adminService.getAdminByUsername(decoded.username);

      if (!foundAdmin) {
        return res.status(401).json({ error: 'admin não encontrado' });
      }

      return res.status(200).json({ username: foundAdmin.login, name: foundAdmin.name });
    } catch (error) {
      console.error(`${error.message}`);
      res.status(401).json({ error: 'falha na autenticação' });
    }
  },

  async getAllAdmins(req, res) {
    try {
      const allAdmins = await adminService.getAllAdmins();

      res.status(200).json(allAdmins);
    } catch (error) {
      console.error(`${error.message}`);
      res.status(500).json({ error: 'erro ao tentar buscar todos os administradores' });
    }
  
  },

  async getAdminById(req, res) {
    const { id } = req.params;

    try {
      const admin = await adminService.getAdminById(id);

      if (!admin) {
        return res.status(404).json({ error: 'administrador não existe' });
      }

      res.status(200).json(admin);
    } catch (error) {
      console.error(`${error.message}`);
      res.status(500).json({ error: 'erro ao tentar buscar administrador' });
    }
  }
};

module.exports = adminController;



//testar loginAdmin:
//curl -i -X POST -H "Content-Type: application/json" -d '{"username": "admin1", "password": "senha123"}' http://localhost:3000/api/admin
//curl -i -X POST -H "Content-Type: application/json" -d '{"username": "admin2", "password": "senha456"}' http://localhost:3000/api/admin

//rotas que requerem cookie de sessão (adquirido por meio da autenticação (login)):
//testar confirmLogin:
//curl -X GET -H "Cookie: session_id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMSIsImlhdCI6MTcxNDQ4NzMwNCwiZXhwIjoxNzE0NDkwOTA0fQ.ytdXbBibTlkZ21IHXxNtfdw_a7oP6-4aWu5VRGeLLrA" http://localhost:3000/api/admin
//curl -X GET -H "Cookie: session_id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMiIsImlhdCI6MTcxMzgxOTU5NiwiZXhwIjoxNzEzODIzMTk2fQ.UdfPlCIjhb8gFgMGBTKKwERQ-8iRNrx1O_5IkyGqtJI" http://localhost:3000/api/admin

//testar getAllAdmins:
//curl -X GET -H "Cookie: session_id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMSIsImlhdCI6MTcxNDA2ODcwMCwiZXhwIjoxNzE0MDcyMzAwfQ.G1RL18GkjBY5cTUbBf_CMyii2vMHTHpYinwp6KzYPdI" http://localhost:3000/api/admin/all

//testar getAdminById:
//curl -X GET -H "Cookie: session_id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMSIsImlhdCI6MTcxNDA2ODcwMCwiZXhwIjoxNzE0MDcyMzAwfQ.G1RL18GkjBY5cTUbBf_CMyii2vMHTHpYinwp6KzYPdI" http://localhost:3000/api/admin/1