const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const adminService = require('../services/adminService.js');

const adminController = {
  async loginAdmin(req, res) {
    const { username, password } = req.body;
     //na hora de integrar a API com o front-end, o front-end deve enviar um objeto com as propriedades username e password no corpo da requisição ao realizar o fetch para a rota /api/admin. assim: { username: 'admin1', password: 'senha123' }.

    try {
      const foundAdmin = await adminService.toLocateAdminByUsername(username);

      console.log(`AQUI1: ${foundAdmin.login}`);

      console.log(password)

      if (!foundAdmin | !foundAdmin.password) {
        //CORRIGINDO: para garantir que o admin foi encontrado e que a senha está disponível antes de chamar o bcrypt.compare.
        return res.status(401).json({ error: 'admin não encontrado ou senha não disponível' });
        //status 401 significa que a requisição não foi autorizada. 
      }

      const passwordIsValid = await bcrypt.compare(password, foundAdmin.password);

      if (!passwordIsValid) {
        return res.status(401).json({ error: 'senha inválida' });
      }

      console.log(`AQUI2: ${foundAdmin.login}`);

      const token = jwt.sign(
        { username: foundAdmin.login },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      console.log('1')

      res.cookie('session_id', token, { httpOnly: true, maxAge: 3600000 });

      res.status(200).json({ success: true });
      //status 200 significa que a requisição foi bem-sucedida.

    } catch (error) {
      console.error('usuário e/ou senha inválidos!', error);

      res.status(500).send('erro interno do servidor');
      //status 500 significa que houve um erro interno do servidor.
    }
  },

  async confirmLogin(req, res) {
    const token = req.cookies.session_id;

    if (!token) {
      return res.status(401).json({ error: 'token não fornecido' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const foundAdmin = await adminService.toLocateAdminByUsername(decoded.username);

      if (!foundAdmin) {
        return res.status(401).json({ error: 'admin não encontrado' });
      }

      return res.status(200).json({ username: foundAdmin.login, name: foundAdmin.name });

    } catch (error) {
      res.status(401).json({ error: 'falha na autenticação' });
    }
  }
};

module.exports = adminController;



//testar loginAdmin:
//curl -i -X POST -H "Content-Type: application/json" -d '{"username": "admin1", "password": "senha123"}' http://localhost:3000/api/admin
//curl -i -X POST -H "Content-Type: application/json" -d '{"username": "admin2", "password": "senha456"}' http://localhost:3000/api/admin

//testar confirmLogin:
//curl -X GET -H "Cookie: session_id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMSIsImlhdCI6MTcxMzIxMjg0MSwiZXhwIjoxNzEzMjE2NDQxfQ.lEXBzjoGQLRrdV9ohywv6-r5oV-sxGJNGGUWLVWan6c" http://localhost:3000/api/admin
//curl -X GET -H "Cookie: session_id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMiIsImlhdCI6MTcxMzIxMjg3OCwiZXhwIjoxNzEzMjE2NDc4fQ.GKuJj0vR2fWgx1HCjazZybgDwUlAGg95r8g9wZ6NnlQ" http://localhost:3000/api/admin