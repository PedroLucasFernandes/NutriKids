const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const adminService = require('../services/adminService.js');

const adminController = {
  async loginAdmin(req, res) {
    //INTEGRAÇÃO API COM FRONT-END: o front-end deve enviar um objeto com as propriedades username e password no corpo da requisição HTTP POST ao realizar o fetch para a rota /api/admin. o objeto ficará assim: { "username": "admin1", "password": "senha123" }.

    const { username, password } = req.body;

    try {
      const foundAdmin = await adminService.toLocateAdminByUsername(username);

<<<<<<< HEAD
      console.log(`AQUI1: ${foundAdmin.login}`);

      console.log(password)

=======
>>>>>>> main
      if (!foundAdmin | !foundAdmin.password) {
        //CORRIGINDO: para garantir que o admin foi encontrado e que a senha está disponível antes de chamar o bcrypt.compare.
        return res.status(401).json({ error: 'admin não encontrado ou senha não disponível' });
        //status 401 significa que a requisição não foi autorizada.
        //aqui usei só o res.status, pois trata-se de uma resposta de erro direcionada ao cliente (front-end), então, não é necessário usar o throw new Error, pois não é um erro que será tratado internamente no servidor.
        //foi utilizada essa estrutura '({ error: 'mensagem de erro' })' para que o front-end possa capturar essa mensagem de erro e exibi-la para o usuário (por exemplo, em um alerta ou em um campo de texto na tela). { error: 'mensagem de erro' } é um objeto JSON com uma propriedade error que contém a mensagem de erro.
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

      console.log('1')

      res.cookie('session_id', token, { httpOnly: true, maxAge: 3600000 });

      res.status(200).json({ success: true });
      //status 200 significa que a requisição foi bem-sucedida.
      //({ success: true }) é um objeto JSON com uma propriedade success que contém o valor true. foi utilizado para que o front-end possa capturar essa mensagem de sucesso e exibi-la para o usuário. o ideal é que o front-end tenha um tratamento específico para cada tipo de resposta, seja de sucesso ou de erro.

    } catch (error) {
      console.error(`${error.message}`);
      res.status(500).json({ error: 'erro ao tentar fazer login' });
      //status 500 significa que houve um erro interno no servidor.
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
      //({ username: foundAdmin.username, name: foundAdmin.name }) é um objeto JSON com duas propriedades: username e name, que contêm, respectivamente, o username e o name do admin encontrado no banco de dados. foi utilizado para que o front-end possa capturar essas informações e exibi-las para o usuário em caso de sucesso.

    } catch (error) {
      console.error(`${error.message}`);
      res.status(401).json({ error: 'falha na autenticação' });
    }
  }
};

module.exports = adminController;



//testar loginAdmin:
//curl -i -X POST -H "Content-Type: application/json" -d '{"username": "admin1", "password": "senha123"}' http://localhost:3000/api/admin
//curl -i -X POST -H "Content-Type: application/json" -d '{"username": "admin2", "password": "senha456"}' http://localhost:3000/api/admin



//rotas que requerem cookie de sessão (adquirido por meio da autenticação (login)):
//testar confirmLogin:
//curl -X GET -H "Cookie: session_id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMSIsImlhdCI6MTcxMzM4NjU5NCwiZXhwIjoxNzEzMzkwMTk0fQ.SobIcu7AU3Xeibqae5NdHIqCo1qma5wBeh0f_9gUejk" http://localhost:3000/api/admin
//curl -X GET -H "Cookie: session_id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMiIsImlhdCI6MTcxMzM4ODcwOCwiZXhwIjoxNzEzMzkyMzA4fQ.oQBJ3MFLU9Xn2nl1sef08u7ATUT4cUIxUU4YwQ2OCKY" http://localhost:3000/api/admin